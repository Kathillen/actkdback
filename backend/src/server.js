import app from "./app.js";
import pool from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

export async function startServer() {
  try {
    const connection = await pool.getConnection();
    connection.realease();
    console.log("✅ DB OK");
    
    app.listen(PORT, () => {
      console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
    });

} catch (err){
  console.error("❌ ERRO AO CONECTAR COM O BANCO DE DADOS:", err.message);
  process.exit(1)
  }
}

startServer();