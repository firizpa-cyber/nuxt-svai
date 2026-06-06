import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listMyOrders, checkIsAdmin } from "@/lib/orders.functions";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatRub, STATUS_LABEL, STATUS_COLOR } from "@/lib/format";
import { Package, LogOut, Settings, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/orders")({
  head: () => ({ meta: [{ title: "Мои заказы — Личный кабинет" }] }),
  component: OrdersPage,
});

function OrdersPage() {
  const fetchOrders = useServerFn(listMyOrders);
  const fetchAdmin = useServerFn(checkIsAdmin);
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { user } = Route.useRouteContext() as { user: { id: string; email?: string } };

  const ordersQ = useQuery({ queryKey: ["my-orders"], queryFn: () => fetchOrders() });
  const adminQ = useQuery({ queryKey: ["is-admin"], queryFn: () => fetchAdmin() });

  useEffect(() => {
    const channel = supabase
      .channel("orders-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders", filter: `user_id=eq.${user.id}` }, () => {
        qc.invalidateQueries({ queryKey: ["my-orders"] });
        toast.info("Статус заказа обновлён");
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user.id, qc]);

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Личный кабинет</span>
          <h1 className="mt-2 font-display text-3xl lg:text-4xl font-bold">Мои заказы</h1>
          <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
        </div>
        <div className="flex gap-2">
          {adminQ.data?.isAdmin && (
            <Link to="/admin"><Button variant="outline" className="gap-2"><Settings className="h-4 w-4" /> Админка</Button></Link>
          )}
          <Button variant="outline" onClick={signOut} className="gap-2"><LogOut className="h-4 w-4" /> Выйти</Button>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {ordersQ.isLoading && <div className="text-muted-foreground">Загрузка...</div>}
        {ordersQ.data?.orders.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground" />
            <div className="mt-3 font-display text-lg font-semibold">Заказов пока нет</div>
            <p className="text-sm text-muted-foreground mt-1">Перейдите в каталог или калькулятор для оформления первого заказа.</p>
            <Link to="/catalog"><Button className="mt-4 bg-brand hover:bg-brand/90 text-brand-foreground">В каталог</Button></Link>
          </div>
        )}
        {ordersQ.data?.orders.map((o) => (
          <div key={o.id} className="rounded-lg border border-border bg-card p-5 hover:border-brand transition">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display text-xl font-bold">Заказ №{o.order_number}</span>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLOR[o.status]}`}>
                    {STATUS_LABEL[o.status]}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {new Date(o.created_at).toLocaleString("ru-RU")}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Сумма</div>
                <div className="font-display text-2xl font-bold text-brand">{formatRub(Number(o.total))}</div>
              </div>
            </div>
            {o.status_note && (
              <div className="mt-3 p-3 rounded bg-muted text-sm">
                <span className="font-semibold">Комментарий менеджера: </span>{o.status_note}
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Состав</div>
              <div className="space-y-1 text-sm">
                {(o.items as Array<{ name: string; qty: number; price: number }>).map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{it.name} × {it.qty}</span>
                    <span className="font-medium">{formatRub(it.qty * it.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
