import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// MySQL connection setup
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let connection;

// Connect to MySQL
async function connectDB() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Connected to MySQL database");
  } catch (err) {
    console.error("❌ MySQL connection error:", err);
    process.exit(1);
  }
}

// Call connectDB immediately
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// GET all users
app.get("/users", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user by ID
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a new user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await connection.execute(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a user
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    await connection.execute(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id]
    );
    res.json({ id, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await connection.execute("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
