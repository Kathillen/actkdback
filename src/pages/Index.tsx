import { useState } from "react";
import { Student } from "@/types/student";
import StudentForm from "@/components/StudentForm";
import StudentTable from "@/components/StudentTable";
import { Swords } from "lucide-react";

const Index = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const handleAddStudent = (studentData: Omit<Student, "id">) => {
    const newStudent: Student = {
      ...studentData,
      id: crypto.randomUUID(),
    };
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Swords className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">
                Sistema de Alunos
              </h1>
              <span className="text-xs text-muted-foreground">Taekwondo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Formulário de Cadastro */}
          <StudentForm onAddStudent={handleAddStudent} />

          {/* Tabela de Alunos */}
          <StudentTable
            students={students}
            onDeleteStudent={handleDeleteStudent}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
