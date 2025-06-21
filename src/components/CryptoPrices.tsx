import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const CryptoPrices = () => {
  const [showMore, setShowMore] = useState(false);

  // Mock data - в реальном проекте здесь будет API
  const mainCoins = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: "$42,350",
      change: "+2.45%",
      isUp: true,
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: "$2,580",
      change: "+1.82%",
      isUp: true,
    },
    {
      symbol: "USDT",
      name: "Tether",
      price: "$1.00",
      change: "+0.01%",
      isUp: true,
    },
    {
      symbol: "BNB",
      name: "BNB",
      price: "$315",
      change: "-0.85%",
      isUp: false,
    },
    {
      symbol: "SOL",
      name: "Solana",
      price: "$98.50",
      change: "+5.23%",
      isUp: true,
    },
  ];

  const additionalCoins = [
    {
      symbol: "ADA",
      name: "Cardano",
      price: "$0.52",
      change: "+3.12%",
      isUp: true,
    },
    {
      symbol: "AVAX",
      name: "Avalanche",
      price: "$36.80",
      change: "+1.95%",
      isUp: true,
    },
    {
      symbol: "DOT",
      name: "Polkadot",
      price: "$7.45",
      change: "-2.18%",
      isUp: false,
    },
    {
      symbol: "MATIC",
      name: "Polygon",
      price: "$0.89",
      change: "+4.67%",
      isUp: true,
    },
    {
      symbol: "LINK",
      name: "Chainlink",
      price: "$14.20",
      change: "+2.88%",
      isUp: true,
    },
  ];

  return (
    <section id="crypto-prices" className="py-20">
      <div className="container mx-auto px-4">
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-green bg-clip-text text-transparent">
              Курсы криптовалют
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-crypto-neon-green rounded-full animate-pulse"></div>
              Обновление в реальном времени
            </div>
          </div>

          {/* Main Coins */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {mainCoins.map((coin) => (
              <div
                key={coin.symbol}
                className="glass-card p-4 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">{coin.symbol}</span>
                  <Icon
                    name={coin.isUp ? "TrendingUp" : "TrendingDown"}
                    className={
                      coin.isUp ? "text-crypto-neon-green" : "text-destructive"
                    }
                  />
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  {coin.name}
                </div>
                <div className="font-semibold text-lg">{coin.price}</div>
                <div
                  className={`text-sm font-medium ${coin.isUp ? "text-crypto-neon-green" : "text-destructive"}`}
                >
                  {coin.change}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Coins (Show More) */}
          {showMore && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 animate-fade-in">
              {additionalCoins.map((coin) => (
                <div
                  key={coin.symbol}
                  className="glass-card p-4 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">{coin.symbol}</span>
                    <Icon
                      name={coin.isUp ? "TrendingUp" : "TrendingDown"}
                      className={
                        coin.isUp
                          ? "text-crypto-neon-green"
                          : "text-destructive"
                      }
                    />
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {coin.name}
                  </div>
                  <div className="font-semibold text-lg">{coin.price}</div>
                  <div
                    className={`text-sm font-medium ${coin.isUp ? "text-crypto-neon-green" : "text-destructive"}`}
                  >
                    {coin.change}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show More Button */}
          <div className="text-center">
            <Button
              onClick={() => setShowMore(!showMore)}
              variant="outline"
              className="border-crypto-neon-blue text-crypto-neon-blue hover:bg-crypto-neon-blue/10"
            >
              <Icon
                name={showMore ? "ChevronUp" : "ChevronDown"}
                className="mr-2"
              />
              {showMore ? "Показать меньше" : "Показать больше"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoPrices;
