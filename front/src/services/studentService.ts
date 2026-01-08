import { Student } from "@/types/student";

const API_URL = "http://localhost:3000/students";

export async function createStudent(
  student: Omit<Student, "id" | "createdAt" | "updatedAt">
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: student.name,
      mother_name: student.motherName,
      father_name: student.fatherName,
      age: student.age, 
      belt: student.belt,
      blood_type: student.bloodType,
      phone: student.phone,
      observations: student.observations,
      address: student.address,
      enrollment_date: student.enrollmentDate,
      monthly_fee: student.monthlyFee,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar aluno");
  }

  return response.json();
}
