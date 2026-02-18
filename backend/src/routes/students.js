import express from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getStudents); // buscar aluno
router.post("/", createStudent); // criar aluno
router.put("/:id", updateStudent); // atualizar
router.delete("/:id", deleteStudent); // deletar aluno

export default router;
