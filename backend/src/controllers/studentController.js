import db from "../config/db.js";
import pool from "../config/db.js";
// =====================
// GET /students
// =====================
export async function getStudents(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM students");

    const students =  rows.map((row) => ({
      id: row.id,
      name: row.name,
      motherName: row.mother_name, 
      fatherName: row.father_name,
      age: row.age,
      belt: row.belt,
      bloodType: row.blood_type,
      phone: row.phone,
      observations: row.observations,
      address: row.address,
      enrollmentDate: row.enrollment_date,
      monthlyFee: row.monthly_fee,
    }))
    res.json(students);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
}

//GET buscar estudantes pelo ID

export const getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM students WHERE id = ?",
      [id]
    );

    if(rows.length === 0){
      return res.status(404).json({ message: "❌ALUNO NÃO ENCONTRADO"})
    };

    res.json(rows[0]);
  } catch (error){
    console.log("❌ Erro ao buscar aluno por ID:", error);
    res.status(500).json({ message: "❌Erro ao buscar aluno por ID"})
  }
};
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
  
    console.log("📊 DADOS PREPARADOS PARA DB:",req.body)

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

//atualizar alunos

export async function updateStudent(req, res){
  const {id} = req.params;
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

  try {
    const [result] = await db.query(
      `UPDADTE students SET
      name = ?,
      mother_name = ?,
      father_name = ?, 
      age = ?,
      belt = ?,
      blood_type = ?,
      phone = ?,
      observations = ?,
      address = ?,
      enrollment_date = ?,
      monthly_fee = ?
      WHERE id =?`,
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
        enrollmentDate,      
        monthlyFee ?? 0,
        id
      ]
    )
    res.json({ message: "✅ Aluno atualizado com sucesso!" });
  } catch (error){
    console.error("Erro ao atualizar aluno:", error);
    res.status(500).json({ error: "Erro ao atualizar aluno" });
  }
}

// deletar alunos

export async function deleteStudent(req, res){
  const {id} = req.param;

  try{
    await db.query("DELETE FROM students WHERE id = ?", [id]);
    res.json({ message: "✅ Aluno deletado com sucesso!" });
  } catch (error){
    console.log("❌ Erro ao deletar aluno:", error)
    res.status(500).json({ error: "Erro ao deletar aluno"})
  }
}