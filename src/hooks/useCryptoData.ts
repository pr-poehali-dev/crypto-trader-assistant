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

// Маппинг символов для Bybit API
const BYBIT_SYMBOLS: Record<string, string> = {
  bitcoin: "BTCUSDT",
  ethereum: "ETHUSDT",
  solana: "SOLUSDT",
  cardano: "ADAUSDT",
  binancecoin: "BNBUSDT",
};

const COIN_NAMES: Record<string, string> = {
  bitcoin: "Bitcoin",
  ethereum: "Ethereum",
  solana: "Solana",
  cardano: "Cardano",
  binancecoin: "Binance Coin",
};

// Хук для получения списка топ криптовалют через Bybit
export const useCryptoList = (limit: number = 100) => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);

      try {
        // Получаем тикеры для основных криптовалют
        const symbols = Object.values(BYBIT_SYMBOLS);
        const response = await axios.get(
          `https://api.bybit.com/v5/market/tickers?category=spot&symbol=${symbols.join(",")}`,
        );

        if (response.data.retCode !== 0) {
          throw new Error("Ошибка API Bybit");
        }

        const formattedCoins: CoinData[] = response.data.result.list.map(
          (ticker: any) => {
            const coinId =
              Object.keys(BYBIT_SYMBOLS).find(
                (key) => BYBIT_SYMBOLS[key] === ticker.symbol,
              ) || "unknown";

            const symbol = ticker.symbol.replace("USDT", "");

            return {
              id: coinId,
              name: COIN_NAMES[coinId] || symbol,
              symbol: symbol,
              current_price: parseFloat(ticker.lastPrice),
              price_change_percentage_24h:
                parseFloat(ticker.price24hPcnt) * 100,
              market_cap:
                parseFloat(ticker.lastPrice) *
                parseFloat(ticker.volume24h || "0"),
              total_volume: parseFloat(ticker.volume24h || "0"),
            };
          },
        );

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

// Хук для получения исторических данных и live цены через Bybit
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
        const symbol = BYBIT_SYMBOLS[coinId];
        if (!symbol) {
          throw new Error("Неподдерживаемая криптовалюта");
        }

        // Получаем текущие данные тикера
        const tickerResponse = await axios.get(
          `https://api.bybit.com/v5/market/tickers?category=spot&symbol=${symbol}`,
        );

        if (
          tickerResponse.data.retCode !== 0 ||
          !tickerResponse.data.result.list[0]
        ) {
          throw new Error("Ошибка получения данных тикера");
        }

        const ticker = tickerResponse.data.result.list[0];

        const coinData: CoinData = {
          id: coinId,
          name: COIN_NAMES[coinId] || symbol.replace("USDT", ""),
          symbol: symbol.replace("USDT", ""),
          current_price: parseFloat(ticker.lastPrice),
          price_change_percentage_24h: parseFloat(ticker.price24hPcnt) * 100,
          market_cap:
            parseFloat(ticker.lastPrice) * parseFloat(ticker.volume24h || "0"),
          total_volume: parseFloat(ticker.volume24h || "0"),
        };

        setCoinInfo(coinData);

        // Получаем исторические данные для графика
        const intervals: Record<string, string> = {
          "1h": "1", // 1 минута для часового графика
          "1d": "60", // 1 час для дневного графика
          "1w": "D", // 1 день для недельного графика
          "1m": "D", // 1 день для месячного графика
        };

        const interval = intervals[timeframe] || "60";
        const limit =
          timeframe === "1h"
            ? 60
            : timeframe === "1d"
              ? 24
              : timeframe === "1w"
                ? 7
                : 30;

        const klineResponse = await axios.get(
          `https://api.bybit.com/v5/market/kline?category=spot&symbol=${symbol}&interval=${interval}&limit=${limit}`,
        );

        if (klineResponse.data.retCode !== 0) {
          throw new Error("Ошибка получения исторических данных");
        }

        const klines = klineResponse.data.result.list || [];

        const formattedPriceData: PriceData[] = klines
          .reverse()
          .map((kline: string[]) => ({
            timestamp: parseInt(kline[0]),
            price: parseFloat(kline[4]), // Цена закрытия
          }));

        setPriceData(formattedPriceData);
      } catch (err: any) {
        console.error("Error fetching Bybit data:", err);

        // Fallback данные при ошибке
        const symbol = BYBIT_SYMBOLS[coinId]?.replace("USDT", "") || "BTC";
        const fallback = generateFallbackData(symbol);
        setPriceData(fallback.priceData);
        setCoinInfo(fallback.coinInfo);
        setError("Используются демонстрационные данные");
      } finally {
        setLoading(false);
      }
    };

    if (coinId) {
      fetchData();

      // Обновляем данные каждые 30 секунд для live обновлений
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [coinId, timeframe]);

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
      name: COIN_NAMES[coinId] || symbol,
      symbol,
      current_price: basePrice,
      price_change_percentage_24h: (Math.random() - 0.5) * 10,
      market_cap: basePrice * 21000000,
      total_volume: basePrice * 500000,
    };

    return { priceData, coinInfo };
  };

  return { priceData, coinInfo, loading, error };
};
