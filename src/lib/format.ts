export const formatRub = (n: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n);

export const STATUS_LABEL: Record<string, string> = {
  new: "Новый",
  processing: "В обработке",
  in_progress: "Монтаж",
  completed: "Выполнен",
  cancelled: "Отменён",
};

export const STATUS_COLOR: Record<string, string> = {
  new: "bg-gold/20 text-gold-foreground border-gold/40 text-foreground",
  processing: "bg-blue-100 text-blue-900 border-blue-300",
  in_progress: "bg-brand/15 text-brand border-brand/30",
  completed: "bg-forest/15 text-forest border-forest/30",
  cancelled: "bg-muted text-muted-foreground border-border",
};
