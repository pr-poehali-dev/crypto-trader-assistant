import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const ServiceDescription = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-[#ffffff]">
            Что такое CryptoTrader Assistant
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Умный помощник для торговли криптовалютами на основе искусственного
            интеллекта. Автоматизированный анализ рынка, точные сигналы и
            управление рисками в одной платформе.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Brain" className="text-orange-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-анализ рынка</h3>
            <p className="text-muted-foreground">
              Искусственный интеллект анализирует рыночные тренды, объемы торгов
              и техническую информацию для принятия торговых решений.
            </p>
          </div>

          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <Icon name="TrendingUp" className="text-green-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Торговые сигналы</h3>
            <p className="text-muted-foreground">
              Получайте точные сигналы на покупку и продажу с указанием
              оптимальных точек входа и выхода из позиций.
            </p>
          </div>

          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Shield" className="text-blue-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Управление рисками</h3>
            <p className="text-muted-foreground">
              Автоматическое управление рисками с настраиваемыми стоп-лоссами и
              тейк-профитами для защиты капитала.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDescription;
