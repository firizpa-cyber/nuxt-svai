import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("diameter_mm", { ascending: true })
    .order("length_m", { ascending: true });
  if (error) throw new Error(error.message);
  return { products: data ?? [] };
});

const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  diameter_mm: z.number().int().min(20).max(500),
  length_m: z.number().min(0.5).max(20),
  wall_thickness_mm: z.number().min(1).max(20),
  coating: z.string().max(200).optional(),
  price: z.number().min(0).max(10_000_000),
  install_price: z.number().min(0).max(10_000_000),
  description: z.string().max(2000).optional(),
  image_url: z.string().url().max(500).optional().or(z.literal("")),
  category: z.string().max(50).optional(),
  in_stock: z.boolean().optional(),
});

export const upsertProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => productSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { data: roles } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId);
    if (!roles?.some((r) => r.role === "admin")) throw new Error("Доступ запрещён");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const payload = { ...data, image_url: data.image_url || null };
    const { data: row, error } = data.id
      ? await supabaseAdmin.from("products").update(payload).eq("id", data.id).select().single()
      : await supabaseAdmin.from("products").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return { product: row };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: roles } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId);
    if (!roles?.some((r) => r.role === "admin")) throw new Error("Доступ запрещён");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
