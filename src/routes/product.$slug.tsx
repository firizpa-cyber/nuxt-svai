import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { listProducts } from "@/lib/products.functions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatRub } from "@/lib/format";
import { ArrowLeft, ShoppingCart, Plus, Minus, Package } from "lucide-react";
import { toast } from "sonner";

const productsQO = queryOptions({ queryKey: ["products"], queryFn: () => listProducts() });

export const Route = createFileRoute("/product/$slug")({
  head: () => ({
    meta: [
      { title: "Товар — Завод винтовых свай" },
      { name: "description", content: "Подробная информация о товаре" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQO),
  component: ProductPage,
});

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
];

function ProductPage() {
  const { data } = useSuspenseQuery(productsQO);
  const { slug } = Route.useParams();
  const products = data.products;
  const product = products.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <Package className="h-16 w-16 mx-auto text-muted-foreground" />
        <h1 className="mt-4 font-display text-2xl font-bold">Товар не найден</h1>
        <Link to={"/catalog" as any}>
          <Button className="mt-4">Вернуться в каталог</Button>
        </Link>
      </div>
    );
  }

  const totalPrice = quantity * Number(product!.price);
  const totalWithInstall = quantity * (Number(product!.price) + Number(product!.install_price));
  const photoIndex = products.indexOf(product!) % GALLERY_PHOTOS.length;
  const imageUrl = product!.image_url || `/gallery/${GALLERY_PHOTOS[photoIndex]}`;

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16 max-w-6xl">
      <Link to={"/catalog" as any} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Вернуться в каталог
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className="aspect-square rounded-2xl overflow-hidden border border-border bg-muted">
          <img
            src={imageUrl}
            alt={product!.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{product!.category}</span>
            <h1 className="mt-2 font-display text-3xl lg:text-4xl font-bold">{product!.name}</h1>
          </div>

          {product!.diameter_mm > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground">Диаметр</div>
                <div className="font-display text-xl font-bold mt-1">Ø {product!.diameter_mm} мм</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground">Длина</div>
                <div className="font-display text-xl font-bold mt-1">{product!.length_m} м</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground">Стенка</div>
                <div className="font-display text-xl font-bold mt-1">{product!.wall_thickness_mm} мм</div>
              </div>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Цена за единицу</span>
              <span className="font-display text-2xl font-bold text-brand">{formatRub(Number(product!.price))}</span>
            </div>
            {product!.install_price > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Монтаж за единицу</span>
                <span className="font-display text-xl font-semibold">{formatRub(Number(product!.install_price))}</span>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Label className="text-sm font-semibold">Количество</Label>
            <div className="mt-2 flex items-center gap-3">
              <Button size="icon" variant="outline" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min={1}
                max={9999}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 text-center"
              />
              <Button size="icon" variant="outline" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-8 space-y-4 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Итого за товар</span>
              <span className="font-display text-2xl font-bold">{formatRub(totalPrice)}</span>
            </div>
            {product.install_price > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">С монтажом</span>
                <span className="font-display text-2xl font-bold text-brand">{formatRub(totalWithInstall)}</span>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-3">
            <Button
              size="lg"
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                const existingItem = cart.find((item: any) => item.product_id === product!.id);
                
                if (existingItem) {
                  existingItem.qty += quantity;
                } else {
                  cart.push({
                    product_id: product!.id,
                    name: product!.name,
                    price: Number(product!.price),
                    install_price: Number(product!.install_price),
                    qty: quantity,
                  });
                }
                
                localStorage.setItem("cart", JSON.stringify(cart));
                window.dispatchEvent(new Event("cart-updated"));
                toast.success(`Добавлено в корзину: ${product!.name} × ${quantity}`);
              }}
              className="w-full bg-brand hover:bg-brand/90 text-brand-foreground h-12 gap-2"
            >
              <ShoppingCart className="h-5 w-5" /> Добавить в корзину
            </Button>
            <a href={`/calculator?d=${product!.diameter_mm}`}>
              <Button size="lg" variant="outline" className="w-full h-12">
                Рассчитать стоимость
              </Button>
            </a>
          </div>

          {product!.description && (
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-semibold mb-2">Описание</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product!.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
