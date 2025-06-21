import Icon from "@/components/ui/icon";
import { useCryptoEvents } from "@/hooks/useCryptoEvents";
import { useEffect } from "react";

interface CryptoEvent {
  id: string;
  title: string;
  description: string;
  coin?: string;
  time?: string;
  source?: string;
  type: string;
  importance: "high" | "medium" | "low";
}

const News = () => {
  const { events, loading, error, lastUpdate, refresh } = useCryptoEvents();

  useEffect(() => {
    refresh();

    // Автоматическое обновление каждые 5 минут
    const interval = setInterval(refresh, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refresh]);

  const news = [
    {
      title: "Bitcoin достиг нового максимума за год",
      summary:
        "Цена BTC превысила отметку в $45,000 на фоне институционального интереса",
      time: "2 часа назад",
      source: "CoinDesk",
      category: "market",
    },
    {
      title: "Ethereum готовится к следующему обновлению",
      summary: "Разработчики анонсировали дату выхода нового апдейта сети",
      time: "4 часа назад",
      source: "CoinTelegraph",
      category: "tech",
    },
    {
      title: "Новый DeFi протокол привлек $100M",
      summary:
        "Стартап в области децентрализованных финансов завершил раунд инвестиций",
      time: "6 часов назад",
      source: "The Block",
      category: "defi",
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "market":
        return "TrendingUp";
      case "tech":
        return "Code";
      case "defi":
        return "Coins";
      default:
        return "News";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "halving":
        return "Scissors";
      case "conference":
        return "Users";
      case "unlock":
        return "Unlock";
      case "upgrade":
        return "Zap";
      default:
        return "Calendar";
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-green bg-clip-text text-transparent">
          Новости и события
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* News Feed */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center">
                <Icon name="Newspaper" className="mr-2 text-crypto-neon-blue" />
                Свежие новости
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-crypto-neon-green rounded-full animate-pulse"></div>
                Live
              </div>
            </div>

            <div className="space-y-4">
              {news.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      name={getCategoryIcon(item.category)}
                      className="text-crypto-neon-blue mt-1"
                      size={20}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 hover:text-crypto-neon-blue cursor-pointer">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{item.source}</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="text-crypto-neon-blue hover:text-crypto-neon-blue/80 text-sm font-medium">
                Показать больше новостей →
              </button>
            </div>
          </div>

          {/* Events Calendar */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center">
                <Icon name="Calendar" className="mr-2 text-crypto-neon-green" />
                События сегодня
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-crypto-neon-green rounded-full animate-pulse"></div>
                  Live
                </div>
                {lastUpdate && (
                  <span className="text-xs text-muted-foreground">
                    {lastUpdate.toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crypto-neon-green"></div>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon
                  name="Calendar"
                  size={32}
                  className="mx-auto mb-2 opacity-50"
                />
                <p>Сегодня событий не запланировано</p>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${
                      event.importance === "high"
                        ? "bg-crypto-neon-green/5 border-crypto-neon-green/20 hover:bg-crypto-neon-green/10"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          event.importance === "high"
                            ? "bg-crypto-neon-green/20"
                            : "bg-crypto-neon-green/10"
                        }`}
                      >
                        <Icon
                          name={getEventIcon(event.type)}
                          className="text-crypto-neon-green"
                          size={20}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{event.title}</h4>
                          {event.coin && (
                            <span className="px-2 py-1 bg-crypto-neon-blue/20 text-crypto-neon-blue text-xs rounded-full">
                              {event.coin}
                            </span>
                          )}
                          {event.importance === "high" && (
                            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                              Важно
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {event.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            {event.time && (
                              <div className="flex items-center gap-1">
                                <Icon name="Clock" size={12} />
                                <span>{event.time}</span>
                              </div>
                            )}
                            {event.source && (
                              <div className="flex items-center gap-1">
                                <Icon name="Globe" size={12} />
                                <span>{event.source}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={refresh}
                className="text-crypto-neon-green hover:text-crypto-neon-green/80 text-sm font-medium flex items-center gap-2 mx-auto"
              >
                <Icon name="RefreshCw" size={16} />
                Обновить события
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
