import { Link, useRouterState } from "@tanstack/react-router";
import { Phone, Menu, X, User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import type { Session } from "@supabase/supabase-js";

const NAV = [
  { to: "/", label: "Главная" },
  { to: "/catalog", label: "Каталог" },
  { to: "/calculator", label: "Калькулятор" },
  { to: "/about", label: "О компании" },
  { to: "/contacts", label: "Контакты" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="h-1 bg-gradient-to-r from-brand via-gold to-brand" />
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 rounded bg-brand grid place-items-center text-brand-foreground shadow-card">
            <span className="font-display text-xl font-bold">З</span>
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rotate-45 bg-gold" />
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-base font-bold leading-tight">Завод винтовых свай</div>
            <div className="text-[11px] text-muted-foreground uppercase tracking-wider">ХМАО · Сургут</div>
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
