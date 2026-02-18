import express from "express";
import studentsRoutes from "./routes/students.js";
import cors from "cors";
import { // importando as funções do controller
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent
} from "./controllers/studentController.js";

const app = express();

app.use(cors({
    origin:"https://actkdfront.vercel.app",
    credentials: true
})); 

app.use(express.json());

app.use("/students", studentsRoutes);

const router = express.Router();

router.get("/students", getStudents); // buscar aluno
router.post("/students", createStudent); // criar aluno
router.put("/students/:id", updateStudent); // atualizar
router.delete("/students/:id", deleteStudent); // deletar aluno

app.use(router);

