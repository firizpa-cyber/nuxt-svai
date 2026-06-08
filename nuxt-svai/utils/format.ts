export const formatRub = (n: number): string =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(n)

export const STATUS_LABEL: Record<string, string> = {
  new: 'Новый',
  processing: 'В обработке',
  in_progress: 'Монтаж',
  completed: 'Выполнен',
  cancelled: 'Отменён',
}

export const STATUS_COLOR: Record<string, string> = {
  new: 'bg-yellow-100 text-yellow-900 border-yellow-300',
  processing: 'bg-blue-100 text-blue-900 border-blue-300',
  in_progress: 'bg-red-50 text-red-800 border-red-200',
  completed: 'bg-green-100 text-green-900 border-green-300',
  cancelled: 'bg-gray-100 text-gray-600 border-gray-300',
}
