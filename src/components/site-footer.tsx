import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 wood-texture text-birch">
      <div className="ornament-divider opacity-50" />
      <div className="container mx-auto px-4 py-12 grid gap-10 md:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-3 group mb-4">
            <img src="/logo.png" alt="Завод винтовых свай" className="h-10 w-auto bg-birch/90 p-1 rounded object-contain" />
            <div>
              <div className="font-display text-lg font-bold text-birch leading-none">СтройМонтаж-86</div>
              <div className="text-[10px] text-gold uppercase tracking-wider mt-1">Завод винтовых свай</div>
            </div>
          </div>
          <p className="mt-3 text-birch/70 leading-relaxed">
            Производство и монтаж винтовых свай в ХМАО и Сургуте. Более 1000 объектов,
            опыт более 5 лет. Собственная техника и бригады.
          </p>
        </div>
        <div>
          <div className="font-display text-base text-gold mb-3">Меню</div>
          <ul className="space-y-2 text-birch/80">
            <li><Link to="/catalog" className="hover:text-birch">Каталог свай</Link></li>
            <li><Link to="/prices" className="hover:text-birch">Цены на услуги</Link></li>
            <li><Link to="/calculator" className="hover:text-birch">Калькулятор</Link></li>
            {/* <li><Link to="/gallery" className="hover:text-birch">Галерея работ</Link></li> */}
            <li><Link to="/about" className="hover:text-birch">О компании</Link></li>
            <li><Link to="/contacts" className="hover:text-birch">Контакты</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-display text-base text-gold mb-3">Контакты</div>
          <ul className="space-y-2 text-birch/80">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> <a href="tel:+79992568800" className="hover:text-birch">+7 999 256-88-00</a></li>
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> <a href="tel:+73462677070" className="hover:text-birch">+7 (3462) 67-70-70</a></li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /> <a href="mailto:surgutsvai43@gmail.com" className="hover:text-birch break-all">surgutsvai43@gmail.com</a></li>
            <li className="flex items-start gap-2"><Send className="h-4 w-4 mt-0.5 shrink-0" /> <a href="https://t.me/stroymantazh86" target="_blank" rel="noopener" className="hover:text-birch">@stroymantazh86</a></li>
          </ul>
        </div>
        <div>
          <div className="font-display text-base text-gold mb-3">Адрес</div>
          <ul className="space-y-2 text-birch/80">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> г. Сургут, ул. Индустриальная, 17, офис 108</li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0" /> Пн–Вс: 08:00 — 22:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-birch/10">
        <div className="container mx-auto px-4 py-4 text-xs text-birch/60 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} ЗАВОД ВИНТОВЫХ СВАЙ. Все права защищены.</span>
          <span>Работаем по всему ХМАО — Югре</span>
        </div>
      </div>
    </footer>
  );
}
