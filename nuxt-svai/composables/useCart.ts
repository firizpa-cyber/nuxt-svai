export interface CartItem {
  product_id: string
  name: string
  price: number
  install_price: number
  qty: number
}

export function useCart() {
  const cart = ref<CartItem[]>([])

  const load = () => {
    if (import.meta.client) {
      cart.value = JSON.parse(localStorage.getItem('cart') || '[]')
    }
  }

  const save = () => {
    if (import.meta.client) {
      localStorage.setItem('cart', JSON.stringify(cart.value))
      window.dispatchEvent(new Event('cart-updated'))
    }
  }

  const addItem = (item: CartItem) => {
    const existing = cart.value.find((i) => i.product_id === item.product_id)
    if (existing) {
      existing.qty += item.qty
    } else {
      cart.value.push({ ...item })
    }
    save()
  }

  const updateQty = (productId: string, delta: number) => {
    const item = cart.value.find((i) => i.product_id === productId)
    if (item) item.qty = Math.max(1, item.qty + delta)
    save()
  }

  const setQty = (productId: string, qty: number) => {
    const item = cart.value.find((i) => i.product_id === productId)
    if (item) item.qty = Math.max(1, qty)
    save()
  }

  const remove = (productId: string) => {
    cart.value = cart.value.filter((i) => i.product_id !== productId)
    save()
  }

  const clear = () => {
    cart.value = []
    save()
  }

  const totalQty = computed(() => cart.value.reduce((s, i) => s + i.qty, 0))
  const totalPiles = computed(() => cart.value.reduce((s, i) => s + i.qty * i.price, 0))
  const totalInstall = computed(() => cart.value.reduce((s, i) => s + i.qty * i.install_price, 0))
  const grandTotal = computed(() => totalPiles.value + totalInstall.value)

  onMounted(load)

  return { cart, addItem, updateQty, setQty, remove, clear, totalQty, totalPiles, totalInstall, grandTotal }
}
