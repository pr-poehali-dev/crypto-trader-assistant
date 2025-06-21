import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";
import CryptoPrices from "@/components/CryptoPrices";
import ChartsAnalytics from "@/components/ChartsAnalytics";
import News from "@/components/News";
import TradingTools from "@/components/TradingTools";
import Contact from "@/components/Contact";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Ошибка при выходе");
    } else {
      toast.success("Вы вышли из системы");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="glass-card border-b border-crypto-neon-blue/20 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Icon
              name="TrendingUp"
              className="text-crypto-neon-blue"
              size={32}
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-green bg-clip-text text-transparent">
                Личный кабинет
              </h1>
              <p className="text-sm text-muted-foreground">
                Добро пожаловать, {user?.user_metadata?.name || user?.email}!
              </p>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-crypto-neon-blue/30 hover:bg-crypto-neon-blue/10"
          >
            <Icon name="LogOut" className="mr-2" size={18} />
            Выйти
          </Button>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        <CryptoPrices />
        <ChartsAnalytics />
        <News />
        <TradingTools />
        <Contact />
      </main>
    </div>
  );
};

export default Dashboard;
