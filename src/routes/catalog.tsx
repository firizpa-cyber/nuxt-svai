import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { listProducts } from "@/lib/products.functions";
import { Button } from "@/components/ui/button";
import { formatRub } from "@/lib/format";
import { useMemo, useState } from "react";

const productsQO = queryOptions({ queryKey: ["products"], queryFn: () => listProducts() });

const GALLERY_PHOTOS = [
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
  "photo_13_2026-06-06_11-15-46.jpg",
  "photo_14_2026-06-06_11-15-46.jpg",
  "photo_15_2026-06-06_11-15-46.jpg",
  "photo_16_2026-06-06_11-15-46.jpg",
  "photo_17_2026-06-06_11-15-46.jpg",
  "photo_18_2026-06-06_11-15-46.jpg",
  "photo_19_2026-06-06_11-15-46.jpg",
  "photo_20_2026-06-06_11-15-46.jpg",
  "photo_21_2026-06-06_11-15-46.jpg",
  "photo_22_2026-06-06_11-15-46.jpg",
  "photo_23_2026-06-06_11-15-46.jpg",
  "photo_24_2026-06-06_11-15-46.jpg",
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

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Каталог винтовых свай — Завод винтовых свай ХМАО" },
      { name: "description", content: "Каталог винтовых свай Ø 57–325 мм. Цены, технические характеристики, монтаж под ключ в Сургуте и ХМАО." },
      { property: "og:title", content: "Каталог винтовых свай" },
      { property: "og:description", content: "Сваи всех диаметров и длин в наличии." },
    ],
    links: [{ rel: "canonical", href: "/catalog" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQO),
  component: CatalogPage,
});

function CatalogPage() {
  const { data } = useSuspenseQuery(productsQO);
  const [filter, setFilter] = useState<string>("all");
  const categories = useMemo(() => {
    const cats = new Set(data.products.map((p) => p.category ?? "standard"));
    return ["all", ...Array.from(cats)];
  }, [data]);
  const items = filter === "all" ? data.products : data.products.filter((p) => (p.category ?? "standard") === filter);

  const catLabel: Record<string, string> = {
    all: "Все",
    "Винтовые сваи": "Винтовые сваи",
    "Опоры": "Стальные опоры",
    "Винтовые сваи под ключ": "Винтовые сваи под ключ",
    "Оцинкованные сваи": "Оцинкованные сваи",
    "Специальные сваи": "Специальные сваи",
    "Железобетонные сваи": "Железобетонные сваи",
    "Буронабивные сваи": "Буронабивные сваи",
    "Готовые фундаменты": "Готовые фундаменты",
    "Замена фундамента": "Замена фундамента",
    "Поднятие фундамента": "Поднятие фундамента",
    "Монтаж по типам объектов": "Монтаж по типам объектов",
    "Услуги монтажа": "Услуги монтажа",
    "Обвязка свай": "Обвязка свай",
    "Комплектующие": "Комплектующие",
    "Бурение и аренда": "Бурение и аренда",
    "Металлоконструкции": "Металлоконструкции",
    "Усиление фундамента": "Усиление фундамента",
    "Утепление": "Утепление",
    "Солнечные батареи": "Солнечные батареи",
    light: "Лёгкие",
    standard: "Стандартные",
    heavy: "Усиленные",
    industrial: "Промышленные",
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Продукция</span>
        <h1 className="mt-2 font-display text-4xl lg:text-5xl font-bold">Каталог винтовых свай</h1>
        <p className="mt-3 text-muted-foreground">
          Производим сваи диаметром от 57 до 325 мм. Стенка от 4 до 12 мм. Все
          сваи покрыты антикоррозийной мастикой.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              filter === c ? "bg-brand text-brand-foreground border-brand" : "border-border hover:border-brand"
            }`}
          >
            {catLabel[c] ?? c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, idx) => (
          <Link key={p.id} to={`/product/${p.slug}` as any} className="group bg-card rounded-lg border border-border overflow-hidden hover:border-brand hover:shadow-elevated transition-all block">
            <div className="aspect-[5/3] bg-gradient-to-br from-soot via-soot/80 to-brand/40 relative overflow-hidden">
              {p.image_url && p.image_url !== '' ? (
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={`/gallery/${GALLERY_PHOTOS[idx % GALLERY_PHOTOS.length]}`}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="izba-roof absolute top-0 left-0 right-0 h-2" />
              {!p.in_stock && (
                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-soot/80 text-birch text-xs">Под заказ</div>
              )}
            </div>
            <div className="p-5">
              <h2 className="font-display text-lg font-semibold leading-tight">{p.name}</h2>
              {p.description && <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{p.description}</p>}
              {p.diameter_mm > 0 && (
                <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div><dt className="text-muted-foreground">Диаметр</dt><dd className="font-semibold">{p.diameter_mm} мм</dd></div>
                  <div><dt className="text-muted-foreground">Длина</dt><dd className="font-semibold">{p.length_m} м</dd></div>
                  <div><dt className="text-muted-foreground">Стенка</dt><dd className="font-semibold">{p.wall_thickness_mm} мм</dd></div>
                </dl>
              )}
              <div className="mt-4 pt-4 border-t border-border flex items-end justify-between">
                <div>
                  {Number(p.price) > 0 && (
                    <>
                      <div className="text-xs text-muted-foreground">Цена</div>
                      <div className="font-display text-2xl font-bold text-brand">{formatRub(Number(p.price))}</div>
                    </>
                  )}
                  {Number(p.install_price) > 0 && (
                    <div className="text-xs text-muted-foreground mt-0.5">+ монтаж {formatRub(Number(p.install_price))}</div>
                  )}
                </div>
                <a href={`/calculator?d=${p.diameter_mm}`}>
                  <Button size="sm" className="bg-brand hover:bg-brand/90 text-brand-foreground">Заказать</Button>
                </a>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
