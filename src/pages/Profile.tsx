import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState(
    localStorage.getItem("user_name") || "",
  );
  const [email, setEmail] = useState(
    localStorage.getItem("user_email") || "trader@example.com",
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    localStorage.setItem("user_name", userName);
    localStorage.setItem("user_email", email);
    setIsEditing(false);
    toast({
      title: "Профиль обновлен",
      description: "Ваши данные успешно сохранены",
    });
  };

  const handleCancel = () => {
    setUserName(localStorage.getItem("user_name") || "");
    setEmail(localStorage.getItem("user_email") || "trader@example.com");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card border-b border-crypto-neon-blue/20 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate("/dashboard")}
              variant="ghost"
              size="sm"
            >
              <Icon name="ArrowLeft" className="mr-2" size={18} />
              Назад
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-green bg-clip-text text-transparent">
                Профиль
              </h1>
              <p className="text-sm text-muted-foreground">
                Управление настройками аккаунта
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Profile Information */}
        <Card className="glass-card border-crypto-neon-blue/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Icon
                    name="User"
                    className="text-crypto-neon-blue"
                    size={24}
                  />
                  <span>Личная информация</span>
                </CardTitle>
                <CardDescription>
                  Основные данные вашего аккаунта
                </CardDescription>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                size="sm"
                className="border-crypto-neon-green/30 hover:bg-crypto-neon-green/10"
              >
                <Icon
                  name={isEditing ? "X" : "Edit"}
                  className="mr-2"
                  size={16}
                />
                {isEditing ? "Отмена" : "Редактировать"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя пользователя</Label>
                <Input
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={!isEditing}
                  className="bg-background/50 border-crypto-neon-blue/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className="bg-background/50 border-crypto-neon-blue/20"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex space-x-2 pt-4">
                <Button
                  onClick={handleSave}
                  className="bg-crypto-neon-green/20 hover:bg-crypto-neon-green/30 text-crypto-neon-green"
                >
                  <Icon name="Check" className="mr-2" size={16} />
                  Сохранить
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-crypto-neon-blue/30"
                >
                  Отмена
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="glass-card border-crypto-neon-blue/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon
                name="Settings"
                className="text-crypto-neon-blue"
                size={24}
              />
              <span>Настройки аккаунта</span>
            </CardTitle>
            <CardDescription>
              Дополнительные параметры вашего профиля
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-crypto-neon-blue/20 bg-background/30">
              <div className="flex items-center space-x-3">
                <Icon
                  name="Bell"
                  className="text-crypto-neon-green"
                  size={20}
                />
                <div>
                  <p className="font-medium">Push-уведомления</p>
                  <p className="text-sm text-muted-foreground">
                    Получать уведомления о важных событиях
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Настроить
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-crypto-neon-blue/20 bg-background/30">
              <div className="flex items-center space-x-3">
                <Icon
                  name="Shield"
                  className="text-crypto-neon-green"
                  size={20}
                />
                <div>
                  <p className="font-medium">Безопасность</p>
                  <p className="text-sm text-muted-foreground">
                    Настройки двухфакторной аутентификации
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Настроить
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-crypto-neon-blue/20 bg-background/30">
              <div className="flex items-center space-x-3">
                <Icon
                  name="Palette"
                  className="text-crypto-neon-green"
                  size={20}
                />
                <div>
                  <p className="font-medium">Тема интерфейса</p>
                  <p className="text-sm text-muted-foreground">
                    Персонализация внешнего вида
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Изменить
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="glass-card border-crypto-neon-blue/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon
                name="BarChart3"
                className="text-crypto-neon-blue"
                size={24}
              />
              <span>Статистика</span>
            </CardTitle>
            <CardDescription>Ваша активность на платформе</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg border border-crypto-neon-green/20 bg-crypto-neon-green/5">
                <div className="text-2xl font-bold text-crypto-neon-green">
                  127
                </div>
                <p className="text-sm text-muted-foreground">
                  Дней на платформе
                </p>
              </div>
              <div className="text-center p-4 rounded-lg border border-crypto-neon-blue/20 bg-crypto-neon-blue/5">
                <div className="text-2xl font-bold text-crypto-neon-blue">
                  45
                </div>
                <p className="text-sm text-muted-foreground">
                  Сделок совершено
                </p>
              </div>
              <div className="text-center p-4 rounded-lg border border-crypto-neon-green/20 bg-crypto-neon-green/5">
                <div className="text-2xl font-bold text-crypto-neon-green">
                  12
                </div>
                <p className="text-sm text-muted-foreground">
                  Активных позиций
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
