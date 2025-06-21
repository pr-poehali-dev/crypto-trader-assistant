import Icon from "@/components/ui/icon";

const Advantages = () => {
  const advantages = [
    {
      icon: "BarChart3",
      title: "Профессиональная аналитика",
      description:
        "Глубокий анализ рынка с использованием технических индикаторов, объемов и паттернов цены.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: "Zap",
      title: "Мгновенное исполнение",
      description:
        "Быстрое исполнение ордеров за миллисекунды. Не упустите выгодные возможности рынка.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: "Target",
      title: "Точные прогнозы",
      description:
        "AI-модели обучены на исторических данных для предсказания движений цен с высокой точностью.",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: "Clock",
      title: "Торговля 24/7",
      description:
        "Бот работает круглосуточно, отслеживая рынок и выполняя сделки даже пока вы спите.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: "PieChart",
      title: "Диверсификация портфеля",
      description:
        "Автоматическое распределение средств между различными активами для снижения рисков.",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: "Smartphone",
      title: "Мобильное приложение",
      description:
        "Контролируйте торговлю на ходу с удобным мобильным приложением и push-уведомлениями.",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Преимущества CryptoTrader
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Современные технологии и профессиональные инструменты для успешной
            торговли криптовалютами на любом уровне опыта.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="glass-card p-6 hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-14 h-14 ${advantage.bgColor} rounded-xl flex items-center justify-center mb-6`}
              >
                <Icon
                  name={advantage.icon}
                  className={advantage.color}
                  size={28}
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">{advantage.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
