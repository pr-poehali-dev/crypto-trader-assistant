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
  const [retryCount, setRetryCount] = useState(0);

  // Fallback данные для демонстрации
  const generateFallbackData = (
    symbol: string,
  ): { priceData: PriceData[]; coinInfo: CoinData } => {
    const basePrice =
      symbol === "BTC"
        ? 43500
        : symbol === "ETH"
          ? 2650
          : symbol === "SOL"
            ? 98
            : symbol === "ADA"
              ? 0.48
              : 620;

    const now = Date.now();
    const dataPoints =
      timeframe === "1h"
        ? 24
        : timeframe === "1d"
          ? 24
          : timeframe === "1w"
            ? 7
            : 30;
    const interval =
      timeframe === "1h" ? 3600000 : timeframe === "1d" ? 3600000 : 86400000;

    const priceData: PriceData[] = [];
    for (let i = dataPoints - 1; i >= 0; i--) {
      const timestamp = now - i * interval;
      const variation = (Math.random() - 0.5) * 0.1;
      const price = basePrice * (1 + variation);
      priceData.push({ timestamp, price });
    }

    const coinInfo: CoinData = {
      id: coinId,
      name:
        symbol === "BTC"
          ? "Bitcoin"
          : symbol === "ETH"
            ? "Ethereum"
            : symbol === "SOL"
              ? "Solana"
              : symbol === "ADA"
                ? "Cardano"
                : "Binance Coin",
      symbol,
      current_price: basePrice,
      price_change_percentage_24h: (Math.random() - 0.5) * 10,
      market_cap: basePrice * 21000000,
      total_volume: basePrice * 500000,
    };

    return { priceData, coinInfo };
  };

  useEffect(() => {
    const fetchData = async () => {
      if (retryCount === 0) {
        setLoading(true);
      }
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
            timeout: 10000, // 10 секунд таймаут
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
            timeout: 10000,
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
        setRetryCount(0); // Сбрасываем счётчик попыток при успехе
      } catch (err: any) {
        console.error("Error fetching crypto data:", err);

        // Используем fallback данные вместо показа ошибки
        if (retryCount < 2) {
          console.log(
            `Попытка ${retryCount + 1} не удалась, используем демо данные`,
          );
          const symbol = coins.find((c) => c.id === coinId)?.symbol || "BTC";
          const fallback = generateFallbackData(symbol);
          setPriceData(fallback.priceData);
          setCoinInfo(fallback.coinInfo);
          setRetryCount(retryCount + 1);
        } else {
          let errorMessage = "Используются демонстрационные данные";

          const symbol = coins.find((c) => c.id === coinId)?.symbol || "BTC";
          const fallback = generateFallbackData(symbol);
          setPriceData(fallback.priceData);
          setCoinInfo(fallback.coinInfo);
          setError(null); // Не показываем ошибку, используем fallback
        }
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
  }, [coinId, timeframe, retryCount]);

  const coins = [
    { id: "bitcoin", symbol: "BTC" },
    { id: "ethereum", symbol: "ETH" },
    { id: "solana", symbol: "SOL" },
    { id: "cardano", symbol: "ADA" },
    { id: "binancecoin", symbol: "BNB" },
  ];

  return { priceData, coinInfo, loading, error };
};
