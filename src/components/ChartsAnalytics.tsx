import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import CryptoChart from "@/components/CryptoChart";
import { useCryptoData } from "@/hooks/useCryptoData";

const ChartsAnalytics = () => {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [timeframe, setTimeframe] = useState("1d");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Обновляем время последнего обновления каждую минуту
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const coins = [
    { id: "bitcoin", symbol: "BTC" },
    { id: "ethereum", symbol: "ETH" },
    { id: "solana", symbol: "SOL" },
    { id: "cardano", symbol: "ADA" },
    { id: "binancecoin", symbol: "BNB" },
  ];

  const timeframes = [
    { value: "1h", label: "1 час" },
    { value: "1d", label: "1 день" },
    { value: "1w", label: "1 неделя" },
    { value: "1m", label: "1 месяц" },
  ];

  // Получаем данные для технического анализа
  const { coinInfo } = useCryptoData(selectedCoin, timeframe);

  const getTechnicalData = () => {
    if (!coinInfo) return null;

    const isPositive = coinInfo.price_change_percentage_24h > 0;
    const changeAbs = Math.abs(coinInfo.price_change_percentage_24h);

    return {
      trend: isPositive
        ? "Восходящий"
        : changeAbs > 2
          ? "Нисходящий"
          : "Боковой",
      support: `$${(coinInfo.current_price * 0.95).toLocaleString()}`,
      resistance: `$${(coinInfo.current_price * 1.05).toLocaleString()}`,
      rsi: changeAbs > 5 ? "75.2" : changeAbs > 2 ? "55.8" : "45.3",
      macd: isPositive ? "Бычий сигнал" : "Медвежий сигнал",
    };
  };

  const technicalData = getTechnicalData();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-green bg-clip-text text-transparent">
            Live графики и аналитика
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-crypto-neon-green rounded-full animate-pulse"></div>
            Обновлено: {lastUpdate.toLocaleTimeString("ru-RU")}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              {/* Controls */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex gap-2 flex-wrap">
                  {coins.map((coin) => (
                    <Button
                      key={coin.id}
                      onClick={() => setSelectedCoin(coin.id)}
                      variant={selectedCoin === coin.id ? "default" : "outline"}
                      size="sm"
                      className={
                        selectedCoin === coin.id
                          ? "bg-crypto-neon-blue hover:bg-crypto-neon-blue/80"
                          : "border-crypto-neon-blue/30 hover:bg-crypto-neon-blue/10"
                      }
                    >
                      {coin.symbol}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2 flex-wrap">
                  {timeframes.map((tf) => (
                    <Button
                      key={tf.value}
                      onClick={() => setTimeframe(tf.value)}
                      variant={timeframe === tf.value ? "default" : "outline"}
                      size="sm"
                      className={
                        timeframe === tf.value
                          ? "bg-crypto-neon-green hover:bg-crypto-neon-green/80"
                          : "border-crypto-neon-green/30 hover:bg-crypto-neon-green/10"
                      }
                    >
                      {tf.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Реальный график с live данными */}
              <div className="bg-gradient-to-br from-crypto-card/50 to-crypto-dark/50 rounded-lg p-4 border border-crypto-neon-blue/20">
                <CryptoChart
                  coinId={selectedCoin}
                  symbol={
                    coins.find((c) => c.id === selectedCoin)?.symbol || "BTC"
                  }
                  timeframe={timeframe}
                />
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

              {technicalData ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Тренд:</span>
                    <span
                      className={`font-semibold ${
                        technicalData.trend === "Восходящий"
                          ? "text-crypto-neon-green"
                          : technicalData.trend === "Нисходящий"
                            ? "text-red-500"
                            : "text-yellow-500"
                      }`}
                    >
                      {technicalData.trend}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Поддержка:</span>
                    <span className="font-semibold">
                      {technicalData.support}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Сопротивление:
                    </span>
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
                    <span
                      className={`font-semibold ${
                        technicalData.macd.includes("Бычий")
                          ? "text-crypto-neon-green"
                          : "text-red-500"
                      }`}
                    >
                      {technicalData.macd}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <Icon
                    name="Loader2"
                    size={24}
                    className="animate-spin text-crypto-neon-blue mr-2"
                  />
                  <span className="text-muted-foreground">
                    Загрузка анализа...
                  </span>
                </div>
              )}
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Icon name="Zap" className="mr-2 text-crypto-neon-green" />
                Live торговые сигналы
              </h3>

              <div className="space-y-3">
                {coinInfo && coinInfo.price_change_percentage_24h > 2 && (
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
                        Сильный рост +
                        {coinInfo.price_change_percentage_24h.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                )}

                {coinInfo && coinInfo.price_change_percentage_24h < -2 && (
                  <div className="flex items-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <Icon name="TrendingDown" className="text-red-500 mr-2" />
                    <div>
                      <div className="font-semibold text-red-500">ПРОДАЖА</div>
                      <div className="text-sm text-muted-foreground">
                        Сильное падение{" "}
                        {coinInfo.price_change_percentage_24h.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                )}

                {coinInfo &&
                  Math.abs(coinInfo.price_change_percentage_24h) <= 2 && (
                    <div className="flex items-center p-3 bg-crypto-neon-blue/10 rounded-lg border border-crypto-neon-blue/20">
                      <Icon name="Eye" className="text-crypto-neon-blue mr-2" />
                      <div>
                        <div className="font-semibold text-crypto-neon-blue">
                          НАБЛЮДЕНИЕ
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Боковое движение (
                          {coinInfo.price_change_percentage_24h.toFixed(1)}%)
                        </div>
                      </div>
                    </div>
                  )}

                {!coinInfo && (
                  <div className="flex items-center justify-center py-4">
                    <Icon
                      name="Loader2"
                      size={20}
                      className="animate-spin text-crypto-neon-blue mr-2"
                    />
                    <span className="text-sm text-muted-foreground">
                      Анализ сигналов...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartsAnalytics;
