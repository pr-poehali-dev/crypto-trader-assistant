import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const TradingTools = () => {
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("USD");

  const exchanges = [
    {
      name: "Binance",
      rating: 9.5,
      volume: "$15.2B",
      fees: "0.1%",
      status: "online",
    },
    {
      name: "Coinbase",
      rating: 8.9,
      volume: "$3.8B",
      fees: "0.25%",
      status: "online",
    },
    {
      name: "Kraken",
      rating: 8.7,
      volume: "$1.2B",
      fees: "0.16%",
      status: "online",
    },
    {
      name: "KuCoin",
      rating: 8.5,
      volume: "$2.1B",
      fees: "0.1%",
      status: "maintenance",
    },
  ];

  const calculatePnL = () => {
    const buy = parseFloat(buyPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const qty = parseFloat(amount) || 0;

    if (buy && sell && qty) {
      const profit = (sell - buy) * qty;
      const percentage = ((sell - buy) / buy) * 100;
      return { profit, percentage };
    }
    return { profit: 0, percentage: 0 };
  };

  const { profit, percentage } = calculatePnL();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-green bg-clip-text text-transparent">
          Торговые инструменты
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* P&L Calculator */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Icon name="Calculator" className="mr-2 text-crypto-neon-blue" />
              Калькулятор P&L
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">
                  Цена покупки
                </label>
                <Input
                  type="number"
                  placeholder="42000"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">
                  Цена продажи
                </label>
                <Input
                  type="number"
                  placeholder="45000"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">
                  Количество
                </label>
                <Input
                  type="number"
                  placeholder="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1"
                />
              </div>

              {(profit !== 0 || percentage !== 0) && (
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">
                      Прибыль/Убыток:
                    </span>
                    <span
                      className={`font-semibold ${profit >= 0 ? "text-crypto-neon-green" : "text-destructive"}`}
                    >
                      ${profit.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Процент:</span>
                    <span
                      className={`font-semibold ${percentage >= 0 ? "text-crypto-neon-green" : "text-destructive"}`}
                    >
                      {percentage.toFixed(2)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Currency Converter */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Icon
                name="ArrowLeftRight"
                className="mr-2 text-crypto-neon-green"
              />
              Конвертер валют
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">
                  Количество
                </label>
                <Input
                  type="number"
                  placeholder="1"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground">Из</label>
                  <select
                    className="w-full mt-1 p-2 bg-white/5 border border-white/10 rounded-md"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                  >
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="SOL">SOL</option>
                  </select>
                </div>

                <div className="flex items-end pb-2">
                  <Button variant="outline" size="sm">
                    <Icon name="ArrowLeftRight" />
                  </Button>
                </div>

                <div className="flex-1">
                  <label className="text-sm text-muted-foreground">В</label>
                  <select
                    className="w-full mt-1 p-2 bg-white/5 border border-white/10 rounded-md"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="RUB">RUB</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-crypto-neon-blue">
                    {fromAmount
                      ? (parseFloat(fromAmount) * 42000).toLocaleString()
                      : "0"}{" "}
                    {toCurrency}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    По текущему курсу
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exchange Ratings */}
          <div className="glass-card p-6 lg:col-span-2 xl:col-span-1">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Icon name="Building2" className="mr-2 text-crypto-purple" />
              Рейтинг бирж
            </h3>

            <div className="space-y-3">
              {exchanges.map((exchange, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{exchange.name}</span>
                      <div
                        className={`w-2 h-2 rounded-full ${exchange.status === "online" ? "bg-crypto-neon-green" : "bg-orange-500"}`}
                      ></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon
                        name="Star"
                        size={14}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span className="text-sm font-medium">
                        {exchange.rating}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>Объем: {exchange.volume}</div>
                    <div>Комиссия: {exchange.fees}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Button
                variant="outline"
                size="sm"
                className="text-crypto-purple border-crypto-purple"
              >
                Все биржи
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 glass-card p-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Icon name="HelpCircle" className="mr-2 text-crypto-neon-blue" />
            FAQ для новичков
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-crypto-neon-green">
                Что такое криптовалюта?
              </h4>
              <p className="text-sm text-muted-foreground">
                Цифровая валюта, основанная на криптографии и блокчейн
                технологии.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-crypto-neon-green">
                Как начать торговать?
              </h4>
              <p className="text-sm text-muted-foreground">
                Зарегистрируйтесь на бирже, пройдите верификацию и внесите
                депозит.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-crypto-neon-green">
                Что такое волатильность?
              </h4>
              <p className="text-sm text-muted-foreground">
                Мера изменчивости цены актива за определенный период времени.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-crypto-neon-green">
                Как управлять рисками?
              </h4>
              <p className="text-sm text-muted-foreground">
                Используйте стоп-лоссы, диверсифицируйте портфель и не
                инвестируйте больше, чем можете потерять.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingTools;
