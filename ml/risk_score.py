# Import pandas - a data manipulation library (like Excel for Python)
import pandas as pd

# Import SQLAlchemy - handles the MySQL database connection cleanly
from sqlalchemy import create_engine

# Create a connection to your OMS MySQL database
# Format: mysql+mysqlconnector://username:password@host/database_name
engine = create_engine("mysql+mysqlconnector://root:password@localhost/oms_db")

# Write a SQL query to pull order data from the orders table
# Same SQL you'd write in MySQL Workbench or your Java repositories
query = "SELECT id, customer_id, customer, store_id, order_status, payment_status, total FROM orders"

# Execute the query and load results into a DataFrame
# A DataFrame is like a Java List<Map> — rows and columns of data
df = pd.read_sql(query, engine)

# Add a new "risk_score" column to the DataFrame
# df.apply() loops through every row and runs the lambda function
# lambda row: ... is a mini one-line function (like a Java arrow function)
df["risk_score"] = df.apply(
    lambda row:
        # HIGH risk: order failed AND payment was declined (worst case)
        "High"   if row["order_status"] == "Failed" and row["payment_status"] == "Declined"
        # HIGH risk: order total exceeds $500 regardless of status
        else "High"   if row["total"] > 500
        # MEDIUM risk: order failed but payment wasn't declined
        else "Medium" if row["order_status"] == "Failed"
        # MEDIUM risk: order total is between $200-$500
        else "Medium" if row["total"] > 200
        # LOW risk: everything else
        else "Low",
    axis=1  # axis=1 means apply the function row by row (not column by column)
)

# Print the first 10 rows showing only the columns we care about
# Like System.out.println() but for a whole table
print(df[["id", "customer", "order_status", "payment_status", "total", "risk_score"]].head(10))

# Save the full results to a CSV file for inspection
# This creates ml/risk_output.csv in your project folder
df.to_csv("ml/risk_output.csv", index=False)

# Confirm the script finished successfully
print("Done! Check ml/risk_output.csv")
