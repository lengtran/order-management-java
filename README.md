# 🛒 Order Management System (OMS)

A full-stack customer support dashboard built with Java Spring Boot and MySQL.

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Java 22, Spring Boot 3.2 |
| Database | MySQL 8 + Hibernate JPA |
| API | REST API |
| Server | Apache Tomcat (embedded) |
| Build Tool | Maven |

## ✨ Features

- Live order table fetched from MySQL via REST API
- Stat cards showing Failed, Declined, Canceled, and Completed counts
- Search and filter orders by customer, order ID, or store
- Order Detail modal with line items and cost breakdown
- Customer Detail modal with full order history
- Modify Order modal with live total recalculation
- IT Support ticket submission modal
- Resolve button for IT-flagged orders

## 🚀 Getting Started

### Prerequisites
- Java 22+
- MySQL 8+
- Maven

### Setup

1. Clone the repo
   git clone https://github.com/lengtran/order-management-java.git

2. Create the database
   CREATE DATABASE oms_db;

3. Copy the example properties file
   cp src/main/resources/application.properties.example src/main/resources/application.properties

4. Update application.properties with your MySQL credentials

5. Run the app in IntelliJ or with Maven
   mvn spring-boot:run

6. Open your browser
   http://localhost:8080

## 📁 Project Structure

src/
├── main/
│   ├── java/com/oms/
│   │   ├── Main.java
│   │   ├── controller/OrderController.java
│   │   ├── model/Order.java
│   │   └── repository/OrderRepository.java
│   └── resources/
│       └── static/
│           ├── index.html
│           ├── styles.css
│           └── app.js
