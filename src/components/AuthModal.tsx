import { useState } from "react";
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

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: () => void;
}

const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Симуляция успешной аутентификации
    const token = "demo_token_" + Date.now();
    localStorage.setItem("auth_token", token);
    localStorage.setItem(
      "user_name",
      formData.name || formData.email.split("@")[0],
    );

    onLogin?.();
    onClose();
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
            className="w-full bg-primary hover:bg-primary/90 animate-pulse-neon"
          >
            <Icon name="LogIn" className="mr-2" />
            {isLogin ? "Войти" : "Зарегистрироваться"}
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
