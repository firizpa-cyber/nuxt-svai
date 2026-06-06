import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createOrder } from "@/lib/orders.functions";
import { formatRub } from "@/lib/format";

interface OrderItem { name: string; qty: number; price: number; product_id?: string }

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  items: OrderItem[];
  total: number;
}

export function OrderDialog({ open, onOpenChange, items, total }: Props) {
  const navigate = useNavigate();
  const submit = useServerFn(createOrder);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", comment: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Укажите имя");
    if (form.phone.trim().length < 5) return toast.error("Укажите телефон");
    setLoading(true);
    try {
      const res = await submit({
        data: {
          contact_name: form.name.trim(),
          contact_phone: form.phone.trim(),
          contact_email: form.email.trim() || undefined,
          address: form.address.trim() || undefined,
          comment: form.comment.trim() || undefined,
          items,
        },
      });
      toast.success(`Заявка №${res.order.order_number} принята. Перезвоним в течение 15 минут.`);
      onOpenChange(false);
      navigate({ to: "/orders" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось отправить");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Оформление заявки</DialogTitle>
          <DialogDescription>Менеджер свяжется в течение 15 минут</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-md border border-border bg-muted/40 p-3 text-sm space-y-1.5 max-h-40 overflow-y-auto">
            {items.map((i, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{i.name} × {i.qty}</span>
                <span className="font-medium">{formatRub(i.qty * i.price)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t border-border font-semibold">
              <span>Итого</span><span className="text-brand">{formatRub(total)}</span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><Label>Имя*</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={120} required /></div>
            <div><Label>Телефон*</Label><Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={30} required /></div>
          </div>
          <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={200} /></div>
          <div><Label>Адрес объекта</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} maxLength={500} /></div>
          <div><Label>Комментарий</Label><Textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} maxLength={2000} rows={3} /></div>
          <Button type="submit" size="lg" disabled={loading} className="w-full bg-brand hover:bg-brand/90 text-brand-foreground">
            {loading ? "Отправляем..." : "Отправить заявку"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных</p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
