import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { formatRub } from "@/lib/format";
import { useServerFn } from "@tanstack/react-start";
import { sendOrderEmail } from "@/lib/email.functions";

export const Route = createFileRoute("/order")({
  component: OrderPage,
});

function OrderPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Array<{ product_id: string; name: string; price: number; install_price: number; qty: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const sendEmail = useServerFn(sendOrderEmail);

  // Load cart once on mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
    setLoading(false);
  }, []);

  const total = cart.reduce((s, i) => s + (i.price + i.install_price) * i.qty, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.email) {
      toast.error("Заполните все поля");
      return;
    }
    setSubmitting(true);
    try {
      const res = await sendEmail({
        data: {
          cart: cart.map((i) => ({
            product_id: i.product_id,
            name: i.name,
            price: i.price + i.install_price,
            qty: i.qty,
          })),
          customer: {
            name: customer.name.trim(),
            phone: customer.phone.trim(),
            email: customer.email.trim(),
          },
        },
      });
      if (res.success) {
        toast.success("Заявка отправлена!");
        localStorage.removeItem("cart");
        setCart([]);
        navigate({ to: "/" });
      } else {
        toast.error("Ошибка отправки заявки");
      }
    } catch (err: any) {
      toast.error(err?.message || "Ошибка сети");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-12 text-center">Загрузка…</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-display text-3xl mb-6">Оформить заявку</h1>
      {cart.length === 0 ? (
        <p className="text-muted-foreground">Корзина пуста.</p>
      ) : (
        <>
          <table className="w-full mb-6 border border-border">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-2">Товар</th>
                <th className="text-center p-2">Кол‑во</th>
                <th className="text-right p-2">Цена</th>
                <th className="text-right p-2">Сумма</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((i) => (
                <tr key={i.product_id} className="border-t border-border">
                  <td className="p-2">{i.name}</td>
                  <td className="p-2 text-center">{i.qty}</td>
                  <td className="p-2 text-right">{formatRub(i.price + i.install_price)}</td>
                  <td className="p-2 text-right">{formatRub((i.price + i.install_price) * i.qty)}</td>
                </tr>
              ))}
              <tr className="border-t border-border font-bold">
                <td colSpan={3} className="p-2 text-right">Итого:</td>
                <td className="p-2 text-right">{formatRub(total)}</td>
              </tr>
            </tbody>
          </table>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Имя</label>
              <Input
                required
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Телефон</label>
              <Input
                required
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">E‑mail</label>
              <Input
                type="email"
                required
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand hover:bg-brand/90 text-brand-foreground h-12"
            >
              {submitting ? "Отправка…" : "Отправить заявку"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
