# 1st Day MySQL with Express

This is my **first practice project** connecting **Node.js (Express)** with **MySQL**.  
It demonstrates basic **CRUD operations** (Create, Read, Update, Delete) and uses **async/await** for clean, modern code.

---

## 🚀 Features

- Connects Node.js server to MySQL database
- Perform CRUD operations on a `users` table
- Uses **parameterized queries** to prevent SQL injection
- Structured with **Express.js** for API routes
- Handles JSON request/response

---

## 🛠 Technologies Used

- Node.js
- Express.js
- MySQL (`mysql2/promise`)
- JavaScript (ES6 modules)

---

## 📂 Project Structure

---

## ⚡ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/reazulislam1487/1st-day-mysql.git
cd 1st-day-mysql
```

## Create .env file in the root folder

- DB_USER=root
- DB_HOST=localhost
- DB_PASSWORD=your_password
- DB_NAME=testdb
- PORT=5000

```bash
CREATE DATABASE testdb;

USE testdb;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
```
