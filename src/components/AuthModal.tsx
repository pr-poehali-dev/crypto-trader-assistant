import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: () => void;
}

const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        toast.success("Успешный вход!");
      } else {
        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.name,
        );
        if (error) throw error;
        toast.success(
          "Регистрация успешна! Проверьте email для подтверждения.",
        );
      }

      onLogin?.();
      onClose();
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-card border-crypto-neon-blue/20">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-green bg-clip-text text-transparent">
            {isLogin ? "Вход в систему" : "Регистрация"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                placeholder="Введите ваше имя"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required={!isLogin}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Введите email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 animate-pulse-neon"
          >
            <Icon
              name={loading ? "Loader2" : "LogIn"}
              className={`mr-2 ${loading ? "animate-spin" : ""}`}
            />
            {loading
              ? "Обработка..."
              : isLogin
                ? "Войти"
                : "Зарегистрироваться"}
          </Button>
        </form>

        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
          </p>
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-crypto-neon-blue hover:text-crypto-neon-green"
          >
            {isLogin ? "Создать аккаунт" : "Войти"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
