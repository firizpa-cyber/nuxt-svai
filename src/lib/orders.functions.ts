import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const itemSchema = z.object({
  product_id: z.string().uuid().optional(),
  name: z.string().min(1).max(200),
  qty: z.number().int().min(1).max(10000),
  price: z.number().min(0).max(10_000_000),
});

const createOrderSchema = z.object({
  contact_name: z.string().trim().min(2).max(120),
  contact_phone: z.string().trim().min(5).max(30),
  contact_email: z.string().trim().email().max(200).optional().or(z.literal("")),
  address: z.string().trim().max(500).optional(),
  comment: z.string().trim().max(2000).optional(),
  items: z.array(itemSchema).min(1).max(100),
});

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => createOrderSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { getRequestHeader } = await import("@tanstack/react-start/server");

    // Optional user identification via bearer token
    let userId: string | null = null;
    try {
      const auth = getRequestHeader("authorization");
      if (auth?.startsWith("Bearer ")) {
        const token = auth.slice(7);
        const { data: claims } = await supabaseAdmin.auth.getClaims(token);
        userId = claims?.claims?.sub ?? null;
      }
    } catch { /* anon order */ }

    const total = data.items.reduce((sum, i) => sum + i.qty * i.price, 0);
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: userId,
        contact_name: data.contact_name,
        contact_phone: data.contact_phone,
        contact_email: data.contact_email || null,
        address: data.address || null,
        comment: data.comment || null,
        items: data.items,
        total,
        status: "new",
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    // Log notification (will be wired to email once domain is configured)
    console.log("[ORDER] New order #" + order.order_number, {
      total,
      contact: data.contact_phone,
      items: data.items.length,
    });

    return { order };
  });

export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("orders")
      .select("*")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { orders: data ?? [] };
  });

export const listAllOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: roles } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId);
    if (!roles?.some((r) => r.role === "admin")) throw new Error("Доступ запрещён");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { orders: data ?? [] };
  });

export const updateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      id: z.string().uuid(),
      status: z.enum(["new", "processing", "in_progress", "completed", "cancelled"]),
      status_note: z.string().max(500).optional(),
    }).parse(d)
  )
  .handler(async ({ data, context }) => {
    const { data: roles } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId);
    if (!roles?.some((r) => r.role === "admin")) throw new Error("Доступ запрещён");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status: data.status, status_note: data.status_note ?? null })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId);
    return { isAdmin: data?.some((r) => r.role === "admin") ?? false };
  });
