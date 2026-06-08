import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, Send, ExternalLink } from "lucide-react";

const CONTACTS_PHOTOS = [
  "photo_16_2026-06-06_11-15-46.jpg",
  "photo_17_2026-06-06_11-15-46.jpg",
  "photo_18_2026-06-06_11-15-46.jpg",
];

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — Завод винтовых свай в Сургуте" },
      { name: "description", content: "г. Сургут, ул. Индустриальная, 17, оф. 108. Телефон +7 999 256-88-00. Email surgutsvai43@gmail.com." },
      { property: "og:title", content: "Контакты — Завод винтовых свай" },
      { property: "og:description", content: "Телефон, email, адрес офиса в Сургуте." },
    ],
    links: [{ rel: "canonical", href: "/contacts" }],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-16 max-w-5xl">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Контакты</span>
      <h1 className="mt-2 font-display text-4xl lg:text-5xl font-bold">Свяжитесь с нами</h1>
      <p className="mt-3 text-muted-foreground">Работаем по всему ХМАО — Югре, Сургуту и Тюменской области.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <a href="tel:+79992568800" className="group rounded-lg border border-border bg-card p-6 hover:border-brand hover:shadow-elevated transition-all">
          <Phone className="h-6 w-6 text-brand" />
          <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Основной телефон</div>
          <div className="font-display text-2xl font-bold mt-1 group-hover:text-brand">+7 999 256-88-00</div>
          <div className="text-sm text-muted-foreground mt-1">Звонки и WhatsApp</div>
        </a>
        <a href="tel:+73462677070" className="group rounded-lg border border-border bg-card p-6 hover:border-brand hover:shadow-elevated transition-all">
          <Phone className="h-6 w-6 text-brand" />
          <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Офис Сургут</div>
          <div className="font-display text-2xl font-bold mt-1 group-hover:text-brand">+7 (3462) 67-70-70</div>
          <div className="text-sm text-muted-foreground mt-1">Городской номер</div>
        </a>
        <a href="https://t.me/stroymantazh86" target="_blank" rel="noopener" className="group rounded-lg border border-border bg-card p-6 hover:border-brand hover:shadow-elevated transition-all">
          <Send className="h-6 w-6 text-brand" />
          <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Telegram</div>
          <div className="font-display text-2xl font-bold mt-1 group-hover:text-brand">@stroymantazh86</div>
          <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">Написать <ExternalLink className="h-3 w-3" /></div>
        </a>
        <a href="mailto:surgutsvai43@gmail.com" className="group rounded-lg border border-border bg-card p-6 hover:border-brand hover:shadow-elevated transition-all">
          <Mail className="h-6 w-6 text-brand" />
          <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Email</div>
          <div className="font-display text-xl font-bold mt-1 group-hover:text-brand break-all">surgutsvai43@gmail.com</div>
        </a>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <MapPin className="h-6 w-6 text-brand" />
          <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Адрес офиса</div>
          <div className="font-display text-lg font-bold mt-1">г. Сургут, ул. Индустриальная, 17, офис 108</div>
          <div className="text-sm text-muted-foreground mt-2">
            Тюменская область, ХМАО — Югра, Центральный район. Выезжаем по всему городу и региону.
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <Clock className="h-6 w-6 text-brand" />
          <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">График работы</div>
          <div className="font-display text-lg font-bold mt-1">Ежедневно, 08:00 — 22:00</div>
          <div className="text-sm text-muted-foreground mt-2">
            Принимаем заявки и консультируем без выходных. Монтаж — по согласованию.
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-lg overflow-hidden border border-border h-[400px]">
        <iframe
          title="Карта офиса"
          src="https://yandex.ru/map-widget/v1/?ll=73.385,61.254&z=12&pt=73.385,61.254,pm2rdm"
          width="100%" height="100%" frameBorder="0" loading="lazy"
        />
      </div>

      {/* PHOTO GALLERY */}
      <section className="mt-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Галерея</span>
          <h2 className="mt-2 font-display text-3xl font-bold">Наш офис и работы</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Примеры наших объектов и офис в Сургуте. Более 1000 успешно выполненных проектов по ХМАО.
          </p>
        </div>
        
        <div className="grid gap-4 md:gap-6">
          {/* Large featured photo */}
          <div className="relative rounded-2xl overflow-hidden border border-border hover:border-brand hover:shadow-elevated transition-all group">
            <div className="izba-roof absolute top-0 left-0 right-0 h-1 z-10" />
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=600&fit=crop"
              alt="Монтаж винтовых свай"
              className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-soot/95 via-soot/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gold">Главный объект</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-birch">Профессиональный монтаж свай</h3>
              <p className="text-sm md:text-base text-birch/80 mt-2 max-w-xl">
                Собственная техника и опытные мастера с многолетним стажем работы в условиях ХМАО
              </p>
            </div>
          </div>

          {/* Three column layout */}
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            <div className="relative rounded-xl overflow-hidden border border-border hover:border-brand hover:shadow-card transition-all group">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"
                alt="Наш офис"
                className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soot/90 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-display text-lg font-bold text-birch">Офис в Сургуте</h3>
                <p className="text-xs text-birch/80 mt-1">ул. Индустриальная, 17</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-border hover:border-brand hover:shadow-card transition-all group">
              <img
                src={`/gallery/${CONTACTS_PHOTOS[0]}`}
                alt="Наши работы"
                className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soot/90 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-display text-lg font-bold text-birch">Наши объекты</h3>
                <p className="text-xs text-birch/80 mt-1">Более 1000 проектов</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-border hover:border-brand hover:shadow-card transition-all group">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop"
                alt="Строительство"
                className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soot/90 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-display text-lg font-bold text-birch">Строительство</h3>
                <p className="text-xs text-birch/80 mt-1">Фундамент за 1 день</p>
              </div>
            </div>
          </div>

          {/* Two column layout for remaining photos */}
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            {CONTACTS_PHOTOS.slice(1).map((photo, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden border border-border hover:border-brand hover:shadow-card transition-all group">
                <img
                  src={`/gallery/${photo}`}
                  alt={`Фото работы ${idx + 1}`}
                  className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-300" />
                <div className="absolute top-4 right-4 bg-soot/80 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-gold">Работа #{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
