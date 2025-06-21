import { useState, useEffect } from "react";
import axios from "axios";

interface PriceData {
  timestamp: number;
  price: number;
}

// Типы для API Coinlore
interface CoinloreTickerResponse {
  data: CoinloreCoin[];
}

interface CoinloreCoin {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  market_cap_usd: string;
  volume24: string;
  volume24_native: string;
  csupply: string;
  price_btc: string;
  tsupply: string;
  msupply: string;
}

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

// Хук для получения списка топ криптовалют
export const useCryptoList = (limit: number = 100) => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<CoinloreTickerResponse>(
          `https://api.coinlore.net/api/tickers/?start=0&limit=${limit}`,
        );

        const formattedCoins: CoinData[] = response.data.data.map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          current_price: parseFloat(coin.price_usd),
          price_change_percentage_24h: parseFloat(
            coin.percent_change_24h || "0",
          ),
          market_cap: parseFloat(coin.market_cap_usd || "0"),
          total_volume: parseFloat(coin.volume24 || "0"),
        }));

        setCoins(formattedCoins);
      } catch (err) {
        setError("Не удалось загрузить данные криптовалют");
        console.error("Error fetching crypto list:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();

    // Обновляем данные каждые 60 секунд
    const interval = setInterval(fetchCoins, 60000);
    return () => clearInterval(interval);
  }, [limit]);

  return { coins, loading, error };
};

// Хук для получения конкретной криптовалюты
export const useCryptoData = (coinId: string, timeframe: string) => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [coinInfo, setCoinInfo] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Получаем данные конкретной монеты
        const response = await axios.get(
          `https://api.coinlore.net/api/ticker/?id=${coinId}`,
        );

        if (!response.data || response.data.length === 0) {
          throw new Error("Криптовалюта не найдена");
        }

        const coin = response.data[0];

        const coinData: CoinData = {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          current_price: parseFloat(coin.price_usd),
          price_change_percentage_24h: parseFloat(
            coin.percent_change_24h || "0",
          ),
          market_cap: parseFloat(coin.market_cap_usd || "0"),
          total_volume: parseFloat(coin.volume24 || "0"),
        };

        setCoinInfo(coinData);

        // Генерируем mock данные для графика (так как Coinlore не предоставляет исторические данные)
        const generateMockPriceData = (
          currentPrice: number,
          timeframe: string,
        ) => {
          const now = Date.now();
          const points =
            timeframe === "1h"
              ? 12
              : timeframe === "1d"
                ? 24
                : timeframe === "1w"
                  ? 7
                  : 30;
          const interval =
            timeframe === "1h"
              ? 5 * 60 * 1000
              : timeframe === "1d"
                ? 60 * 60 * 1000
                : 24 * 60 * 60 * 1000;

          return Array.from({ length: points }, (_, i) => {
            const variance = (Math.random() - 0.5) * 0.1; // ±5% вариация
            const price = currentPrice * (1 + variance);
            return {
              timestamp: now - (points - 1 - i) * interval,
              price: parseFloat(price.toFixed(2)),
            };
          });
        };

        const mockPriceData = generateMockPriceData(
          coinData.current_price,
          timeframe,
        );
        setPriceData(mockPriceData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Ошибка при загрузке данных криптовалюты",
        );
        console.error("Error fetching crypto data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (coinId) {
      fetchData();

      // Обновляем данные каждые 30 секунд
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [coinId, timeframe]);

  return { priceData, coinInfo, loading, error };
};
