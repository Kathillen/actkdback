import db from "../config/db.js";

// =====================
// GET /students
// =====================
export async function getStudents(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM students");
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
}

// =====================
// POST /students
// =====================
export async function createStudent(req, res) {
  console.log("📥 BODY RECEBIDO:", req.body);

  try {
    // 🔁 CONVERSÃO camelCase (front) → snake_case (DB)
    const {
      name,
      mother_name,
      father_name,
      age,
      belt,
      blood_type,
      phone,
      observations,
      address,
      enrollment_date,
      monthly_fee,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO students
      (name, mother_name, father_name, age, belt, blood_type, phone, observations, address, enrollment_date, monthly_fee)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        mother_name,
        father_name,
        age,
        belt,
        blood_type,
        phone,
        observations,
        address,
        enrollment_date,      // ✅ agora NÃO será null
        monthly_fee ?? 0,
      ]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      mother_name,
      father_name,
      age,
      belt,
      blood_type,
      phone,
      observations,
      address,
      enrollment_date,
      monthly_fee,
    });
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    res.status(500).json({ error: "Erro ao criar aluno" });
  }
}
