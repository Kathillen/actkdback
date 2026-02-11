import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  // Auth ainda está carregando
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-muted-foreground text-sm">
          Verificando autenticação…
        </span>
      </div>
    );
  }

  // Não autenticado → vai para login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Autenticado → renderiza a rota
  return <>{children}</>;
}
