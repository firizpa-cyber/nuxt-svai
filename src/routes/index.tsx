import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { listProducts } from "@/lib/products.functions";
import { Button } from "@/components/ui/button";
import {
  Shield, Truck, Hammer, Snowflake, CheckCircle2, Phone, Send, ArrowRight, Award,
  FileText, Users, Landmark, FileCheck, HelpCircle
} from "lucide-react";
import heroImg from "@/assets/hero-piles.jpg";
import { formatRub } from "@/lib/format";

const productsQO = queryOptions({ queryKey: ["products"], queryFn: () => listProducts() });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Винтовые сваи в Сургуте и ХМАО — производство, монтаж за 1 день" },
      { name: "description", content: "Завод винтовых свай СтройМонтаж-86 в Сургуте. Собственное производство 57–325 мм. Монтаж фундамента под ключ, гарантия, бесплатный замер. 1000+ объектов." },
      { property: "og:title", content: "Завод винтовых свай СтройМонтаж-86 — Сургут и ХМАО" },
      { property: "og:description", content: "Собственное производство и качественный монтаж винтовых свай за один день. Гарантия, договор." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }, { rel: "preload", as: "image", href: heroImg, fetchPriority: "high" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQO),
  component: HomePage,
});

const WORK_TEMPLATES = [
  { title: "Официальный договор", desc: "Четко прописаны сроки, стоимость свай и монтажа" },
  { title: "Гарантийная расписка", desc: "Гарантия на фундамент и выполненные работы" },
  { title: "Акт приема-передачи", desc: "Двусторонний акт после проверки качества уровня" }
];

const PREVIEW_PHOTOS = [
  "photo_1_2026-06-06_11-15-46.jpg",
  "photo_2_2026-06-06_11-15-46.jpg",
  "photo_3_2026-06-06_11-15-46.jpg",
  "photo_4_2026-06-06_11-15-46.jpg",
  "photo_5_2026-06-06_11-15-46.jpg",
  "photo_6_2026-06-06_11-15-46.jpg",
  "photo_7_2026-06-06_11-15-46.jpg",
  "photo_8_2026-06-06_11-15-46.jpg",
  "photo_9_2026-06-06_11-15-46.jpg",
  "photo_10_2026-06-06_11-15-46.jpg",
  "photo_11_2026-06-06_11-15-46.jpg",
  "photo_12_2026-06-06_11-15-46.jpg",
  "1.jpg",
  "123.jpg",
  "1231.jpg",
  "12311.jpg",
  "1231111.jpg",
  "123112.jpg",
  "1231123.jpg",
  "123122222.jpg",
  "1231223.jpg",
  "1234.jpg",
  "1234122.jpg",
  "123441222.jpg",
  "12345.jpg",
  "123451.jpg",
  "123456.jpg",
  "1234567.jpg",
  "1234567123.jpg",
  "12345678.jpg",
  "123456781.jpg",
  "12345678111.jpg",
  "213.jpg",
  "2222.jpg",
  "23122.jpg",
  "23412.jpg",
  "23423.jpg",
  "3122.jpg",
  "31234.jpg",
  "32.jpg",
  "3231.jpg",
  "41.jpg",
  "41231.jpg",
];

