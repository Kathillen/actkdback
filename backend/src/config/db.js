import mysql from "mysql2/promise";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

console.log("ENV CHECK:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? "OK" : "MISSING",
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
});

async function startServer() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log("✅ DB OK");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ DB FAILED:", err.message);
    process.exit(1);
  }
}

startServer();

export default pool;
