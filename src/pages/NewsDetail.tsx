import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useEffect, useState } from "react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  time: string;
  source: string;
  category: string;
  author?: string;
  image?: string;
}

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Симуляция загрузки новости
    const fetchNews = async () => {
      setLoading(true);

      // Моковые данные новостей
      const newsData: { [key: string]: NewsItem } = {
        "bitcoin-maximum": {
          id: "bitcoin-maximum",
          title: "Bitcoin достиг нового максимума за год",
          summary:
            "Цена BTC превысила отметку в $45,000 на фоне институционального интереса",
          content: `
            <p>Цена Bitcoin сегодня достигла нового годового максимума, превысив отметку в $45,000. Это стало результатом растущего институционального интереса к криптовалютам и улучшения общих рыночных настроений.</p>
            
            <p>Аналитики отмечают, что основными драйверами роста стали:</p>
            <ul>
              <li>Одобрение новых ETF на Bitcoin</li>
              <li>Крупные покупки от институциональных инвесторов</li>
              <li>Снижение инфляционных ожиданий</li>
              <li>Улучшение технических показателей</li>
            </ul>
            
            <p>Эксперты прогнозируют дальнейший рост цены Bitcoin в случае продолжения текущих тенденций. Однако они также предупреждают о возможной волатильности и необходимости осторожного подхода к инвестициям.</p>
            
            <p>Торговый объем Bitcoin за последние 24 часа увеличился на 35%, что свидетельствует о высокой активности участников рынка.</p>
          `,
          time: "2 часа назад",
          source: "CoinDesk",
          category: "market",
          author: "Иван Петров",
          image:
            "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=400&fit=crop",
        },
        "ethereum-update": {
          id: "ethereum-update",
          title: "Ethereum готовится к следующему обновлению",
          summary: "Разработчики анонсировали дату выхода нового апдейта сети",
          content: `
            <p>Команда разработчиков Ethereum официально анонсировала дату выхода следующего крупного обновления сети, которое должно значительно улучшить производительность и снизить комиссии.</p>
            
            <p>Ключевые изменения включают:</p>
            <ul>
              <li>Оптимизация алгоритма консенсуса</li>
              <li>Улучшение масштабируемости</li>
              <li>Снижение энергопотребления на 15%</li>
              <li>Новые возможности для разработчиков</li>
            </ul>
            
            <p>Обновление планируется внедрить поэтапно, начиная с тестовых сетей. Полный переход на новую версию ожидается в течение следующих 3 месяцев.</p>
            
            <p>Цена ETH отреагировала позитивно на новость, показав рост на 8% за последние сутки.</p>
          `,
          time: "4 часа назад",
          source: "CoinTelegraph",
          category: "tech",
          author: "Анна Смирнова",
          image:
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
        },
        "defi-funding": {
          id: "defi-funding",
          title: "Новый DeFi протокол привлек $100M",
          summary:
            "Стартап в области децентрализованных финансов завершил раунд инвестиций",
          content: `
            <p>Инновационный протокол децентрализованных финансов успешно завершил раунд серии A, привлекув $100 миллионов от ведущих венчурных фондов и криптоинвесторов.</p>
            
            <p>Особенности протокола:</p>
            <ul>
              <li>Автоматизированное управление ликвидностью</li>
              <li>Кроссчейн функциональность</li>
              <li>Минимальные комиссии</li>
              <li>Продвинутые алгоритмы безопасности</li>
            </ul>
            
            <p>Средства будут направлены на развитие продукта, расширение команды и маркетинговые активности. Планируется запуск основной сети в первом квартале следующего года.</p>
            
            <p>Инвесторы отмечают потенциал проекта революционизировать рынок DeFi и привлечь новых пользователей в экосистему.</p>
          `,
          time: "6 часов назад",
          source: "The Block",
          category: "defi",
          author: "Максим Волков",
          image:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
        },
      };

      // Симуляция задержки загрузки
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (id && newsData[id]) {
        setNews(newsData[id]);
      }

      setLoading(false);
    };

    fetchNews();
  }, [id]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crypto-neon-green"></div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon
            name="AlertCircle"
            size={48}
            className="mx-auto mb-4 text-red-400"
          />
          <h1 className="text-2xl font-bold mb-2">Новость не найдена</h1>
          <p className="text-muted-foreground mb-4">
            Запрашиваемая новость не существует
          </p>
          <Button onClick={() => navigate("/dashboard")}>
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card border-b border-crypto-neon-blue/20 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="hover:bg-crypto-neon-blue/10"
          >
            <Icon name="ArrowLeft" className="mr-2" size={18} />
            Назад к новостям
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-crypto-neon-green rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-8">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Icon
              name={getCategoryIcon(news.category)}
              className="text-crypto-neon-blue"
              size={20}
            />
            <span className="text-sm text-crypto-neon-blue font-medium capitalize">
              {news.category}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{news.time}</span>
          </div>

          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-green bg-clip-text text-transparent">
            {news.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6">{news.summary}</p>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Icon name="User" size={16} />
                <span>{news.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Globe" size={16} />
                <span>{news.source}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Image */}
        {news.image && (
          <div className="mb-8">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-64 object-cover rounded-lg border border-white/10"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="glass-card p-8">
          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>

        {/* Share and Actions */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Icon name="Share2" className="mr-2" size={16} />
              Поделиться
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="BookmarkPlus" className="mr-2" size={16} />
              Сохранить
            </Button>
          </div>

          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-green hover:opacity-80"
          >
            Больше новостей
          </Button>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;
