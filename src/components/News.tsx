import Icon from "@/components/ui/icon";

const News = () => {
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

  const events = [
    {
      title: "Bitcoin Halving",
      date: "2024-04-20",
      type: "halving",
      description: "Сокращение награды майнеров вдвое",
    },
    {
      title: "Ethereum Conference",
      date: "2024-07-15",
      type: "conference",
      description: "Крупнейшая конференция разработчиков Ethereum",
    },
    {
      title: "SOL Token Unlock",
      date: "2024-03-10",
      type: "unlock",
      description: "Разблокировка 50M токенов SOL",
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
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Icon name="Calendar" className="mr-2 text-crypto-neon-green" />
              Календарь событий
            </h3>

            <div className="space-y-4">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-crypto-neon-green/10 rounded-lg">
                      <Icon
                        name={getEventIcon(event.type)}
                        className="text-crypto-neon-green"
                        size={20}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{event.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Icon
                          name="Clock"
                          size={14}
                          className="text-muted-foreground"
                        />
                        <span className="text-xs text-muted-foreground">
                          {event.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="text-crypto-neon-green hover:text-crypto-neon-green/80 text-sm font-medium">
                Полный календарь →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
