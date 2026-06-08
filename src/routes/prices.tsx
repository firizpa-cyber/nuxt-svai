import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { listProducts } from "@/lib/products.functions";
import { Button } from "@/components/ui/button";
import { formatRub } from "@/lib/format";
import { FileDown, Calendar, Shield, CheckCircle2, Phone, BadgeInfo } from "lucide-react";

const productsQO = queryOptions({ queryKey: ["products"], queryFn: () => listProducts() });

export const Route = createFileRoute("/prices")({
  head: () => ({
    meta: [
      { title: "Цены на винтовые сваи и монтаж в Сургуте — Прайс-лист" },
      { name: "description", content: "Актуальные цены на винтовые сваи всех диаметров (57-325 мм) и услуги монтажа фундамента в Сургуте и ХМАО. Скачайте официальный PDF прайс-лист." },
      { property: "og:title", content: "Прайс-лист на винтовые сваи — Завод винтовых свай" },
      { property: "og:description", content: "Актуальные цены и услуги по установке свай." },
      { property: "og:url", content: "/prices" },
    ],
    links: [{ rel: "canonical", href: "/prices" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQO),
  component: PricesPage,
});

const SERVICES = [
  { name: "Строительство свайного фундамента", price: "900 ₽", type: "Рыночная цена" },
  { name: "Установка винтовых свай", price: "900 ₽", type: "Рыночная цена" },
  { name: "Строительство винтового свайного фундамента", price: "900 ₽", type: "Рыночная цена" },
  { name: "Строительство ленточного фундамента", price: "900 ₽", type: "Рыночная цена" },
  { name: "Устройство отмостки фундамента", price: "900 ₽", type: "Рыночная цена" },
  { name: "Монтаж готового фундамента", price: "от 1 000 ₽", type: "Рыночная цена" },
  { name: "Утепление фундамента", price: "от 900 ₽", type: "Рыночная цена" },
  { name: "Фундамент «под ключ»", price: "от 1 000 ₽", type: "Рыночная цена" },
  { name: "Консультация специалиста", price: "Бесплатно", type: "Акция" },
];

function PricesPage() {
  const { data } = useSuspenseQuery(productsQO);
  const products = data.products;

  return (
    <>
      {/* HEADER HERO */}
      <section className="relative overflow-hidden border-b border-border bg-soot py-16 text-birch">
        <div className="absolute inset-0 opacity-20 wood-texture" />
        <div className="relative container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand text-brand-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Прайс-лист 2026
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">Цены на винтовые сваи и услуги</h1>
          <p className="mt-4 text-lg text-birch/80">
            Собственное производство в Сургуте. Прозрачное ценообразование без скрытых наценок. Гарантия на работы по договору.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/Прайс-лист винтовых свай Сургут.txt" download className="inline-block">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-soot gap-2 font-semibold">
                <FileDown className="h-5 w-5" /> Скачать прайс-лист TXT
              </Button>
            </a>
            <a href="tel:+79992568800">
              <Button size="lg" variant="outline" className="border-birch/30 text-birch hover:bg-birch/10 gap-2">
                <Phone className="h-4 w-4" /> Связаться с нами
              </Button>
            </a>
          </div>
        </div>
        <div className="ornament-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* CORE SERVICES PRICES */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Стоимость работ</span>
          <h2 className="mt-2 font-display text-3xl font-bold">Цены на строительно-монтажные работы</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Минимальный объем работ — от 100 м². Итоговая цена рассчитывается индивидуально в зависимости от сложности грунта и удаленности объекта.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, idx) => (
            <div key={idx} className="bg-card rounded-lg border border-border p-6 relative overflow-hidden flex flex-col justify-between hover:border-brand hover:shadow-card transition duration-300">
              <div className="izba-roof absolute top-0 left-0 right-0 h-1.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-gold bg-brand/10 px-2 py-0.5 rounded">
                  {s.type}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-foreground leading-snug">{s.name}</h3>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">Цена</span>
                <span className="font-display text-2xl font-black text-brand">{s.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TABLE FROM IMAGE */}
      <section className="bg-muted/40 border-y border-border py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Прайс-таблица</span>
              <h2 className="mt-2 font-display text-3xl font-bold">Официальная сетка цен</h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Ниже представлена скан-копия официальной сетки цен нашего завода. Мы производим сваи любой длины (от 1.5 до 12 метров) и любой толщины стенки (до 12 мм). Все изделия покрываются специальным антикоррозийным составом на основе мастики.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Толщина стенки свай от 4 мм до 12 мм",
                  "Специальное покрытие мастикой для защиты от коррозии",
                  "Срок службы свай более 100 лет",
                  "Монтаж осуществляется за 1 рабочий день техникой или вручную"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <a href="/Прайс-лист винтовых свай Сургут.txt" download>
                  <Button variant="outline" className="border-brand text-brand hover:bg-brand/10 gap-2">
                    <FileDown className="h-4 w-4" /> Скачать прайс-лист TXT
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative rounded-lg border border-border overflow-hidden bg-white p-3 shadow-elevated">
              <div className="absolute top-4 right-4 bg-brand text-brand-foreground px-2 py-1 rounded text-[10px] font-bold z-10 flex items-center gap-1 shadow">
                <BadgeInfo className="h-3.5 w-3.5" /> Сургут
              </div>
              <img
                src="/prices-table.png"
                alt="Прайс-лист завода винтовых свай Сургут"
                className="w-full h-auto object-contain rounded hover:scale-[1.02] transition duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED PILES PRODUCTS PRICE LIST BY CATEGORIES */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Цены на продукцию</span>
          <h2 className="mt-2 font-display text-3xl font-bold">Каталог цен на винтовые сваи</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Популярные диаметры всегда в наличии на складе в Сургуте. Цены указаны за 1 единицу продукции.
          </p>
        </div>

        {/* Group by category */}
        {(() => {
          const categories = Array.from(new Set(products.map(p => p.category || "Стандарт")));
          return categories.map(category => (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-brand" />
                <h3 className="font-display text-2xl font-bold text-foreground">{category}</h3>
              </div>
              <div className="overflow-x-auto rounded-lg border border-border shadow-card bg-card">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-brand text-brand-foreground font-display text-xs uppercase tracking-wider">
                      <th className="p-4">Наименование / Диаметр</th>
                      <th className="p-4">Длина</th>
                      <th className="p-4">Стенка</th>
                      <th className="p-4 text-right">Цена сваи</th>
                      <th className="p-4 text-right">С монтажом</th>
                      <th className="p-4 text-center">Заказ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {products.filter(p => (p.category || "Стандарт") === category).map((p) => (
                      <tr key={p.id} className="hover:bg-muted/40 transition">
                        <td className="p-4 font-semibold text-foreground">
                          <a href={`/product/${p.slug}`} className="hover:text-brand transition-colors">
                            Ø {p.diameter_mm} мм ({p.name})
                          </a>
                        </td>
                        <td className="p-4 text-muted-foreground">{p.length_m} м</td>
                        <td className="p-4 text-muted-foreground">{p.wall_thickness_mm} мм</td>
                        <td className="p-4 text-right font-semibold text-brand">{formatRub(Number(p.price))}</td>
                        <td className="p-4 text-right text-foreground font-medium">{formatRub(Number(p.price) + Number(p.install_price))}</td>
                        <td className="p-4 text-center">
                          <a href={`/calculator?d=${p.diameter_mm}`}>
                            <Button size="sm" variant="ghost" className="text-brand hover:text-brand-foreground hover:bg-brand text-xs px-3 py-1 h-8">
                              В калькулятор
                            </Button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ));
        })()}
      </section>

      {/* GUARANTEE & INFO */}
      <section className="bg-soot text-birch py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 wood-texture" />
        <div className="relative container mx-auto px-4 max-w-4xl grid gap-8 md:grid-cols-2">
          <div className="border-l-4 border-gold pl-6">
            <h3 className="font-display text-xl font-bold text-gold">Гарантия качества завода</h3>
            <p className="mt-3 text-sm text-birch/80 leading-relaxed">
              Мы являемся непосредственным производителем винтовых свай в Сургуте. Каждая свая проходит строгий контроль качества сварных швов и покрывается двухкомпонентной антикоррозийной мастикой. Срок службы фундамента превышает 100 лет.
            </p>
          </div>
          <div className="border-l-4 border-gold pl-6">
            <h3 className="font-display text-xl font-bold text-gold">Сроки и доставка</h3>
            <p className="mt-3 text-sm text-birch/80 leading-relaxed">
              Большинство типоразмеров свай (57, 73, 89, 108, 133 мм) всегда в наличии на нашем складе. Возможна отгрузка в день заказа. Доставляем собственной техникой по всей территории Ханты-Мансийского АО — Югры и Тюменской области.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
