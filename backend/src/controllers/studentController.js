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
      motherName,
      fatherName,
      age,
      belt,
      bloodType,
      phone,
      observations,
      address,
      enrollmentDate,
      monthlyFee,
    } = req.body;
  
    console.log("'📊 DADOS PREPARADOS PARA DB:",req.body)

    const [result] = await db.query(
      `INSERT INTO students
      (name, mother_name, father_name, age, belt, blood_type, phone, observations, address, enrollment_date, monthly_fee)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        motherName || null,
        fatherName || null,
        age,
        belt,
        bloodType || null,
        phone || null,
        observations || null,
        address || null,
        enrollmentDate,      // ✅ agora NÃO será null
        monthlyFee ?? 0,
      ]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      mother_name: motherName || null,
      father_name: fatherName || null,
      age,
      belt,
      blood_type: bloodType || null,
      phone: phone || null,
      observations: observations || null,
      address: address || null,
      enrollment_date: enrollmentDate,
      monthly_fee: monthlyFee ?? 0,
    });
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    res.status(500).json({ error: "Erro ao criar aluno" });
  }
}
