import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Вход и регистрация — Завод винтовых свай" },
      { name: "description", content: "Войдите в личный кабинет, чтобы отслеживать заказы в реальном времени." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/orders" });
    });
  }, [navigate]);

  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/orders" });
    if (result.error) { toast.error("Ошибка входа через Google"); setLoading(false); return; }
    if (result.redirected) return;
    navigate({ to: "/orders" });
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="font-display text-3xl font-bold text-center">Личный кабинет</h1>
      <p className="text-center text-muted-foreground mt-2 text-sm">Отслеживайте статус заказов в реальном времени</p>

      <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-card">
        <Button onClick={handleGoogle} disabled={loading} variant="outline" className="w-full h-11 gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Войти через Google
        </Button>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">или email</span></div>
        </div>

        <Tabs defaultValue="login">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="signup">Регистрация</TabsTrigger>
          </TabsList>
          <TabsContent value="login"><LoginForm onDone={() => navigate({ to: "/orders" })} /></TabsContent>
          <TabsContent value="signup"><SignupForm onDone={() => navigate({ to: "/orders" })} /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function LoginForm({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message === "Invalid login credentials" ? "Неверный email или пароль" : error.message);
    toast.success("Добро пожаловать!");
    onDone();
  }
  return (
    <form onSubmit={submit} className="space-y-3 mt-4">
      <div><Label>Email</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <div><Label>Пароль</Label><Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
      <Button type="submit" disabled={loading} className="w-full bg-brand hover:bg-brand/90 text-brand-foreground">Войти</Button>
    </form>
  );
}

function SignupForm({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [name, setName] = useState(""); const [phone, setPhone] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: window.location.origin + "/orders", data: { full_name: name, phone } },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Аккаунт создан! Проверьте email для подтверждения.");
    onDone();
  }
  return (
    <form onSubmit={submit} className="space-y-3 mt-4">
      <div><Label>Имя</Label><Input required value={name} onChange={(e) => setName(e.target.value)} /></div>
      <div><Label>Телефон</Label><Input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
      <div><Label>Email</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <div><Label>Пароль</Label><Input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
      <Button type="submit" disabled={loading} className="w-full bg-brand hover:bg-brand/90 text-brand-foreground">Создать аккаунт</Button>
    </form>
  );
}
