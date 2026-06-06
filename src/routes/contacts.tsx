import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, Send, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — Завод винтовых свай в Сургуте" },
      { name: "description", content: "г. Сургут, ул. Индустриальная, 17, оф. 108. Телефон +7 999 256-88-00. Email stroymontazh-86@mail.ru." },
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
        <a href="mailto:stroymontazh-86@mail.ru" className="group rounded-lg border border-border bg-card p-6 hover:border-brand hover:shadow-elevated transition-all">
          <Mail className="h-6 w-6 text-brand" />
          <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Email</div>
          <div className="font-display text-xl font-bold mt-1 group-hover:text-brand break-all">stroymontazh-86@mail.ru</div>
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
    </div>
  );
}
