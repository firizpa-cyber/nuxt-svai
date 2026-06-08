import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listAllOrders, updateOrderStatus, checkIsAdmin } from "@/lib/orders.functions";
import { listProducts, upsertProduct, deleteProduct } from "@/lib/products.functions";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatRub, STATUS_LABEL, STATUS_COLOR } from "@/lib/format";
import { Plus, Pencil, Trash2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Админка — Завод винтовых свай" }] }),
  component: AdminPage,
});

function AdminPage() {
  const checkAdmin = useServerFn(checkIsAdmin);
  const navigate = useNavigate();
  const { data: adminCheck, isLoading } = useQuery({ queryKey: ["is-admin"], queryFn: () => checkAdmin() });

  if (isLoading) return <div className="container mx-auto p-12 text-muted-foreground">Проверка прав...</div>;
  if (!adminCheck?.isAdmin)
    return (
      <div className="container mx-auto px-4 py-20 max-w-md text-center">
        <ShieldAlert className="h-12 w-12 mx-auto text-destructive" />
        <h1 className="font-display text-2xl font-bold mt-4">Доступ запрещён</h1>
        <p className="text-muted-foreground mt-2">Раздел доступен только администраторам.</p>
        <Button className="mt-4" onClick={() => navigate({ to: "/orders" })}>Назад</Button>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="font-display text-3xl lg:text-4xl font-bold">Админ-панель</h1>
      <Tabs defaultValue="orders" className="mt-8">
        <TabsList>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="products">Товары</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="mt-6"><OrdersAdmin /></TabsContent>
        <TabsContent value="products" className="mt-6"><ProductsAdmin /></TabsContent>
      </Tabs>
    </div>
  );
}

