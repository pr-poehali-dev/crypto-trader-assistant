import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ChartsAnalytics = () => {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [timeframe, setTimeframe] = useState("1d");

  const coins = ["BTC", "ETH", "SOL", "ADA", "BNB"];
  const timeframes = [
    { value: "1h", label: "1 час" },
    { value: "1d", label: "1 день" },
    { value: "1w", label: "1 неделя" },
    { value: "1m", label: "1 месяц" },
  ];

  const technicalData = {
    trend: "Восходящий",
    support: "$41,200",
    resistance: "$44,800",
    rsi: "65.4",
    macd: "Бычий сигнал",
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-green bg-clip-text text-transparent">
          Графики и аналитика
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              {/* Controls */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex gap-2">
                  {coins.map((coin) => (
                    <Button
                      key={coin}
                      onClick={() => setSelectedCoin(coin)}
                      variant={selectedCoin === coin ? "default" : "outline"}
                      size="sm"
                    >
                      {coin}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2">
                  {timeframes.map((tf) => (
                    <Button
                      key={tf.value}
                      onClick={() => setTimeframe(tf.value)}
                      variant={timeframe === tf.value ? "default" : "outline"}
                      size="sm"
                    >
                      {tf.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Mock Chart Area */}
              <div className="h-80 bg-gradient-to-br from-crypto-card/50 to-crypto-dark/50 rounded-lg p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-crypto-neon-blue/10 to-crypto-neon-green/10"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    <Icon
                      name="BarChart3"
                      size={48}
                      className="text-crypto-neon-blue mx-auto mb-4"
                    />
                    <p className="text-muted-foreground">
                      График {selectedCoin} -{" "}
                      {timeframes.find((tf) => tf.value === timeframe)?.label}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Интерактивный график будет здесь
                    </p>
                  </div>
                </div>

                {/* Mock price line */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 200"
                >
                  <polyline
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    points="20,150 60,120 100,140 140,100 180,110 220,80 260,90 300,60 340,70 380,50"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#00d4ff" />
                      <stop offset="100%" stopColor="#00ff88" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Technical Analysis */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Icon name="Activity" className="mr-2 text-crypto-neon-blue" />
                Технический анализ
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Тренд:</span>
                  <span className="text-crypto-neon-green font-semibold">
                    {technicalData.trend}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Поддержка:</span>
                  <span className="font-semibold">{technicalData.support}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Сопротивление:</span>
                  <span className="font-semibold">
                    {technicalData.resistance}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">RSI:</span>
                  <span className="font-semibold">{technicalData.rsi}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">MACD:</span>
                  <span className="text-crypto-neon-green font-semibold">
                    {technicalData.macd}
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Icon name="Target" className="mr-2 text-crypto-neon-green" />
                Торговые сигналы
              </h3>

              <div className="space-y-3">
                <div className="flex items-center p-3 bg-crypto-neon-green/10 rounded-lg border border-crypto-neon-green/20">
                  <Icon
                    name="TrendingUp"
                    className="text-crypto-neon-green mr-2"
                  />
                  <div>
                    <div className="font-semibold text-crypto-neon-green">
                      ПОКУПКА
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Пробой сопротивления
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-crypto-neon-blue/10 rounded-lg border border-crypto-neon-blue/20">
                  <Icon name="Eye" className="text-crypto-neon-blue mr-2" />
                  <div>
                    <div className="font-semibold text-crypto-neon-blue">
                      НАБЛЮДЕНИЕ
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Боковое движение
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartsAnalytics;
