import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { Student, BELT_LEVELS } from "@/types/student";
import { useToast } from "@/hooks/use-toast";

interface StudentFormProps {
  onAddStudent: (student: Omit<Student, "id">) => void;
}

const StudentForm = ({ onAddStudent }: StudentFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    belt: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.belt) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, idade e graduação.",
        variant: "destructive",
      });
      return;
    }

    const newStudent: Omit<Student, "id"> = {
      name: formData.name.trim(),
      age: parseInt(formData.age),
      belt: formData.belt,
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      enrollmentDate: new Date().toISOString().split("T")[0],
    };

    onAddStudent(newStudent);

    setFormData({
      name: "",
      age: "",
      belt: "",
      phone: "",
      email: "",
    });

    toast({
      title: "Aluno cadastrado!",
      description: `${newStudent.name} foi adicionado com sucesso.`,
    });
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <UserPlus className="h-5 w-5 text-primary" />
          Cadastrar Novo Aluno
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                placeholder="Digite o nome do aluno"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Idade *</Label>
              <Input
                id="age"
                type="number"
                min="3"
                max="100"
                placeholder="Idade"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="belt">Graduação (Faixa) *</Label>
              <Select
                value={formData.belt}
                onValueChange={(value) =>
                  setFormData({ ...formData, belt: value })
                }
              >
                <SelectTrigger id="belt">
                  <SelectValue placeholder="Selecione a faixa" />
                </SelectTrigger>
                <SelectContent>
                  {BELT_LEVELS.map((belt) => (
                    <SelectItem key={belt} value={belt}>
                      {belt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <Button type="submit" className="w-full sm:w-auto">
            <UserPlus className="mr-2 h-4 w-4" />
            Cadastrar Aluno
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentForm;
