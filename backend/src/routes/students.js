import express from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

console.log("📦 Students routes carregadas");

const router = express.Router();

router.get("/", getStudents); // buscar aluno
router.get("/:id", getStudentById); // buscar aluno por ID
router.post("/", createStudent); // criar aluno
router.put("/:id", updateStudent); // atualizar
router.delete("/:id", deleteStudent); // deletar aluno

export default router;
