# 🧾 PostgreSQL Transactions using Express.js

![Node.js](https://img.shields.io/badge/Node.js-v18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Framework-blue?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

A simple **Node.js + Express + PostgreSQL** project demonstrating how to perform **database transactions**, **foreign key relationships**, and **JOIN queries**.  
Built using the `pg` library and hosted on **Neon.tech**.

---

## 📌 Features

✅ User signup (insert into `users` and `addresses` tables)  
✅ Demonstrates **atomic transactions** using `BEGIN` and `COMMIT`  
✅ Demonstrates **partial transactions** by delaying execution  
✅ Fetch metadata via individual queries or a **JOIN query**  
✅ Foreign key relationship between `users` and `addresses`  
✅ Protection against **SQL injection** using placeholders (`$1, $2, $3`)  

---

## 🏗️ Tech Stack

| Component | Technology |
|------------|-------------|
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| ORM/Driver | pg (node-postgres) |
| Hosting (optional) | Neon.tech |
| Tooling | Postman for API testing |

---
⚙️ Setup Instructions

1️⃣ Clone the Repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2️⃣ Install Dependencies
npm install express pg

3️⃣ Set Up Your Database

Create a PostgreSQL database on Neon.tech
 (or locally).

Copy your connection string from Neon Dashboard.


4️⃣ Start the Server
node server.js


