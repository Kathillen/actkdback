import { Student } from "@/types/student";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Trash2 } from "lucide-react";

interface StudentTableProps {
  students: Student[];
  onDeleteStudent: (id: string) => void;
}

const getBeltColor = (belt: string) => {
  const colors: Record<string, string> = {
    Branca: "bg-gray-100 text-gray-800 border-gray-300",
    Amarela: "bg-yellow-100 text-yellow-800 border-yellow-400",
    Verde: "bg-green-100 text-green-800 border-green-500",
    Azul: "bg-blue-100 text-blue-800 border-blue-500",
    Vermelha: "bg-red-100 text-red-800 border-red-500",
    Preta: "bg-gray-900 text-white border-gray-900",
  };
  return colors[belt] || "bg-muted text-muted-foreground";
};

const StudentTable = ({ students, onDeleteStudent }: StudentTableProps) => {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-lg font-semibold">
            <Users className="h-5 w-5 text-primary" />
            Alunos Cadastrados
          </span>
          <Badge variant="secondary" className="text-sm">
            {students.length} {students.length === 1 ? "aluno" : "alunos"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {students.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">
              Nenhum aluno cadastrado ainda.
            </p>
            <p className="text-sm text-muted-foreground/70">
              Use o formulário acima para adicionar alunos.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="text-center">Idade</TableHead>
                  <TableHead className="text-center">Graduação</TableHead>
                  <TableHead className="hidden md:table-cell">Telefone</TableHead>
                  <TableHead className="hidden lg:table-cell">E-mail</TableHead>
                  <TableHead className="hidden sm:table-cell">Matrícula</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-center">{student.age}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={`${getBeltColor(student.belt)} border`}
                      >
                        {student.belt}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {student.phone || "-"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {student.email || "-"}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                      {student.enrollmentDate}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteStudent(student.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentTable;
