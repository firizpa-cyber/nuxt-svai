import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { listProducts } from "@/lib/products.functions";
import { Button } from "@/components/ui/button";
import {
  Shield, Truck, Hammer, Snowflake, CheckCircle2, Phone, Send, ArrowRight, Award,
} from "lucide-react";
import heroImg from "@/assets/hero-piles.jpg";
import { formatRub } from "@/lib/format";

const productsQO = queryOptions({ queryKey: ["products"], queryFn: () => listProducts() });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Винтовые сваи в Сургуте и ХМАО — производство, монтаж за 1 день" },
      { name: "description", content: "Завод винтовых свай в Сургуте. Производство 57–325 мм. Монтаж под ключ, гарантия, бесплатный замер. 1000+ объектов, 5+ лет опыта." },
      { property: "og:title", content: "Завод винтовых свай — Сургут и ХМАО" },
      { property: "og:description", content: "Производство и монтаж винтовых свай. Бесплатный замер, монтаж за 1 день." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }, { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQO),
  component: HomePage,
});

function HomePage() {
  const { data } = useSuspenseQuery(productsQO);
  const featured = data.products.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Монтаж винтовой сваи зимой в ХМАО" width={1920} height={1080} className="h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-soot/90 via-soot/70 to-soot/30" />
        </div>
        <div className="relative container mx-auto px-4 py-20 lg:py-28 text-birch">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand text-brand-foreground text-xs font-semibold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Собственное производство
            </div>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Винтовые сваи <span className="text-gold">под ключ</span><br />в Сургуте и ХМАО
            </h1>
            <p className="mt-5 text-lg text-birch/85 max-w-xl">
              Производим и монтируем сваи Ø 57–325 мм. До 50 свай в день. Гарантия,
              работа по договору, бесплатный замер.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/calculator">
                <Button size="lg" className="bg-brand hover:bg-brand/90 text-brand-foreground gap-2">
                  Рассчитать стоимость <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:+79992568800">
                <Button size="lg" variant="outline" className="bg-birch/10 border-birch/30 text-birch hover:bg-birch/20 hover:text-birch gap-2">
                  <Phone className="h-4 w-4" /> +7 999 256-88-00
                </Button>
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
              {[
                { v: "1000+", l: "объектов" },
                { v: "5 лет", l: "опыт" },
                { v: "100 лет", l: "срок службы" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-gold pl-3">
                  <div className="font-display text-2xl font-bold text-gold">{s.v}</div>
                  <div className="text-xs text-birch/70 uppercase tracking-wide">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ornament-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* ADVANTAGES */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Почему мы</span>
          <h2 className="mt-2 font-display text-3xl lg:text-4xl font-bold">Делаем фундаменты, которые стоят век</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Hammer, t: "Собственное производство", d: "Любой диаметр и длина всегда в наличии — без посредников" },
            { i: Snowflake, t: "Монтаж в любое время года", d: "Работаем даже при −40°C, включая выходные" },
            { i: Truck, t: "Монтаж за 1 день", d: "До 50 свай в день. Своя техника и бригада" },
            { i: Shield, t: "Гарантия и договор", d: "Антикор-мастика, срок службы 100+ лет" },
          ].map((f) => (
            <div key={f.t} className="group p-6 rounded-lg border border-border bg-card hover:border-brand hover:shadow-elevated transition-all">
              <div className="h-12 w-12 rounded bg-brand/10 grid place-items-center text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                <f.i className="h-6 w-6" />
              </div>
              <div className="mt-4 font-display text-lg font-semibold">{f.t}</div>
              <div className="mt-1.5 text-sm text-muted-foreground">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOG PREVIEW */}
      <section className="bg-muted/40 border-y border-border py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Каталог</span>
              <h2 className="mt-2 font-display text-3xl lg:text-4xl font-bold">Винтовые сваи всех размеров</h2>
            </div>
            <Link to="/catalog" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
              Весь каталог <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <div key={p.id} className="bg-card rounded-lg border border-border p-5 hover:shadow-elevated hover:border-brand transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Ø {p.diameter_mm} мм</div>
                    <div className="font-display text-lg font-semibold mt-1">{p.name}</div>
                  </div>
                  <div className="h-12 w-12 rounded bg-gradient-to-br from-brand to-brand/60 grid place-items-center text-brand-foreground font-bold shrink-0">
                    {p.diameter_mm}
                  </div>
                </div>
                <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
                  <span>Длина {p.length_m} м</span>
                  <span>Стенка {p.wall_thickness_mm} мм</span>
                </div>
                <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Свая</div>
                    <div className="font-display text-xl font-bold text-brand">{formatRub(Number(p.price))}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Монтаж</div>
                    <div className="text-sm font-semibold">{formatRub(Number(p.install_price))}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="relative overflow-hidden rounded-2xl wood-texture text-birch p-8 md:p-14">
          <div className="izba-roof absolute top-0 left-0 right-0 h-3" />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-birch">Бесплатный замер и расчёт</h2>
              <p className="mt-3 text-birch/80">
                Оставьте заявку — менеджер свяжется в течение 15 минут, рассчитает
                фундамент и согласует выезд на объект.
              </p>
              <ul className="mt-6 space-y-2 text-birch/90 text-sm">
                {["Выезд по всему ХМАО", "Гарантия и договор", "Работаем с физ и юр лицами"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gold" /> {t}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/calculator">
                <Button size="lg" className="w-full bg-brand hover:bg-brand/90 text-brand-foreground gap-2 h-14 text-base">
                  <Award className="h-5 w-5" /> Рассчитать фундамент
                </Button>
              </Link>
              <a href="https://t.me/stroymantazh86" target="_blank" rel="noopener">
                <Button size="lg" variant="outline" className="w-full h-14 text-base bg-birch text-soot hover:bg-gold border-birch gap-2">
                  <Send className="h-5 w-5" /> Написать в Telegram
                </Button>
              </a>
              <a href="tel:+79992568800">
                <Button size="lg" variant="outline" className="w-full h-14 text-base bg-transparent border-birch/40 text-birch hover:bg-birch/10 hover:text-birch gap-2">
                  <Phone className="h-5 w-5" /> +7 999 256-88-00
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
