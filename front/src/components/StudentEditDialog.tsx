import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Save } from "lucide-react";
import { Student, BELT_LEVELS, BLOOD_TYPES } from "@/types/student";
import { useToast } from "@/hooks/use-toast";

interface StudentEditDialogProps {
  student: Student | null;
  onClose: () => void;
  onSave: (id: string, data: Partial<Student>) => Promise<void>;
}

const StudentEditDialog = ({ student, onClose, onSave }: StudentEditDialogProps) => {
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
    enrollmentDate: "",
    monthlyFee: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        motherName: student.motherName || "",
        fatherName: student.fatherName || "",
        age: student.age.toString(),
        belt: student.belt,
        bloodType: student.bloodType || "",
        phone: student.phone || "",
        observations: student.observations || "",
        address: student.address || "",
        enrollmentDate: student.enrollmentDate,
        monthlyFee: student.monthlyFee?.toString() || "",
      });
    }
  }, [student]);

  const validatePhone = (phone: string) => {
    if (!phone) return true;
    const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

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
      await onSave(student.id, {
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
      });
      onClose();
    } catch (error) {
      // Error handled in hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!student} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Aluno</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Nome Completo */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="edit-name">Nome Completo *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Nome da Mãe */}
            <div className="space-y-2">
              <Label htmlFor="edit-motherName">Nome da Mãe</Label>
              <Input
                id="edit-motherName"
                value={formData.motherName}
                onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Nome do Pai */}
            <div className="space-y-2">
              <Label htmlFor="edit-fatherName">Nome do Pai</Label>
              <Input
                id="edit-fatherName"
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Idade */}
            <div className="space-y-2">
              <Label htmlFor="edit-age">Idade *</Label>
              <Input
                id="edit-age"
                type="number"
                min="3"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Graduação */}
            <div className="space-y-2">
              <Label htmlFor="edit-belt">Graduação (Faixa) *</Label>
              <Select
                value={formData.belt}
                onValueChange={(value) => setFormData({ ...formData, belt: value })}
                disabled={loading}
              >
                <SelectTrigger id="edit-belt">
                  <SelectValue />
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
              <Label htmlFor="edit-bloodType">Tipo Sanguíneo</Label>
              <Select
                value={formData.bloodType}
                onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
                disabled={loading}
              >
                <SelectTrigger id="edit-bloodType">
                  <SelectValue placeholder="Selecione" />
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
              <Label htmlFor="edit-phone">Número de Celular</Label>
              <Input
                id="edit-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Data de Matrícula */}
            <div className="space-y-2">
              <Label htmlFor="edit-enrollmentDate">Aluno Desde *</Label>
              <Input
                id="edit-enrollmentDate"
                type="date"
                value={formData.enrollmentDate}
                onChange={(e) => setFormData({ ...formData, enrollmentDate: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Mensalidade */}
            <div className="space-y-2">
              <Label htmlFor="edit-monthlyFee">Mensalidade (R$)</Label>
              <Input
                id="edit-monthlyFee"
                type="number"
                min="0"
                step="0.01"
                value={formData.monthlyFee}
                onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Endereço */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="edit-address">Endereço Completo</Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Observações */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="edit-observations">Observações</Label>
              <Textarea
                id="edit-observations"
                value={formData.observations}
                rows={3}
                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentEditDialog;
