
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Contact = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-green bg-clip-text text-transparent">
          Контакты и поддержка
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Icon name="MessageSquare" className="mr-2 text-crypto-neon-blue" />
              Обратная связь
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Имя</label>
                <Input placeholder="Ваше имя" className="mt-1" />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <Input type="email" placeholder="your@email.com" className="mt-1" />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground">Тема</label>
                <select className="w-full mt-1 p-2 bg-white/5 border border-white/10 rounded-md">
                  <option value="">Выберите тему</option>
                  <option value="support">Техническая поддержка</option>
                  <option value="feature">Предложение функции</option>
                  <option value="bug">Сообщить об ошибке</option>
                  <option value="partnership">Партнерство</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground">Сообщение</label>
                <textarea 
                  className="w-full mt-1 p-2 bg-white/5 border border-white/10 rounded-md min-h-[120px] resize-none"
                  placeholder="Расскажите нам подробнее..."
                />
              </div>
              
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Icon name="Send" className="mr-2" />
                Отправить сообщение
              </Button>
            </form>
          </div>

          {/* Support Channels */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Icon name="Users" className="mr-2 text-crypto-neon-green" />
                Присоединяйтесь к сообществу
              </h3>
              
              <div className="space-y-4">
                <a 
                  href="#" 
                  className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="p-2 bg-blue-500/10 rounded-lg mr-4">
                    <Icon name="MessageCircle" className="text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold group-hover:text-crypto-neon-blue">Telegram</div>
                    <div className="text-sm text-muted-foreground">Общайтесь с трейдерами в реальном времени</div>
                  </div>
                  <Icon name="ExternalLink" className="ml-auto text-muted-foreground" />
                </a>
                
                <a 
                  href="#" 
                  className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="p-2 bg-indigo-500/10 rounded-lg mr-4">
                    <Icon name="MessageSquare" className="text-indigo-400" />
                  </div>
                  <div>
                    <div className="font-semibold group-hover:text-crypto-neon-blue">Discord</div>
                    <div className="text-sm text-muted-foreground">Голосовые чаты и обсуждения</div>
                  </div>
                  <Icon name="ExternalLink" className="ml-auto text-muted-foreground" />
                </a>
                
                <a 
                  href="#" 
                  className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="p-2 bg-cyan-500/10 rounded-lg mr-4">
                    <Icon name="Twitter" className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold group-hover:text-crypto-neon-blue">Twitter</div>
                    <div className="text-sm text-muted-foreground">Последние новости и анонсы</div>
                  </div>
                  <Icon name="ExternalLink" className="ml-auto text-muted-foreground" />
                </a>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Icon name="Clock" className="mr-2 text-crypto-purple" />
                Время работы поддержки
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Понедельник - Пятница:</span>
                  <span>9:00 - 18:00 (UTC+3)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Суббота - Воскресенье:</span>
                  <span>10:00 - 16:00 (UTC+3)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Среднее время ответа:</span>
                  <span className="text-crypto-neon-green">< 2 часов</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Icon name="Shield" className="mr-2 text-crypto-neon-blue" />
                Безопасность
              </h3>
              
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Icon name="Check" className="text-crypto-neon-green mr-2" size={16} />
                  SSL шифрование
                </div>
                <div className="flex items-center">
                  <Icon name="Check" className="text-crypto-neon-green mr-2" size={16} />
                  2FA аутентификация
                </div>
                <div className="flex items-center">
                  <Icon name="Check" className="text-crypto-neon-green mr-2" size={16} />
                  Мы не храним приватные ключи
                </div>
                <div className="flex items-center">
                  <Icon name="Check" className="text-crypto-neon-green mr-2" size={16} />
                  Регулярные аудиты безопасности
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
