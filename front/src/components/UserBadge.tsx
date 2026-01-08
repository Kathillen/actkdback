import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, User } from "lucide-react";

const UserBadge = () => {
  const { user, userRole, signOut } = useAuth();

  if (!user) return null;

  const displayRole = userRole === "admin" ? "Admin" : userRole === "professor" ? "Professor" : "Usuário";

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="gap-1.5 py-1 px-2.5">
        <User className="h-3 w-3" />
        <span className="text-xs font-medium">{displayRole}</span>
      </Badge>
      <Button
        variant="ghost"
        size="sm"
        onClick={signOut}
        className="text-muted-foreground hover:text-foreground"
        title="Sair"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UserBadge;
