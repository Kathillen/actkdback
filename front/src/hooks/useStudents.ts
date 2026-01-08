import { useEffect, useState } from "react";
import { Student } from "@/types/student";
import { useToast } from "@/hooks/use-toast";

const API_URL = "http://localhost:3000";

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // 🔹 GET /students
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/students`);
      if (!res.ok) throw new Error("Erro ao buscar alunos");

      const data = await res.json();
      setStudents(data);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar alunos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 POST /students
  const addStudent = async (
    student: Omit<Student, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const res = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar aluno");

      const newStudent = await res.json();

      setStudents((prev) => [newStudent, ...prev]);

      toast({
        title: "Aluno cadastrado!",
        description: `${student.name} foi adicionado com sucesso.`,
      });

      return newStudent;
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar aluno",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // 🔹 PUT /students/:id
  const updateStudent = async (student: Student) => {
    try {
      const res = await fetch(`${API_URL}/students/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (!res.ok) throw new Error("Erro ao atualizar aluno");

      const updated = await res.json();

      setStudents((prev) =>
        prev.map((s) => (s.id === updated.id ? updated : s))
      );

      toast({
        title: "Aluno atualizado!",
        description: "Os dados foram salvos com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar aluno",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // 🔹 DELETE /students/:id
  const deleteStudent = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao remover aluno");

      setStudents((prev) => prev.filter((s) => s.id !== id));

      toast({
        title: "Aluno removido",
        description: "O aluno foi excluído com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao remover aluno",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    refetch: fetchStudents,
  };
};
