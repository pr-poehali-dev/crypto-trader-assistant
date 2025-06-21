import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/AuthModal";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin text-4xl">🚀</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <AuthModal isOpen={true} onClose={() => {}} onLogin={() => {}} />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
