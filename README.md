# 🛒 Order Management System (OMS)

A full-stack **Customer Support Dashboard** built with **Java Spring Boot 3.2** and **MySQL 8**.  
Includes secure authentication, real-time order management, customer profiles, order notes, and IT support ticketing.

---

## 🔧 Tech Stack

| Layer      | Technology                                  |
|------------|----------------------------------------------|
| Frontend   | HTML5, CSS3, Vanilla JavaScript (ES6+)       |
| Backend    | Java 22, Spring Boot 3.2                     |
| Database   | MySQL 8, Hibernate JPA                       |
| API        | REST API (JSON)                              |
| Security   | Spring Security, JWT Authentication          |
| Server     | Apache Tomcat (Embedded)                     |
| Build Tool | Maven 3.9+                                   |

---

## ✨ Features

- 🔐 **Secure JWT login** with role-based access  
- 📊 **Live order dashboard** — real-time MySQL data via REST API  
- 📈 **Stat cards** — Failed / Declined / Canceled / Completed counts  
- 🔍 **Smart search & filtering** by customer, order ID, store, status  
- 👁️ **Order Detail Modal** — line items, costs, timestamps, notes  
- 🧑 **Customer Detail Modal** — full order history + profile  
- ✏️ **Order Notes** — add/edit with user attribution  
- 🛠️ **Modify Orders** — live total recalculation  
- 🎫 **IT Support Tickets** — submit and resolve flagged orders  
- 📱 **Responsive UI** — optimized for desktop and mobile  

---

## 🚀 Getting Started

### Prerequisites

- Java 22+ (SDKMAN, Zulu, or Temurin)
- MySQL 8+ (local or Docker)
- Maven 3.9+
- IntelliJ IDEA (recommended)

---

### ⚡ Quick Setup

#### 1. Clone the repository
```bash
git clone https://github.com/lengtran/order-management-java.git
cd order-management-java
```

#### 2. Create MySQL database
```bash
mysql -u root -p -e "CREATE DATABASE oms_db CHARACTER SET utf8mb4;"
```

#### 3. Copy and configure application properties
```bash
cp src/main/resources/application.properties.example \
   src/main/resources/application.properties
```
Update your MySQL credentials in `application.properties`.

#### 4. Run the application
```bash
mvn spring-boot:run
```

#### 5. Open in browser

http://localhost:8080

**Default Login:**  
Username: admin  
Password: admin123

---

## 📁 Project Structure

```bash
src/
├── main/
│   ├── java/com/oms/
│   │   ├── OrderManagementApplication.java  # Main entry point
│   │   ├── config/                          # Security & JPA configs
│   │   ├── controller/                      # REST controllers
│   │   │   ├── AuthController.java
│   │   │   ├── OrderController.java
│   │   │   └── CustomerController.java
│   │   ├── model/                           # JPA entities
│   │   │   ├── Order.java
│   │   │   ├── Customer.java
│   │   │   └── OrderNote.java
│   │   ├── repository/                      # Data access layer
│   │   └── service/                         # Business logic
│   └── resources/
│       ├── static/                          # Frontend assets
│       │   ├── index.html
│       │   ├── styles.css
│       │   └── app.js
│       └── application.properties
├── pom.xml
└── README.md
```

---

## 🧪 Database

- Automatically migrates on startup via Hibernate  
- Includes sample seed data  

---

## 🔍 Key API Endpoints

| Method | Endpoint                  | Description           |
|--------|---------------------------|-----------------------|
| POST   | `/api/auth/login`         | Generate JWT token    |
| GET    | `/api/orders`             | Get paginated orders  |
| GET    | `/api/orders/{id}`        | Get order details     |
| GET    | `/api/customers/{id}`     | Get customer profile  |
| POST   | `/api/tickets`            | Create support ticket |
| PUT    | `/api/orders/{id}/resolve`| Resolve order         |

---

## 🛠️ Development Commands

```bash
mvn clean install     # Build project
mvn test              # Run tests
mvn spring-boot:run   # Start dev server
mvn package           # Build production JAR
```