function HomePage() {
  const { data } = useSuspenseQuery(productsQO);
  const featured = data.products.slice(0, 16);

  return (
    <>
      {/* HERO SECTION WITH SLAVIC MOTIFS */}
      <section className="relative overflow-hidden border-b border-border bg-soot">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Монтаж винтовой сваи зимой в ХМАО" width={1920} height={1080} className="h-full w-full object-cover opacity-85" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-soot/95 via-soot/80 to-soot/40" />
        </div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32 text-birch">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand text-brand-foreground text-xs font-semibold uppercase tracking-wider mb-4 border border-gold/30">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Собственное производство свай
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Винтовые сваи <span className="text-gold">СтройМонтаж-86</span><br />
              <span className="text-sm sm:text-lg font-sans font-medium text-birch/90 block mt-2 tracking-wide uppercase">
                Производство и профессиональный монтаж в Сургуте и ХМАО-Югре
              </span>
            </h1>
            <p className="mt-5 text-lg text-birch/85 max-w-xl leading-relaxed">
              Изготавливаем и монтируем сваи Ø 57–325 мм любой длины от 1.5 до 12 м с защитным покрытием мастикой. Срок службы 100+ лет. Гарантия, работа по договору, бесплатный выезд замерщика.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/calculator">
                <Button size="lg" className="bg-brand hover:bg-brand/90 text-brand-foreground gap-2 h-14 px-6 text-base shadow-lg border border-gold/20">
                  Рассчитать стоимость <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:+79992568800">
                <Button size="lg" variant="outline" className="bg-birch/10 border-birch/30 text-birch hover:bg-birch/20 hover:text-birch gap-2 h-14 px-6 text-base">
                  <Phone className="h-4 w-4" /> +7 999 256-88-00
                </Button>
              </a>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg border-t border-birch/10 pt-6">
              {[
                { v: "1000+", l: "объектов" },
                { v: "5+ лет", l: "опыт в сфере" },
                { v: "100+ лет", l: "срок службы свай" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-gold pl-3">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-gold">{s.v}</div>
                  <div className="text-[10px] text-birch/70 uppercase tracking-wider mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ornament-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* CORE SPECIFICATIONS (FROM инфо.txt) */}
      <section className="bg-card py-16 border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Характеристики</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground">Надежный свайный фундамент в цифрах</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-5 bg-muted/40 rounded-lg border border-border">
              <div className="text-xs text-muted-foreground uppercase font-semibold">Размеры свай</div>
              <div className="mt-2 font-display text-2xl font-bold text-brand">от 1.5 до 12 метров</div>
              <p className="mt-2 text-xs text-muted-foreground">Любая длина и диаметры (57, 73, 89, 108, 133, 159, 219, 325 мм) всегда на складе.</p>
            </div>
            <div className="p-5 bg-muted/40 rounded-lg border border-border">
              <div className="text-xs text-muted-foreground uppercase font-semibold">Толщина стали</div>
              <div className="mt-2 font-display text-2xl font-bold text-brand">от 4 мм до 12 мм</div>
              <p className="mt-2 text-xs text-muted-foreground">Применяем только новые прочные стальные трубы без коррозии и б/у металла.</p>
            </div>
            <div className="p-5 bg-muted/40 rounded-lg border border-border">
              <div className="text-xs text-muted-foreground uppercase font-semibold">Защита от коррозии</div>
              <div className="mt-2 font-display text-2xl font-bold text-brand">Мастичное покрытие</div>
              <p className="mt-2 text-xs text-muted-foreground">Каждая свая покрывается специальной мастикой, гарантирующей срок службы 100+ лет.</p>
            </div>
            <div className="p-5 bg-muted/40 rounded-lg border border-border">
              <div className="text-xs text-muted-foreground uppercase font-semibold">Объемы монтажа</div>
              <div className="mt-2 font-display text-2xl font-bold text-brand">до 50 свай в день</div>
              <p className="mt-2 text-xs text-muted-foreground">Собственные бригады монтажников со стажем 5+ лет и профессиональная спецтехника.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Преимущества работы</span>
          <h2 className="mt-2 font-display text-3xl lg:text-4xl font-bold text-foreground">Почему фундамент заказывают у нас</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {[
            { i: Hammer, t: "Прямой производитель", d: "Цены завода без посредников. Любые типоразмеры в наличии на складе в Сургуте." },
            { i: Snowflake, t: "Зимний монтаж свай", d: "Успешно производим установку в промерзший грунт при температуре до −40°C." },
            { i: Truck, t: "Доставка и спецтехника", d: "Своя спецтехника (КАМАЗы, мини-экскаваторы). Выезд по всему городу и ХМАО." },
            { i: Shield, t: "Гарантия по договору", d: "Юридическая чистота сделки: предоставляем договор, акты и финансовые расписки." },
          ].map((f) => (
            <div key={f.t} className="group p-6 rounded-lg border border-border bg-card hover:border-brand hover:shadow-card transition duration-300 relative">
              <div className="izba-roof absolute top-0 left-0 right-0 h-1" />
              <div className="h-12 w-12 rounded bg-brand/10 grid place-items-center text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-colors mt-2">
                <f.i className="h-6 w-6" />
              </div>
              <div className="mt-4 font-display text-lg font-bold text-foreground">{f.t}</div>
              <div className="mt-2 text-xs text-muted-foreground leading-relaxed">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT CATALOG PREVIEW */}
      <section className="bg-muted/40 border-y border-border py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-end justify-between gap-4 mb-10 border-b border-border pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Популярные товары</span>
              <h2 className="mt-2 font-display text-3xl font-bold text-foreground">Винтовые сваи в наличии</h2>
            </div>
            <Link to="/catalog" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
              Смотреть весь каталог <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {featured.map((p, idx) => (
              <div key={p.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-card hover:border-brand transition duration-300 relative">
                <div className="izba-roof absolute top-0 left-0 right-0 h-1" />
                <div className="aspect-[4/3] bg-gradient-to-br from-soot via-soot/80 to-brand/40 relative overflow-hidden">
                  <img
                    src={`/gallery/${PREVIEW_PHOTOS[idx % PREVIEW_PHOTOS.length]}`}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">В наличии • Ø {p.diameter_mm} мм</div>
                      <div className="font-display text-lg font-bold text-foreground mt-1 leading-tight">{p.name}</div>
                    </div>
                    <div className="h-10 w-10 rounded bg-gradient-to-br from-brand to-brand/60 grid place-items-center text-brand-foreground font-bold shrink-0 text-sm">
                      {p.diameter_mm}
                    </div>
                  </div>
                  <div className="mt-4 flex gap-4 text-xs text-muted-foreground border-t border-border/50 pt-3">
                    <span>Длина: <strong>{p.length_m} м</strong></span>
                    <span>Стенка: <strong>{p.wall_thickness_mm} мм</strong></span>
                  </div>
                  <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                    <div>
                      <div className="text-[10px] text-muted-foreground">Цена сваи</div>
                      <div className="font-display text-xl font-bold text-brand">{formatRub(Number(p.price))}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-muted-foreground">Монтаж под ключ</div>
                      <div className="text-sm font-semibold text-foreground">{formatRub(Number(p.price) + Number(p.install_price))}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BUILDER: DOCUMENT TEMPLATES */}
      <section className="bg-card border-y border-border py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Юридическая гарантия</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground">Работаем строго по договору</h2>
            <p className="mt-2 text-sm text-muted-foreground">Предоставляем клиенту полный пакет необходимых документов для отчетности и гарантии.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {WORK_TEMPLATES.map((t, idx) => (
              <div key={idx} className="p-6 rounded-lg border border-border bg-muted/30 relative flex flex-col justify-between hover:border-brand transition">
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded bg-brand/10 text-brand grid place-items-center shrink-0">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">{t.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION WITH WOOD TEXTURE & RUSSIAN THEME */}
      <section className="container mx-auto px-4 py-16 lg:py-24 max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl wood-texture text-birch p-8 md:p-14 shadow-elevated border border-gold/20">
          <div className="izba-roof absolute top-0 left-0 right-0 h-3" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-birch leading-tight">
                Бесплатный выезд на замер в Сургуте!
              </h2>
              <p className="mt-4 text-birch/85 text-sm leading-relaxed">
                Наш инженер приедет к вам на участок, проведет необходимые пробы грунта, рассчитает нужное количество и параметры свай абсолютно бесплатно. Вы получите точную смету фундамента.
              </p>
              <ul className="mt-6 space-y-2 text-birch/90 text-xs">
                {["Минимальный объем работ: от 100 м²", "Доступно мастеров: от 5 до 20 человек", "Выезжаем по всему Сургуту и ближайшим районам ХМАО"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/calculator">
                <Button size="lg" className="w-full bg-brand hover:bg-brand/90 text-brand-foreground gap-2 h-14 text-base font-semibold shadow border border-gold/20">
                  <Award className="h-5 w-5" /> Рассчитать смету онлайн
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
