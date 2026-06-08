import { Link, useRouterState } from "@tanstack/react-router";
import { Phone, Menu, X, User, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Главная" },
  { to: "/catalog", label: "Каталог" },
  { to: "/prices", label: "Цены" },
  { to: "/calculator", label: "Калькулятор" },
  { to: "/about", label: "О компании" },
  { to: "/contacts", label: "Контакты" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    setSession(session);
  }, [pathname]);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = cart.reduce((sum: number, item: any) => sum + item.qty, 0);
      setCartCount(count);
    };
    
    updateCartCount();
    
    const handleStorageChange = () => updateCartCount();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cart-updated", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cart-updated", handleStorageChange);
    };
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="h-1 bg-gradient-to-r from-brand via-gold to-brand" />
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <img src="/logo.png" alt="Завод винтовых свай" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Завод винтовых свай · Сургут</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-brand transition-colors relative"
              activeProps={{ className: "text-brand" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+79992568800"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand"
          >
            <Phone className="h-4 w-4" />
            +7 999 256-88-00
          </a>
          <Link to={"/cart" as any}>
            <Button variant="outline" size="sm" className="gap-1.5 relative">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Корзина</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-brand text-brand-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to={session ? "/orders" : "/auth"}>
            <Button variant="outline" size="sm" className="gap-1.5">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{session ? "Кабинет" : "Войти"}</span>
            </Button>
          </Link>
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="py-2.5 px-3 rounded text-sm font-medium hover:bg-muted"
                activeProps={{ className: "text-brand bg-muted" }}
              >
                {item.label}
              </Link>
            ))}
            <a href="tel:+79992568800" className="py-2.5 px-3 rounded text-sm font-semibold flex items-center gap-2 text-brand">
              <Phone className="h-4 w-4" /> +7 999 256-88-00
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
