import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Loader2 } from "lucide-react";
import { Student, BELT_LEVELS, BLOOD_TYPES } from "@/types/student";
import { useToast } from "@/hooks/use-toast";

interface StudentFormProps {
  onAddStudent: (student: Omit<Student, "id" | "createdAt" | "updatedAt">) => Promise<any>;
}

const StudentForm = ({ onAddStudent }: StudentFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    motherName: "",
    fatherName: "",
    age: "",
    belt: "",
    bloodType: "",
    phone: "",
    observations: "",
    address: "",
    enrollmentDate: new Date().toISOString().split("T")[0],
    monthlyFee: "",
  });

  const validatePhone = (phone: string) => {
    if (!phone) return true;
    const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "O nome completo é obrigatório.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.age || parseInt(formData.age) < 3 || parseInt(formData.age) > 100) {
      toast({
        title: "Idade inválida",
        description: "A idade deve estar entre 3 e 100 anos.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.belt) {
      toast({
        title: "Campo obrigatório",
        description: "Selecione a graduação (faixa) do aluno.",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast({
        title: "Celular inválido",
        description: "Digite um número de celular válido.",
        variant: "destructive",
      });
      return;
    }

    const monthlyFeeValue = formData.monthlyFee ? parseFloat(formData.monthlyFee) : 0;
    if (formData.monthlyFee && (isNaN(monthlyFeeValue) || monthlyFeeValue < 0)) {
      toast({
        title: "Mensalidade inválida",
        description: "Digite um valor válido para a mensalidade.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const newStudent: Omit<Student, "id" | "createdAt" | "updatedAt"> = {
        name: formData.name.trim(),
        motherName: formData.motherName.trim(),
        fatherName: formData.fatherName.trim(),
        age: parseInt(formData.age),
        belt: formData.belt,
        bloodType: formData.bloodType,
        phone: formData.phone.trim(),
        observations: formData.observations.trim(),
        address: formData.address.trim(),
        enrollmentDate: formData.enrollmentDate,
        monthlyFee: monthlyFeeValue,
      };

      await onAddStudent(newStudent);

      // Reset form
      setFormData({
        name: "",
        motherName: "",
        fatherName: "",
        age: "",
        belt: "",
        bloodType: "",
        phone: "",
        observations: "",
        address: "",
        enrollmentDate: new Date().toISOString().split("T")[0],
        monthlyFee: "",
      });
    } catch (error) {
      // Error handled in hook
    } finally {
      setLoading(false);
    }
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Nome Completo */}
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                placeholder="Digite o nome completo do aluno"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Nome da Mãe */}
            <div className="space-y-2">
              <Label htmlFor="motherName">Nome da Mãe</Label>
              <Input
                id="motherName"
                placeholder="Nome completo da mãe"
                value={formData.motherName}
                onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Nome do Pai */}
            <div className="space-y-2">
              <Label htmlFor="fatherName">Nome do Pai</Label>
              <Input
                id="fatherName"
                placeholder="Nome completo do pai"
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Idade */}
            <div className="space-y-2">
              <Label htmlFor="age">Idade *</Label>
              <Input
                id="age"
                type="number"
                min="3"
                max="100"
                placeholder="Ex: 25"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Graduação */}
            <div className="space-y-2">
              <Label htmlFor="belt">Graduação (Faixa) *</Label>
              <Select
                value={formData.belt}
                onValueChange={(value) => setFormData({ ...formData, belt: value })}
                disabled={loading}
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

            {/* Tipo Sanguíneo */}
            <div className="space-y-2">
              <Label htmlFor="bloodType">Tipo Sanguíneo</Label>
              <Select
                value={formData.bloodType}
                onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
                disabled={loading}
              >
                <SelectTrigger id="bloodType">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {BLOOD_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Celular */}
            <div className="space-y-2">
              <Label htmlFor="phone">Número de Celular</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Data de Matrícula */}
            <div className="space-y-2">
              <Label htmlFor="enrollmentDate">Aluno Desde *</Label>
              <Input
                id="enrollmentDate"
                type="date"
                value={formData.enrollmentDate}
                onChange={(e) => setFormData({ ...formData, enrollmentDate: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Mensalidade */}
            <div className="space-y-2">
              <Label htmlFor="monthlyFee">Mensalidade (R$)</Label>
              <Input
                id="monthlyFee"
                type="number"
                min="0"
                step="0.01"
                placeholder="Ex: 150.00"
                value={formData.monthlyFee}
                onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Endereço */}
            <div className="space-y-2 sm:col-span-2 lg:col-span-3">
              <Label htmlFor="address">Endereço Completo</Label>
              <Input
                id="address"
                placeholder="Rua, número, bairro, cidade, estado"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Observações */}
            <div className="space-y-2 sm:col-span-2 lg:col-span-3">
              <Label htmlFor="observations">Observações</Label>
              <Textarea
                id="observations"
                placeholder="Informações adicionais sobre o aluno (ex: restrições, medicamentos, etc.)"
                value={formData.observations}
                rows={3}
                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cadastrando...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Cadastrar Aluno
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentForm;
