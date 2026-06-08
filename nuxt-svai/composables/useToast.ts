interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'default'
}

const toasts = ref<Toast[]>([])

export function useToast() {
  const show = (message: string, type: Toast['type'] = 'default') => {
    const id = crypto.randomUUID()
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, 4000)
  }

  return {
    toasts: readonly(toasts),
    success: (msg: string) => show(msg, 'success'),
    error: (msg: string) => show(msg, 'error'),
    info: (msg: string) => show(msg, 'default'),
  }
}
