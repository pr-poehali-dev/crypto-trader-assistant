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

// Маппинг для CoinGecko API
const COIN_MAPPING: Record<string, string> = {
  bitcoin: "bitcoin",
  ethereum: "ethereum",
  solana: "solana",
  cardano: "cardano",
  binancecoin: "binancecoin",
};

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
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`,
          {
            headers: {
              Accept: "application/json",
            },
          },
        );

        const formattedCoins: CoinData[] = response.data.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h || 0,
          market_cap: coin.market_cap || 0,
          total_volume: coin.total_volume || 0,
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

    // Обновляем данные каждые 30 секунд
    const interval = setInterval(fetchCoins, 30000);
    return () => clearInterval(interval);
  }, [limit]);

  return { coins, loading, error };
};

// Хук для получения исторических данных и live цены
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
        const geckoId = COIN_MAPPING[coinId] || coinId;

        // Получаем актуальную цену и основную информацию
        const currentDataResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${geckoId}&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=24h`,
          {
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (
          !currentDataResponse.data ||
          currentDataResponse.data.length === 0
        ) {
          throw new Error("Криптовалюта не найдена");
        }

        const coin = currentDataResponse.data[0];

        const coinData: CoinData = {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h || 0,
          market_cap: coin.market_cap || 0,
          total_volume: coin.total_volume || 0,
        };

        setCoinInfo(coinData);

        // Получаем исторические данные для графика
        const days =
          timeframe === "1h"
            ? 1
            : timeframe === "1d"
              ? 1
              : timeframe === "1w"
                ? 7
                : 30;

        const historicalResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${geckoId}/market_chart?vs_currency=usd&days=${days}&interval=${timeframe === "1h" ? "hourly" : "daily"}`,
          {
            headers: {
              Accept: "application/json",
            },
          },
        );

        let chartData = historicalResponse.data.prices || [];

        // Фильтруем данные в зависимости от временного интервала
        if (timeframe === "1h") {
          // Берем последние 24 точки (последние 24 часа)
          chartData = chartData.slice(-24);
        } else if (timeframe === "1d") {
          // Берем последние 24 точки (последние 24 часа по часам)
          chartData = chartData.slice(-24);
        }

        const formattedPriceData: PriceData[] = chartData.map(
          ([timestamp, price]: [number, number]) => ({
            timestamp,
            price: parseFloat(price.toFixed(6)),
          }),
        );

        setPriceData(formattedPriceData);
      } catch (err: any) {
        let errorMessage = "Ошибка при загрузке данных криптовалюты";

        if (err.response?.status === 429) {
          errorMessage = "Превышен лимит запросов. Попробуйте позже";
        } else if (err.response?.status === 404) {
          errorMessage = "Криптовалюта не найдена";
        } else if (err.message) {
          errorMessage = err.message;
        }

        setError(errorMessage);
        console.error("Error fetching crypto data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (coinId) {
      fetchData();

      // Обновляем данные каждые 60 секунд для live обновлений
      const interval = setInterval(fetchData, 60000);
      return () => clearInterval(interval);
    }
  }, [coinId, timeframe]);

  return { priceData, coinInfo, loading, error };
};
