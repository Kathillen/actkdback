import express from "express";
import studentsRoutes from "./routes/students.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin:"https://actkdfront.vercel.app",
    credentials: true
})); 

app.use(express.json());

app.use("/students", studentsRoutes);

export default app;