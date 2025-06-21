import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeroProps {
  onAuthClick: () => void;
}

const Hero = ({ onAuthClick }: HeroProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-crypto-dark via-crypto-card to-crypto-dark">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-crypto-neon-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-crypto-neon-green/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-green bg-clip-text text-transparent">
            CryptoTrader Assistant
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Умный помощник для крипто трейдера — вся важная информация в одном
            месте. Анализируйте рынки, отслеживайте портфели и принимайте
            взвешенные торговые решения.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onAuthClick}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 animate-pulse-neon"
            >
              <Icon name="Rocket" className="mr-2" />
              Начать работу
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-crypto-neon-green text-crypto-neon-green hover:bg-crypto-neon-green/10"
            >
              <Icon name="BarChart3" className="mr-2" />
              Демо-режим
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-crypto-neon-blue">
                500+
              </div>
              <div className="text-sm text-muted-foreground">Монет</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-crypto-neon-green">
                24/7
              </div>
              <div className="text-sm text-muted-foreground">Мониторинг</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-crypto-purple">
                Real-time
              </div>
              <div className="text-sm text-muted-foreground">Данные</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-crypto-neon-blue">AI</div>
              <div className="text-sm text-muted-foreground">Анализ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
