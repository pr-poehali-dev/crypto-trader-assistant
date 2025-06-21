import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useCryptoList } from "@/hooks/useCryptoData";

const CryptoPrices = () => {
  const [showMore, setShowMore] = useState(false);
  const { coins, loading, error } = useCryptoList(10);

  // Основные монеты для отображения
  const mainCoinIds = [
    "bitcoin",
    "ethereum",
    "binancecoin",
    "solana",
    "cardano",
  ];
  const mainCoins = coins.filter((coin) => mainCoinIds.includes(coin.id));
  const additionalCoins = coins.filter(
    (coin) => !mainCoinIds.includes(coin.id),
  );

  if (loading) {
    return (
      <section id="crypto-prices" className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8">
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <Icon
                  name="Loader2"
                  size={32}
                  className="animate-spin text-crypto-neon-blue mx-auto mb-2"
                />
                <p className="text-muted-foreground">Загрузка курсов...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
              Данные Bybit API
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-center">
                <Icon
                  name="AlertTriangle"
                  className="text-yellow-500 mr-2"
                  size={16}
                />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

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
                    name={
                      coin.price_change_percentage_24h >= 0
                        ? "TrendingUp"
                        : "TrendingDown"
                    }
                    className={
                      coin.price_change_percentage_24h >= 0
                        ? "text-crypto-neon-green"
                        : "text-destructive"
                    }
                  />
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  {coin.name}
                </div>
                <div className="font-semibold text-lg">
                  ${coin.current_price.toLocaleString()}
                </div>
                <div
                  className={`text-sm font-medium ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-crypto-neon-green"
                      : "text-destructive"
                  }`}
                >
                  {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>

          {/* Additional Coins (Show More) */}
          {showMore && additionalCoins.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 animate-fade-in">
              {additionalCoins.map((coin) => (
                <div
                  key={coin.symbol}
                  className="glass-card p-4 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">{coin.symbol}</span>
                    <Icon
                      name={
                        coin.price_change_percentage_24h >= 0
                          ? "TrendingUp"
                          : "TrendingDown"
                      }
                      className={
                        coin.price_change_percentage_24h >= 0
                          ? "text-crypto-neon-green"
                          : "text-destructive"
                      }
                    />
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {coin.name}
                  </div>
                  <div className="font-semibold text-lg">
                    ${coin.current_price.toLocaleString()}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-crypto-neon-green"
                        : "text-destructive"
                    }`}
                  >
                    {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show More Button */}
          {additionalCoins.length > 0 && (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default CryptoPrices;
