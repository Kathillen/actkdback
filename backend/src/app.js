import express from "express";
import studentsRoutes from "./routes/students.js";

const app = express();

app.use(express.json());
app.use("/students", studentsRoutes);

export default app;
