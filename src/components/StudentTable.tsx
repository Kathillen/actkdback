import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Users, Trash2, Eye, Pencil, Droplets, MapPin, FileText, Calendar, DollarSign, Loader2 } from "lucide-react";
import StudentEditDialog from "./StudentEditDialog";

interface StudentTableProps {
  students: Student[];
  loading: boolean;
  onDeleteStudent: (id: string) => Promise<void>;
  onUpdateStudent: (id: string, data: Partial<Student>) => Promise<void>;
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

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR");
};

const StudentTable = ({ students, loading, onDeleteStudent, onUpdateStudent }: StudentTableProps) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await onDeleteStudent(deleteId);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <Card className="border-border/50">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Carregando alunos...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-lg font-semibold">
              <Users className="h-5 w-5 text-primary" />
              Lista de Alunos
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
                    <TableHead>Nome Completo</TableHead>
                    <TableHead className="text-center">Idade</TableHead>
                    <TableHead className="text-center">Graduação</TableHead>
                    <TableHead className="text-center hidden sm:table-cell">Tipo Sang.</TableHead>
                    <TableHead className="hidden md:table-cell">Celular</TableHead>
                    <TableHead className="text-right hidden lg:table-cell">Mensalidade</TableHead>
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
                      <TableCell className="text-center hidden sm:table-cell">
                        {student.bloodType ? (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            <Droplets className="h-3 w-3 mr-1" />
                            {student.bloodType}
                          </Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {student.phone || "-"}
                      </TableCell>
                      <TableCell className="text-right hidden lg:table-cell">
                        {student.monthlyFee > 0 ? formatCurrency(student.monthlyFee) : "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedStudent(student)}
                            className="text-primary hover:text-primary hover:bg-primary/10"
                            title="Ver detalhes"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingStudent(student)}
                            className="text-amber-600 hover:text-amber-600 hover:bg-amber-50"
                            title="Editar aluno"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteId(student.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            title="Excluir aluno"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Dados do Aluno
            </DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Nome Completo</p>
                  <p className="font-medium">{selectedStudent.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome da Mãe</p>
                    <p className="font-medium">{selectedStudent.motherName || "Não informado"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nome do Pai</p>
                    <p className="font-medium">{selectedStudent.fatherName || "Não informado"}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Idade</p>
                    <p className="font-medium">{selectedStudent.age} anos</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Graduação</p>
                    <Badge
                      variant="outline"
                      className={`${getBeltColor(selectedStudent.belt)} border`}
                    >
                      {selectedStudent.belt}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Droplets className="h-3 w-3" />
                      Tipo Sanguíneo
                    </p>
                    <p className="font-medium">{selectedStudent.bloodType || "Não informado"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Celular</p>
                    <p className="font-medium">{selectedStudent.phone || "Não informado"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Aluno Desde
                    </p>
                    <p className="font-medium">{formatDate(selectedStudent.enrollmentDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Mensalidade
                    </p>
                    <p className="font-medium">
                      {selectedStudent.monthlyFee > 0 ? formatCurrency(selectedStudent.monthlyFee) : "Não informado"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Endereço Completo
                  </p>
                  <p className="font-medium">{selectedStudent.address || "Não informado"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    Observações
                  </p>
                  <p className="font-medium text-sm">
                    {selectedStudent.observations || "Nenhuma observação registrada"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <StudentEditDialog
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onSave={onUpdateStudent}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StudentTable;
