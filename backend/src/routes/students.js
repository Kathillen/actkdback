import express from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/students", getStudents); // buscar aluno
router.post("/students", createStudent); // criar aluno
router.put("/students/:id", updateStudent); // atualizar
router.delete("/students/:id", deleteStudent); // deletar aluno

export default router;