function OrdersAdmin() {
  const fetchAll = useServerFn(listAllOrders);
  const updateStatus = useServerFn(updateOrderStatus);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["all-orders"], queryFn: () => fetchAll() });

  async function setStatus(id: string, status: string) {
    try {
      await updateStatus({ data: { id, status: status as "new" } });
      toast.success("Статус обновлён");
    } catch (e) { toast.error(e instanceof Error ? e.message : "Ошибка"); }
  }

  return (
    <div className="space-y-3">
      {q.data?.orders.length === 0 && <div className="text-muted-foreground">Заказов пока нет</div>}
      {q.data?.orders.map((o) => (
        <div key={o.id} className="rounded-lg border border-border bg-card p-4">
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display text-lg font-bold">№{o.order_number}</span>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLOR[o.status]}`}>{STATUS_LABEL[o.status]}</span>
              </div>
              <div className="text-sm mt-1">{o.contact_name} · <a href={`tel:${o.contact_phone}`} className="text-brand">{o.contact_phone}</a></div>
              {o.contact_email && <div className="text-xs text-muted-foreground">{o.contact_email}</div>}
              {o.address && <div className="text-xs text-muted-foreground mt-1">📍 {o.address}</div>}
              {o.comment && <div className="text-xs text-muted-foreground mt-1">💬 {o.comment}</div>}
              <div className="text-xs text-muted-foreground mt-1">{new Date(o.created_at).toLocaleString("ru-RU")}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-xl font-bold text-brand">{formatRub(Number(o.total))}</div>
              <Select value={o.status} onValueChange={(v) => setStatus(o.id, v)}>
                <SelectTrigger className="mt-2 w-44"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_LABEL).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <details className="mt-3">
            <summary className="text-sm text-muted-foreground cursor-pointer">Состав ({(o.items as unknown[]).length})</summary>
            <div className="mt-2 text-sm space-y-1">
              {(o.items as Array<{ name: string; qty: number; price: number }>).map((it, i) => (
                <div key={i} className="flex justify-between">
                  <span>{it.name} × {it.qty}</span><span>{formatRub(it.qty * it.price)}</span>
                </div>
              ))}
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}

function ProductsAdmin() {
  const fetch = useServerFn(listProducts);
  const upsert = useServerFn(upsertProduct);
  const del = useServerFn(deleteProduct);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["products"], queryFn: () => fetch() });
  const [editing, setEditing] = useState<null | { id?: string; name: string; slug: string; diameter_mm: number; length_m: number; wall_thickness_mm: number; price: number; install_price: number; description: string; image_url: string; category: string; in_stock: boolean }>(null);

  const blank = () => ({ name: "", slug: "", diameter_mm: 89, length_m: 2.5, wall_thickness_mm: 4, price: 2000, install_price: 900, description: "", image_url: "", category: "standard", in_stock: true });

  async function save() {
    if (!editing) return;
    try {
      await upsert({ data: { ...editing, description: editing.description || undefined, image_url: editing.image_url || undefined } });
      toast.success("Сохранено");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["products"] });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Ошибка"); }
  }

  async function remove(id: string) {
    if (!confirm("Удалить товар?")) return;
    try {
      await del({ data: { id } });
      toast.success("Удалено");
      qc.invalidateQueries({ queryKey: ["products"] });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Ошибка"); }
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing(blank())} className="bg-brand hover:bg-brand/90 text-brand-foreground gap-2"><Plus className="h-4 w-4" /> Добавить товар</Button>
          </DialogTrigger>
          {editing && (
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editing.id ? "Редактирование" : "Новый товар"}</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Название</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
                <div><Label>Slug (латиница, дефис)</Label><Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value.toLowerCase() })} /></div>
                <div className="grid grid-cols-3 gap-3">
                  <div><Label>Ø, мм</Label><Input type="number" value={editing.diameter_mm} onChange={(e) => setEditing({ ...editing, diameter_mm: +e.target.value })} /></div>
                  <div><Label>Длина, м</Label><Input type="number" step="0.1" value={editing.length_m} onChange={(e) => setEditing({ ...editing, length_m: +e.target.value })} /></div>
                  <div><Label>Стенка, мм</Label><Input type="number" step="0.1" value={editing.wall_thickness_mm} onChange={(e) => setEditing({ ...editing, wall_thickness_mm: +e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Цена сваи</Label><Input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: +e.target.value })} /></div>
                  <div><Label>Цена монтажа</Label><Input type="number" value={editing.install_price} onChange={(e) => setEditing({ ...editing, install_price: +e.target.value })} /></div>
                </div>
                <div><Label>Категория</Label>
                  <Select value={editing.category} onValueChange={(v) => setEditing({ ...editing, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Лёгкие</SelectItem>
                      <SelectItem value="standard">Стандартные</SelectItem>
                      <SelectItem value="heavy">Усиленные</SelectItem>
                      <SelectItem value="industrial">Промышленные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Описание</Label><Textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
                <div><Label>URL фото</Label><Input value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} placeholder="https://..." /></div>
                <Button onClick={save} className="w-full bg-brand hover:bg-brand/90 text-brand-foreground">Сохранить</Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {q.data?.products.map((p) => (
          <div key={p.id} className="rounded-lg border border-border bg-card p-4 flex justify-between gap-3">
            <div>
              <div className="font-display font-bold">{p.name}</div>
              <div className="text-xs text-muted-foreground">Ø{p.diameter_mm}×{p.length_m}м · стенка {p.wall_thickness_mm}мм</div>
              <div className="text-sm mt-1 text-brand font-semibold">{formatRub(Number(p.price))} + монтаж {formatRub(Number(p.install_price))}</div>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="outline" onClick={() => setEditing({
                id: p.id, name: p.name, slug: p.slug, diameter_mm: p.diameter_mm, length_m: Number(p.length_m),
                wall_thickness_mm: Number(p.wall_thickness_mm), price: Number(p.price), install_price: Number(p.install_price),
                description: p.description ?? "", image_url: p.image_url ?? "", category: p.category ?? "standard", in_stock: p.in_stock,
              })}><Pencil className="h-4 w-4" /></Button>
              <Button size="icon" variant="outline" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
