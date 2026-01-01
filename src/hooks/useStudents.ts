import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Student } from "@/types/student";
import { useToast } from "@/hooks/use-toast";

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedStudents: Student[] = (data || []).map((s) => ({
        id: s.id,
        name: s.name,
        motherName: s.mother_name || "",
        fatherName: s.father_name || "",
        age: s.age,
        belt: s.belt,
        bloodType: s.blood_type || "",
        phone: s.phone || "",
        observations: s.observations || "",
        address: s.address || "",
        enrollmentDate: s.enrollment_date,
        monthlyFee: Number(s.monthly_fee) || 0,
        createdAt: s.created_at,
        updatedAt: s.updated_at,
      }));

      setStudents(formattedStudents);
    } catch (error: any) {
      console.error("Error fetching students:", error);
      toast({
        title: "Erro ao carregar alunos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Create a new student
  const addStudent = async (studentData: Omit<Student, "id" | "createdAt" | "updatedAt">) => {
    try {
      const { data, error } = await supabase
        .from("students")
        .insert({
          name: studentData.name,
          mother_name: studentData.motherName || null,
          father_name: studentData.fatherName || null,
          age: studentData.age,
          belt: studentData.belt,
          blood_type: studentData.bloodType || null,
          phone: studentData.phone || null,
          observations: studentData.observations || null,
          address: studentData.address || null,
          enrollment_date: studentData.enrollmentDate,
          monthly_fee: studentData.monthlyFee || 0,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Aluno cadastrado!",
        description: `${studentData.name} foi adicionado com sucesso.`,
      });

      await fetchStudents();
      return data;
    } catch (error: any) {
      console.error("Error adding student:", error);
      toast({
        title: "Erro ao cadastrar aluno",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Update an existing student
  const updateStudent = async (id: string, studentData: Partial<Student>) => {
    try {
      const updateData: any = {};
      
      if (studentData.name !== undefined) updateData.name = studentData.name;
      if (studentData.motherName !== undefined) updateData.mother_name = studentData.motherName;
      if (studentData.fatherName !== undefined) updateData.father_name = studentData.fatherName;
      if (studentData.age !== undefined) updateData.age = studentData.age;
      if (studentData.belt !== undefined) updateData.belt = studentData.belt;
      if (studentData.bloodType !== undefined) updateData.blood_type = studentData.bloodType;
      if (studentData.phone !== undefined) updateData.phone = studentData.phone;
      if (studentData.observations !== undefined) updateData.observations = studentData.observations;
      if (studentData.address !== undefined) updateData.address = studentData.address;
      if (studentData.enrollmentDate !== undefined) updateData.enrollment_date = studentData.enrollmentDate;
      if (studentData.monthlyFee !== undefined) updateData.monthly_fee = studentData.monthlyFee;

      const { error } = await supabase
        .from("students")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Aluno atualizado!",
        description: "Os dados foram salvos com sucesso.",
      });

      await fetchStudents();
    } catch (error: any) {
      console.error("Error updating student:", error);
      toast({
        title: "Erro ao atualizar aluno",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Delete a student
  const deleteStudent = async (id: string) => {
    try {
      const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Aluno removido",
        description: "O aluno foi excluído com sucesso.",
      });

      await fetchStudents();
    } catch (error: any) {
      console.error("Error deleting student:", error);
      toast({
        title: "Erro ao remover aluno",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Set up realtime subscription
  useEffect(() => {
    fetchStudents();

    const channel = supabase
      .channel("students-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "students",
        },
        () => {
          fetchStudents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
