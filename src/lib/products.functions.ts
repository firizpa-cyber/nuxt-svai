import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { readFileSync } from "fs";
import { join } from "path";

export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const csvPath = join(process.cwd(), "src", "db", "price-list.csv");
    const csvContent = readFileSync(csvPath, "utf-8");
    const lines = csvContent.split("\n").filter(line => line.trim());
    const headers = lines[0].split(",");
    
    const products = lines.slice(1).map((line, idx) => {
      const values = line.split(",");
      const name = values[0] || "";
      // Generate slug from name (transliterate and lowercase)
      const slug = name
        .toLowerCase()
        .replace(/[^a-zа-яё0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[а-яё]/g, (c) => {
          const map: Record<string, string> = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
            'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
            'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
            'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
          };
          return map[c] || c;
        });
      
      return {
        id: crypto.randomUUID(),
        name,
        slug: slug || `product-${idx}`,
        diameter_mm: Number(values[1]) || 0,
        length_m: Number(values[2]) || 0,
        wall_thickness_mm: Number(values[3]) || 0,
        price: Number(values[4]) || 0,
        install_price: Number(values[5]) || 0,
        category: values[6] || "Стандарт",
        in_stock: true,
        image_url: "",
        description: "",
      };
    }).filter(p => p.name);
    
    return { products };
  } catch (error) {
    console.error("Error reading CSV:", error);
    return { products: [] };
  }
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
