# Order Management System

A Java console application that simulates a customer order troubleshooting system, inspired by real-world retail order management workflows.

## What It Does

- Connects to a MySQL database to retrieve customer orders
- Reads order status and payment status for each order
- Applies troubleshooting logic to determine the correct action:
  - **Failed orders** → Reprocess order
  - **Declined payments** → Escalate to payment team
  - **Canceled orders** → Log cancellation and notify customer
  - **Completed orders** → No action needed

## Technologies Used

- Java (JDK 22)
- MySQL 9.0
- JDBC (MySQL Connector)
- IntelliJ IDEA Ultimate

## Project Structure

src/
├── Main.java       # Entry point, database connection, troubleshooting logic
└── Order.java      # Order class blueprint


## Concepts Demonstrated

- Object-Oriented Programming (Classes, Objects, Constructors)
- JDBC database connectivity
- ArrayList and for-each loops
- If/else decision logic
- SQL (CREATE TABLE, INSERT, SELECT)
