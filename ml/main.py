# FastAPI - the web framework (like Spring Boot but for Python)
from fastapi import FastAPI

# Pydantic - validates incoming request data (like Java DTOs)
from pydantic import BaseModel

# Import our ML tools
import pandas as pd
from sqlalchemy import create_engine
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

# --- Initialize the FastAPI app ---
app = FastAPI()

# --- Train the model on startup ---
# Connect to MySQL and load order data
engine = create_engine("mysql+mysqlconnector://root:password@localhost/oms_db")
query = "SELECT id, customer_id, customer, store_id, order_status, payment_status, total FROM orders"
df = pd.read_sql(query, engine)

# Create risk labels (same logic as risk_score.py)
df["risk_score"] = df.apply(
    lambda row:
        "High"   if row["order_status"] == "Failed" and row["payment_status"] == "Declined"
        else "High"   if row["total"] > 500
        else "Medium" if row["order_status"] == "Failed"
        else "Medium" if row["total"] > 200
        else "Low",
    axis=1
)

# Encode text columns to numbers
le_status = LabelEncoder()
le_payment = LabelEncoder()
df["order_status_enc"] = le_status.fit_transform(df["order_status"])
df["payment_status_enc"] = le_payment.fit_transform(df["payment_status"])

# Train the model
features = df[["total", "order_status_enc", "payment_status_enc"]]
target = df["risk_score"]
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(features, target)

print("✅ ML model trained and ready!")

# --- Define what an incoming request looks like ---
# This is like a Java DTO / request body
class OrderRequest(BaseModel):
    total: float
    order_status: str
    payment_status: str

# --- Define the prediction endpoint ---
# Spring Boot will call POST /predict with order data
@app.post("/predict")
def predict_risk(order: OrderRequest):
    # Convert incoming text to numbers using the same encoders
    try:
        status_enc = le_status.transform([order.order_status])[0]
        payment_enc = le_payment.transform([order.payment_status])[0]
    except ValueError:
        # If an unknown status comes in, default to 0
        status_enc = 0
        payment_enc = 0

    # Run the ML prediction
    prediction = model.predict([[order.total, status_enc, payment_enc]])[0]

    # Return the result as JSON
    return {
        "order_status": order.order_status,
        "payment_status": order.payment_status,
        "total": order.total,
        "risk_score": prediction
    }

# --- Health check endpoint ---
@app.get("/health")
def health():
    return {"status": "ML service is running"}
