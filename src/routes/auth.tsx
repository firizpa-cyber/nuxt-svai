import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Вход — Завод винтовых свай" },
      { name: "description", content: "Войдите в личный кабинет, чтобы отслеживать заказы в реальном времени." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    if (session) navigate({ to: "/orders" });
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="font-display text-3xl font-bold text-center">Личный кабинет</h1>
      <p className="text-center text-muted-foreground mt-2 text-sm">Отслеживайте статус заказов в реальном времени</p>

      <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-card">
        <LoginForm onDone={() => navigate({ to: "/orders" })} />
      </div>
    </div>
  );
}

function LoginForm({ onDone }: { onDone: () => void }) {
  const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false);
  
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    
    // Простая проверка логина и пароля (хранятся в коде)
    const validCredentials = [
      { username: "admin", password: "admin123" },
      { username: "manager", password: "manager123" },
    ];
    
    const isValid = validCredentials.some(cred => cred.username === username && cred.password === password);
    
    if (isValid) {
      localStorage.setItem("admin_session", username);
      toast.success("Добро пожаловать!");
      onDone();
    } else {
      toast.error("Неверный логин или пароль");
    }
    
    setLoading(false);
  }
  
  return (
    <form onSubmit={submit} className="space-y-4 mt-4">
      <div><Label>Логин</Label><Input required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" /></div>
      <div><Label>Пароль</Label><Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="admin123" /></div>
      <Button type="submit" disabled={loading} className="w-full bg-brand hover:bg-brand/90 text-brand-foreground">Войти</Button>
      <p className="text-xs text-muted-foreground text-center">
        Демо: admin / admin123 или manager / manager123
      </p>
    </form>
  );
}
