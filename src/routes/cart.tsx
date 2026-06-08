import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatRub } from "@/lib/format";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart, Package } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Корзина — Завод винтовых свай" },
      { name: "description", content: "Ваша корзина с товарами" },
    ],
  }),
  component: CartPage,
});

interface CartItem {
  product_id: string;
  name: string;
  price: number;
  install_price: number;
  qty: number;
}

function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage
  const loadCart = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setLoading(false);
  };
  
  useEffect(() => {
    // Initial load
    loadCart();

    const handleCartUpdated = () => loadCart();
    // Listen for custom cart-updated events to refresh cart
    window.addEventListener("cart-updated", handleCartUpdated);
    
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdated);
    };
  }, []);

  const updateQty = (productId: string, delta: number) =>
    setCart((c) => c.map((i) => i.product_id === productId ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const setQty = (productId: string, qty: number) =>
    setCart((c) => c.map((i) => i.product_id === productId ? { ...i, qty: Math.max(1, qty) } : i));
  const remove = (productId: string) => setCart((c) => c.filter((i) => i.product_id !== productId));

  useEffect(() => {
    if (loading) return;
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
  }, [cart, loading]);

  const totalPiles = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const totalInstall = cart.reduce((s, i) => s + i.qty * i.install_price, 0);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const grandTotal = totalPiles + totalInstall;

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Загрузка...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16 max-w-5xl">
      <Link to="/catalog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Вернуться в каталог
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <ShoppingCart className="h-8 w-8 text-brand" />
        <h1 className="font-display text-3xl lg:text-4xl font-bold">Корзина</h1>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
          <Package className="h-16 w-16 mx-auto text-muted-foreground" />
          <div className="mt-4 font-display text-lg font-semibold">Корзина пуста</div>
          <p className="text-sm text-muted-foreground mt-2">Добавьте товары из каталога</p>
          <Link to={"/catalog" as any}>
            <Button className="mt-4 bg-brand hover:bg-brand/90 text-brand-foreground">В каталог</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.product_id} className="rounded-lg border border-border bg-card p-5 hover:border-brand transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-display font-semibold">{item.name}</h3>
                    <div className="text-xs text-muted-foreground mt-1">
                      Свая {formatRub(item.price)} + монтаж {formatRub(item.install_price)}
                    </div>
                  </div>
                  <button onClick={() => remove(item.product_id)} className="text-muted-foreground hover:text-destructive p-1" aria-label="Удалить">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" onClick={() => updateQty(item.product_id, -1)}><Minus className="h-4 w-4" /></Button>
                    <Input type="number" min={1} max={9999} value={item.qty} onChange={(e) => setQty(item.product_id, parseInt(e.target.value) || 1)} className="w-20 text-center" />
                    <Button size="icon" variant="outline" onClick={() => updateQty(item.product_id, 1)}><Plus className="h-4 w-4" /></Button>
                    <span className="text-sm text-muted-foreground">шт</span>
                  </div>
                  <div className="font-display text-xl font-bold text-brand">{formatRub(item.qty * (item.price + item.install_price))}</div>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border-2 border-brand/20 bg-card p-6 shadow-elevated">
              <div className="font-display text-xl font-bold">Итого</div>
              <div className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Количество</span><span className="font-semibold">{totalQty} шт</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Стоимость свай</span><span className="font-semibold">{formatRub(totalPiles)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Монтаж</span><span className="font-semibold">{formatRub(totalInstall)}</span></div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex justify-between items-end">
                <span className="text-sm text-muted-foreground">К оплате</span>
                <span className="font-display text-3xl font-bold text-brand">{formatRub(grandTotal)}</span>
              </div>
              <Link to={"/order" as any}>
                <Button size="lg" className="w-full mt-5 bg-brand hover:bg-brand/90 text-brand-foreground h-12 gap-2">
                  <ShoppingCart className="h-4 w-4" /> Оформить заявку
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
