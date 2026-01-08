import StudentForm from "@/components/StudentForm";
import StudentTable from "@/components/StudentTable";
import UserBadge from "@/components/UserBadge";
import { useStudents } from "@/hooks/useStudents";
import { Swords } from "lucide-react";

const Index = () => {
  const { students, loading, addStudent, updateStudent, deleteStudent } = useStudents();

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
                Sistema de Cadastro de Alunos
              </h1>
              <span className="text-xs text-muted-foreground">Taekwondo</span>
            </div>
          </div>
          <UserBadge />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Formulário de Cadastro */}
          <StudentForm onAddStudent={addStudent} />

          {/* Tabela de Alunos */}
          <StudentTable
            students={students}
            loading={loading}
            onDeleteStudent={deleteStudent}
            onUpdateStudent={updateStudent}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
