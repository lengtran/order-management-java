# Import pandas - data manipulation library
import pandas as pd

# Import SQLAlchemy - handles MySQL connection
from sqlalchemy import create_engine

# Import scikit-learn tools - the actual ML library
from sklearn.ensemble import RandomForestClassifier   # the ML model
from sklearn.preprocessing import LabelEncoder        # converts text to numbers (ML needs numbers)
from sklearn.model_selection import train_test_split  # splits data into training vs testing sets
from sklearn.metrics import classification_report     # shows how accurate the model is

# Connect to your OMS MySQL database
engine = create_engine("mysql+mysqlconnector://root:password@localhost/oms_db")

# Pull order data from MySQL
query = "SELECT id, customer_id, customer, store_id, order_status, payment_status, total FROM orders"
df = pd.read_sql(query, engine)

# --- STEP 1: Create the label we want the model to predict ---
# This is the "answer key" we train the model with
# Same logic as before but now it TEACHES the model instead of being the final answer
df["risk_score"] = df.apply(
    lambda row:
        "High"   if row["order_status"] == "Failed" and row["payment_status"] == "Declined"
        else "High"   if row["total"] > 500
        else "Medium" if row["order_status"] == "Failed"
        else "Medium" if row["total"] > 200
        else "Low",
    axis=1
)

# --- STEP 2: Convert text columns to numbers ---
# ML models only understand numbers, not text like "Failed" or "Paid"
le_status = LabelEncoder()   # create an encoder for order_status
le_payment = LabelEncoder()  # create an encoder for payment_status

df["order_status_enc"] = le_status.fit_transform(df["order_status"])    # "Failed" → 0, "Completed" → 1, etc.
df["payment_status_enc"] = le_payment.fit_transform(df["payment_status"]) # "Paid" → 0, "Declined" → 1, etc.

# --- STEP 3: Define features (inputs) and target (output) ---
# Features = what the model looks at to make a prediction
# Target = what we want the model to predict
features = df[["total", "order_status_enc", "payment_status_enc"]]  # inputs
target = df["risk_score"]                                            # output to predict

# --- STEP 4: Split data into training and testing sets ---
# 80% of data trains the model, 20% tests how accurate it is
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

# --- STEP 5: Train the ML model ---
# RandomForest builds many decision trees and combines their predictions
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)  # this is where the model actually "learns"

# --- STEP 6: Test the model accuracy ---
y_pred = model.predict(X_test)
print("=== Model Accuracy Report ===")
print(classification_report(y_test, y_pred, zero_division=0))

# --- STEP 7: Run predictions on ALL orders ---
df["ml_risk_score"] = model.predict(features)

# Print results comparing original vs ML prediction
print(df[["id", "customer", "order_status", "payment_status", "total", "risk_score", "ml_risk_score"]].head(10))

# Save to CSV
df.to_csv("ml/risk_output.csv", index=False)
print("Done! Check ml/risk_output.csv")