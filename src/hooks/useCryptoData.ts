import { useState, useEffect } from "react";
import axios from "axios";

interface PriceData {
  timestamp: number;
  price: number;
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

export const useCryptoData = (coinId: string, timeframe: string) => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [coinInfo, setCoinInfo] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getDaysFromTimeframe = (tf: string) => {
    switch (tf) {
      case "1h":
        return 1;
      case "1d":
        return 1;
      case "1w":
        return 7;
      case "1m":
        return 30;
      default:
        return 1;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const days = getDaysFromTimeframe(timeframe);

        // Получаем исторические данные цен
        const historyResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days: days,
              interval:
                timeframe === "1h" ? "5m" : timeframe === "1d" ? "1h" : "daily",
            },
          },
        );

        // Получаем текущую информацию о монете
        const coinResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: "usd",
              ids: coinId,
              order: "market_cap_desc",
              per_page: 1,
              page: 1,
            },
          },
        );

        const prices = historyResponse.data.prices.map(
          ([timestamp, price]: [number, number]) => ({
            timestamp,
            price: parseFloat(price.toFixed(2)),
          }),
        );

        setPriceData(prices);
        setCoinInfo(coinResponse.data[0]);
      } catch (err) {
        setError("Ошибка загрузки данных");
        console.error("Error fetching crypto data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Обновляем данные каждые 30 секунд
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, [coinId, timeframe]);

  return { priceData, coinInfo, loading, error };
};
