import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { listProducts } from "@/lib/products.functions";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatRub } from "@/lib/format";
import { OrderDialog } from "@/components/order-dialog";
import { Calculator as CalcIcon, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { z } from "zod";

const productsQO = queryOptions({ queryKey: ["products"], queryFn: () => listProducts() });

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Калькулятор винтовых свай — расчёт стоимости фундамента онлайн" },
      { name: "description", content: "Онлайн-калькулятор стоимости винтовых свай и монтажа. Точный расчёт за 1 минуту." },
      { property: "og:title", content: "Калькулятор стоимости винтовых свай" },
      { property: "og:description", content: "Рассчитайте сваи и монтаж онлайн." },
    ],
    links: [{ rel: "canonical", href: "/calculator" }],
  }),
  validateSearch: z.object({ d: z.number().optional() }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQO),
  component: CalcPage,
});

interface CartItem { product_id: string; qty: number }

function CalcPage() {
  const { data } = useSuspenseQuery(productsQO);
  const search = Route.useSearch();
  const products = data.products;

  const initial = search.d
    ? products.find((p) => p.diameter_mm === search.d)
    : products[1];
  const [cart, setCart] = useState<CartItem[]>(initial ? [{ product_id: initial.id, qty: 10 }] : []);
  const [dialogOpen, setDialogOpen] = useState(false);

  const addItem = (productId: string) => {
    setCart((c) => c.find((i) => i.product_id === productId) ? c : [...c, { product_id: productId, qty: 1 }]);
  };
  const updateQty = (productId: string, delta: number) =>
    setCart((c) => c.map((i) => i.product_id === productId ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const setQty = (productId: string, qty: number) =>
    setCart((c) => c.map((i) => i.product_id === productId ? { ...i, qty: Math.max(1, qty) } : i));
  const remove = (productId: string) => setCart((c) => c.filter((i) => i.product_id !== productId));

  const detailed = useMemo(() => cart.map((i) => {
    const p = products.find((x) => x.id === i.product_id);
    if (!p) return null;
    return { ...i, product: p, lineTotal: i.qty * (Number(p.price) + Number(p.install_price)) };
  }).filter((i): i is NonNullable<typeof i> => i !== null), [cart, products]);

  const totalPiles = detailed.reduce((s, i) => s + i.qty * Number(i.product.price), 0);
  const totalInstall = detailed.reduce((s, i) => s + i.qty * Number(i.product.install_price), 0);
  const totalQty = detailed.reduce((s, i) => s + i.qty, 0);
  const grandTotal = totalPiles + totalInstall;

  const orderItems = detailed.flatMap((d) => [
    { product_id: d.product.id, name: d.product.name, qty: d.qty, price: Number(d.product.price) },
    { name: `Монтаж: ${d.product.name}`, qty: d.qty, price: Number(d.product.install_price) },
  ]);

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold uppercase tracking-wider">
          <CalcIcon className="h-3.5 w-3.5" /> Калькулятор
        </div>
        <h1 className="mt-3 font-display text-4xl lg:text-5xl font-bold">Рассчитайте свой фундамент</h1>
        <p className="mt-3 text-muted-foreground">
          Подберите сваи нужного диаметра и длины, укажите количество — мы рассчитаем
          точную стоимость материалов и монтажа.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-5">
            <Label className="text-sm font-semibold">Добавить сваю в расчёт</Label>
            <Select onValueChange={addItem}>
              <SelectTrigger className="mt-2"><SelectValue placeholder="Выберите тип сваи..." /></SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    Ø {p.diameter_mm} мм × {p.length_m} м — {formatRub(Number(p.price))}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {detailed.length === 0 && (
            <div className="rounded-lg border-2 border-dashed border-border p-10 text-center text-muted-foreground">
              Добавьте сваи из списка выше, чтобы рассчитать стоимость
            </div>
          )}

          {detailed.map((d) => (
            <div key={d.product_id} className="rounded-lg border border-border bg-card p-5 hover:border-brand transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-14 w-14 rounded bg-gradient-to-br from-brand to-brand/60 grid place-items-center text-brand-foreground font-bold shrink-0">
                    {d.product.diameter_mm}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-semibold truncate">{d.product.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Свая {formatRub(Number(d.product.price))} + монтаж {formatRub(Number(d.product.install_price))}
                    </div>
                  </div>
                </div>
                <button onClick={() => remove(d.product_id)} className="text-muted-foreground hover:text-destructive p-1" aria-label="Удалить">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" onClick={() => updateQty(d.product_id, -1)}><Minus className="h-4 w-4" /></Button>
                  <Input type="number" min={1} max={9999} value={d.qty} onChange={(e) => setQty(d.product_id, parseInt(e.target.value) || 1)} className="w-20 text-center" />
                  <Button size="icon" variant="outline" onClick={() => updateQty(d.product_id, 1)}><Plus className="h-4 w-4" /></Button>
                  <span className="text-sm text-muted-foreground">шт</span>
                </div>
                <div className="font-display text-xl font-bold text-brand">{formatRub(d.lineTotal)}</div>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border-2 border-brand/20 bg-card p-6 shadow-elevated">
            <div className="font-display text-xl font-bold">Итого</div>
            <div className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Количество свай</span><span className="font-semibold">{totalQty} шт</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Стоимость свай</span><span className="font-semibold">{formatRub(totalPiles)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Монтаж</span><span className="font-semibold">{formatRub(totalInstall)}</span></div>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex justify-between items-end">
              <span className="text-sm text-muted-foreground">К оплате</span>
              <span className="font-display text-3xl font-bold text-brand">{formatRub(grandTotal)}</span>
            </div>
            <Button
              size="lg"
              disabled={detailed.length === 0}
              onClick={() => setDialogOpen(true)}
              className="w-full mt-5 bg-brand hover:bg-brand/90 text-brand-foreground h-12 gap-2"
            >
              <ShoppingCart className="h-4 w-4" /> Оформить заявку
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Окончательная цена согласуется после бесплатного выезда замерщика
            </p>
          </div>
        </aside>
      </div>

      <OrderDialog open={dialogOpen} onOpenChange={setDialogOpen} items={orderItems} total={grandTotal} />
    </div>
  );
}
