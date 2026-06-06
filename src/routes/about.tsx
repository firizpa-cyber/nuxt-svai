import { createFileRoute } from "@tanstack/react-router";
import { Award, Users, Hammer, Calendar, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О компании — Завод винтовых свай ХМАО" },
      { name: "description", content: "Собственное производство винтовых свай, более 1000 объектов, опыт 5+ лет. Работаем в Сургуте и ХМАО." },
      { property: "og:title", content: "О компании Завод винтовых свай" },
      { property: "og:description", content: "Производство и монтаж винтовых свай в ХМАО." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-16 max-w-5xl">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">О компании</span>
      <h1 className="mt-2 font-display text-4xl lg:text-5xl font-bold">Завод винтовых свай в ХМАО</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
        Производим и монтируем винтовые сваи в Сургуте, по всему ХМАО — Югре и
        Тюменской области. Своё производство, своя техника, опытная бригада.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { i: Calendar, v: "5+ лет", l: "на рынке" },
          { i: Award, v: "1000+", l: "объектов" },
          { i: Users, v: "5–20", l: "мастеров" },
          { i: Hammer, v: "50 свай", l: "в день" },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border border-border bg-card p-5">
            <s.i className="h-6 w-6 text-brand" />
            <div className="mt-3 font-display text-3xl font-bold">{s.v}</div>
            <div className="text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="ornament-divider my-12" />

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold">Что мы делаем</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              "Свайный и винтовой фундамент под ключ",
              "Сваи для дома, бани, беседки, забора, террасы",
              "Монтаж в любое время года, включая зиму",
              "Демонтаж и замена фундамента",
              "Подъём и реконструкция домов",
              "Сваи для причалов, пирсов, укрепления берегов",
            ].map((t) => (
              <li key={t} className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-brand shrink-0" /> {t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">Почему выбирают нас</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              "Собственное производство — цены без посредников",
              "Сваи покрыты антикоррозийной мастикой — срок службы 100+ лет",
              "Работа по договору, шаблоны: договор, расписка, акт",
              "Бесплатный выезд на замер",
              "Гарантия на материалы и работу",
              "Возможность монтажа техникой и вручную",
            ].map((t) => (
              <li key={t} className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-gold shrink-0" /> {t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
