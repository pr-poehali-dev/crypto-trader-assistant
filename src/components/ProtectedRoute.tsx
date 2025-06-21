import { ReactNode, useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setShowAuthModal(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  if (!isAuthenticated) {
    return (
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
