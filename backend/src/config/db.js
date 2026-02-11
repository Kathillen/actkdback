import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
});

async function startServer() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log("DB OK");

    app.listen(3000, () => {
      console.log("Server running");
    });

  } catch (err) {
    console.error("DB FAILED", err);
    process.exit(1);
  }
}

export default pool;
