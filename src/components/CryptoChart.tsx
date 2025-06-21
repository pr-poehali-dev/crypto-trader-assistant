import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCryptoData } from "@/hooks/useCryptoData";
import Icon from "@/components/ui/icon";

interface CryptoChartProps {
  coinId: string;
  symbol: string;
  timeframe: string;
}

const CryptoChart = ({ coinId, symbol, timeframe }: CryptoChartProps) => {
  const { priceData, coinInfo, loading, error } = useCryptoData(
    coinId,
    timeframe,
  );

  const formatXAxis = (timestamp: number) => {
    const date = new Date(timestamp);
    if (timeframe === "1h") {
      return date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (timeframe === "1d") {
      return date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString("ru-RU", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatTooltip = (value: number, name: string, props: any) => {
    const date = new Date(props.payload.timestamp);
    return [
      `$${value.toLocaleString()}`,
      `${symbol} ${date.toLocaleString("ru-RU")}`,
    ];
  };

  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="text-center">
          <Icon
            name="Loader2"
            size={32}
            className="animate-spin text-crypto-neon-blue mx-auto mb-2"
          />
          <p className="text-muted-foreground">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="text-center space-y-3">
          <Icon
            name="WifiOff"
            size={48}
            className="text-crypto-neon-blue/60 mx-auto"
          />
          <div>
            <p className="text-lg font-medium text-foreground mb-1">
              Проблема с подключением
            </p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="border-crypto-neon-blue/30 hover:bg-crypto-neon-blue/10"
          >
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Попробовать снова
          </Button>
        </div>
      </div>
    );
  }

  const isPositive =
    coinInfo?.price_change_percentage_24h &&
    coinInfo.price_change_percentage_24h > 0;

  return (
    <div className="space-y-4">
      {/* Информация о монете */}
      {coinInfo && (
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">{symbol}</h3>
            <p className="text-2xl font-semibold">
              ${coinInfo.current_price.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p
              className={`text-lg font-semibold ${isPositive ? "text-crypto-neon-green" : "text-red-500"}`}
            >
              {isPositive ? "+" : ""}
              {coinInfo.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p className="text-sm text-muted-foreground">24ч</p>
          </div>
        </div>
      )}

      {/* График */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatXAxis}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis
              domain={["dataMin", "dataMax"]}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <Tooltip
              formatter={formatTooltip}
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#F9FAFB",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="url(#colorGradient)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#00d4ff" }}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#00ff88" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoChart;
