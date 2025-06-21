import Icon from "@/components/ui/icon";

const Advantages = () => {
  const advantages = [
    {
      icon: "Code",
      title: "Без программирования",
      description:
        "Создавайте сайты без знания HTML, CSS или JavaScript. Просто опишите что хотите получить.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: "Rocket",
      title: "Быстрый старт",
      description:
        "От идеи до готового сайта за минуты. Никаких долгих настроек и установок программ.",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: "Palette",
      title: "Современный дизайн",
      description:
        "Получайте красивые сайты с актуальным дизайном, анимациями и адаптивной версткой.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: "Github",
      title: "Интеграция с GitHub",
      description:
        "Автоматическая синхронизация с репозиторием. Получите полный доступ к коду проекта.",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: "Wrench",
      title: "Исправление ошибок",
      description:
        "Юра автоматически анализирует и исправляет баги в коде. Ваш сайт всегда работает стабильно.",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      icon: "Users",
      title: "Поддержка сообщества",
      description:
        "Активное комьюнити разработчиков готово помочь с любыми вопросами и идеями.",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
            Наши преимущества
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Поехали! объединяет лучшие инструменты и подходы для создания сайтов
            в единой платформе, доступной каждому.
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
