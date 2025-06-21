import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Начните торговать прямо сейчас
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к успешным трейдерам, которые уже зарабатывают с
            CryptoTrader Assistant
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-8 py-4 animate-pulse-neon"
            >
              <Icon name="TrendingUp" className="mr-2" />
              Начать торговлю
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-orange-500 text-orange-500 hover:bg-orange-500/10 px-8 py-4"
            >
              <Icon name="Play" className="mr-2" />
              Демо-режим
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Icon name="Check" className="text-green-500 mr-2" size={16} />
              Демо-счет $10,000
            </div>
            <div className="flex items-center">
              <Icon name="Check" className="text-green-500 mr-2" size={16} />
              Без комиссий за регистрацию
            </div>
            <div className="flex items-center">
              <Icon name="Check" className="text-green-500 mr-2" size={16} />
              Поддержка экспертов
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
