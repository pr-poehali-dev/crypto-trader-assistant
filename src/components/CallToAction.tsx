import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Готовы создать свой сайт?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам пользователей, которые уже создают
            потрясающие сайты с помощью Поехали!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 animate-pulse-neon"
            >
              <Icon name="Rocket" className="mr-2" />
              Начать бесплатно
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-4"
            >
              <Icon name="Play" className="mr-2" />
              Посмотреть демо
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Icon name="Check" className="text-green-500 mr-2" size={16} />
              Бесплатный старт
            </div>
            <div className="flex items-center">
              <Icon name="Check" className="text-green-500 mr-2" size={16} />
              Без кредитной карты
            </div>
            <div className="flex items-center">
              <Icon name="Check" className="text-green-500 mr-2" size={16} />
              Поддержка 24/7
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
