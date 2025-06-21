import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const ServiceDescription = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Что такое Поехали!
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Платформа на базе искусственного интеллекта для создания и
            публикации веб-сайтов прямо в браузере. Создавайте сайты через
            простое описание на русском языке — без программирования.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Icon name="MessageSquare" className="text-blue-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Разработка через язык
            </h3>
            <p className="text-muted-foreground">
              Опишите свой сайт на русском языке — Юра создаст его
              автоматически. Никаких технических знаний не требуется.
            </p>
          </div>

          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Zap" className="text-green-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">В 30 раз быстрее</h3>
            <p className="text-muted-foreground">
              Создание сайта занимает минуты, а не недели. Быстрее любых
              конструкторов и традиционного программирования.
            </p>
          </div>

          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Globe" className="text-purple-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Мгновенная публикация
            </h3>
            <p className="text-muted-foreground">
              Опубликуйте свой сайт в интернете за несколько кликов. Получите
              готовую ссылку и делитесь результатом.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDescription;
