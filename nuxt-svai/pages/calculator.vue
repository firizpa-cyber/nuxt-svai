<template>
  <div class="container mx-auto px-4 py-12 lg:py-16">
    <div class="max-w-2xl">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.42_0.16_25)]/10 text-brand text-xs font-semibold uppercase tracking-wider">
        <CalcIcon class="h-3.5 w-3.5" /> Калькулятор
      </div>
      <h1 class="mt-3 font-display text-4xl lg:text-5xl font-bold">Рассчитайте свой фундамент</h1>
      <p class="mt-3 text-[oklch(0.45_0.02_50)]">
        Подберите сваи нужного диаметра и длины, укажите количество — мы рассчитаем точную стоимость материалов и монтажа.
      </p>
    </div>

    <div class="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
      <!-- Left: item builder -->
      <div class="space-y-4">
        <!-- Add pile selector -->
        <div class="rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)] p-5">
          <label class="text-sm font-semibold">Добавить сваю в расчёт</label>
          <select
            v-model="selectedProductId"
            @change="addItem"
            class="mt-2 w-full rounded-md border border-[oklch(0.85_0.02_70)] px-3 py-2 text-sm bg-[oklch(0.97_0.01_80)] focus:outline-none focus:border-[oklch(0.42_0.16_25)]"
          >
            <option value="">Выберите тип сваи...</option>
            <option v-for="p in products" :key="p.id" :value="p.id">
              Ø {{ p.diameter_mm }} мм × {{ p.length_m }} м — {{ formatRub(p.price) }}
            </option>
          </select>
        </div>

        <!-- Empty state -->
        <div v-if="cart.length === 0" class="rounded-lg border-2 border-dashed border-[oklch(0.85_0.02_70)] p-10 text-center text-[oklch(0.45_0.02_50)]">
          Добавьте сваи из списка выше, чтобы рассчитать стоимость
        </div>

        <!-- Cart items -->
        <div
          v-for="item in detailedItems"
          :key="item.product_id"
          class="rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)] p-5 hover:border-[oklch(0.42_0.16_25)] transition"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-4 min-w-0">
              <div class="h-14 w-14 rounded bg-gradient-to-br from-[oklch(0.42_0.16_25)] to-[oklch(0.42_0.16_25)]/60 grid place-items-center text-[oklch(0.98_0.01_80)] font-bold shrink-0">
                {{ item.product.diameter_mm }}
              </div>
              <div class="min-w-0">
                <div class="font-display font-semibold truncate">{{ item.product.name }}</div>
                <div class="text-xs text-[oklch(0.45_0.02_50)]">
                  Свая {{ formatRub(item.product.price) }} + монтаж {{ formatRub(item.product.install_price) }}
                </div>
              </div>
            </div>
            <button @click="removeItem(item.product_id)" class="text-[oklch(0.45_0.02_50)] hover:text-red-600 p-1" aria-label="Удалить">
              <Trash2Icon class="h-4 w-4" />
            </button>
          </div>
          <div class="mt-4 flex items-center justify-between gap-4 flex-wrap">
            <div class="flex items-center gap-2">
              <button
                @click="updateQty(item.product_id, -1)"
                class="h-9 w-9 rounded-md border border-[oklch(0.85_0.02_70)] flex items-center justify-center hover:border-[oklch(0.42_0.16_25)] transition"
              >
                <MinusIcon class="h-4 w-4" />
              </button>
              <input
                type="number"
                min="1"
                max="9999"
                :value="item.qty"
                @input="setQty(item.product_id, parseInt(($event.target as HTMLInputElement).value) || 1)"
                class="w-20 text-center rounded-md border border-[oklch(0.85_0.02_70)] px-2 py-2 text-sm focus:outline-none focus:border-[oklch(0.42_0.16_25)]"
              />
              <button
                @click="updateQty(item.product_id, 1)"
                class="h-9 w-9 rounded-md border border-[oklch(0.85_0.02_70)] flex items-center justify-center hover:border-[oklch(0.42_0.16_25)] transition"
              >
                <PlusIcon class="h-4 w-4" />
              </button>
              <span class="text-sm text-[oklch(0.45_0.02_50)]">шт</span>
            </div>
            <div class="font-display text-xl font-bold text-brand">{{ formatRub(item.lineTotal) }}</div>
          </div>
        </div>
      </div>

      <!-- Right: summary sidebar -->
      <aside class="lg:sticky lg:top-24 lg:self-start">
        <div class="rounded-lg border-2 border-[oklch(0.42_0.16_25)]/20 bg-[oklch(0.99_0.005_80)] p-6 shadow-elevated">
          <div class="font-display text-xl font-bold">Итого</div>
          <div class="mt-4 space-y-2.5 text-sm">
            <div class="flex justify-between">
              <span class="text-[oklch(0.45_0.02_50)]">Количество свай</span>
              <span class="font-semibold">{{ totalQty }} шт</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[oklch(0.45_0.02_50)]">Стоимость свай</span>
              <span class="font-semibold">{{ formatRub(totalPiles) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[oklch(0.45_0.02_50)]">Монтаж</span>
              <span class="font-semibold">{{ formatRub(totalInstall) }}</span>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-[oklch(0.85_0.02_70)] flex justify-between items-end">
            <span class="text-sm text-[oklch(0.45_0.02_50)]">К оплате</span>
            <span class="font-display text-3xl font-bold text-brand">{{ formatRub(grandTotal) }}</span>
          </div>
          <button
            :disabled="cart.length === 0"
            @click="orderDialogOpen = true"
            class="w-full mt-5 flex items-center justify-center gap-2 h-12 text-sm font-semibold rounded-md bg-[oklch(0.42_0.16_25)] hover:bg-[oklch(0.42_0.16_25)]/90 text-[oklch(0.98_0.01_80)] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ShoppingCartIcon class="h-4 w-4" /> Оформить заявку
          </button>
          <p class="text-xs text-[oklch(0.45_0.02_50)] text-center mt-3">
            Окончательная цена согласуется после бесплатного выезда замерщика
          </p>
        </div>
      </aside>
    </div>

    <!-- Order Dialog -->
    <OrderDialog
      v-if="orderDialogOpen"
      :items="orderItems"
      :total="grandTotal"
      @close="orderDialogOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import {
  Calculator as CalcIcon,
  Minus as MinusIcon,
  Plus as PlusIcon,
  Trash2 as Trash2Icon,
  ShoppingCart as ShoppingCartIcon,
} from 'lucide-vue-next'
import { formatRub } from '~/utils/format'

useSeoMeta({
  title: 'Калькулятор стоимости свайного фундамента онлайн — Сургут | СтройМонтаж-86',
  description: 'Рассчитайте стоимость свайного фундамента онлайн за 1 минуту. Подберите сваи нужного диаметра и длины, укажите количество — получите точную смету.',
  keywords: 'калькулятор свайного фундамента, расчёт стоимости свай Сургут, сколько стоит фундамент на сваях, онлайн калькулятор фундамент',
  ogTitle: 'Калькулятор стоимости свайного фундамента — Сургут',
  ogDescription: 'Рассчитайте сваи и монтаж онлайн за 1 минуту.',
})

const route = useRoute()
const { data } = await useFetch('/api/products')
const products = computed(() => data.value?.products || [])

// Local cart state for calculator
interface CalcItem {
  product_id: string
  qty: number
}

const calcCart = ref<CalcItem[]>([])
const selectedProductId = ref('')
const orderDialogOpen = ref(false)

// Pre-select from URL param ?d=89
onMounted(() => {
  const d = Number(route.query.d)
  if (d) {
    const p = products.value.find((x: any) => x.diameter_mm === d)
    if (p) calcCart.value = [{ product_id: p.id, qty: 10 }]
  } else if (products.value.length > 1) {
    calcCart.value = [{ product_id: products.value[1].id, qty: 10 }]
  }
})

const addItem = () => {
  if (!selectedProductId.value) return
  const exists = calcCart.value.find((i) => i.product_id === selectedProductId.value)
  if (!exists) calcCart.value.push({ product_id: selectedProductId.value, qty: 1 })
  selectedProductId.value = ''
}

const updateQty = (productId: string, delta: number) => {
  const item = calcCart.value.find((i) => i.product_id === productId)
  if (item) item.qty = Math.max(1, item.qty + delta)
}

const setQty = (productId: string, qty: number) => {
  const item = calcCart.value.find((i) => i.product_id === productId)
  if (item) item.qty = Math.max(1, qty)
}

const removeItem = (productId: string) => {
  calcCart.value = calcCart.value.filter((i) => i.product_id !== productId)
}

const detailedItems = computed(() =>
  calcCart.value
    .map((i) => {
      const p = products.value.find((x: any) => x.id === i.product_id)
      if (!p) return null
      return {
        ...i,
        product: p,
        lineTotal: i.qty * (Number(p.price) + Number(p.install_price)),
      }
    })
    .filter(Boolean) as any[]
)

const cart = calcCart

const totalPiles = computed(() =>
  detailedItems.value.reduce((s, i) => s + i.qty * Number(i.product.price), 0)
)
const totalInstall = computed(() =>
  detailedItems.value.reduce((s, i) => s + i.qty * Number(i.product.install_price), 0)
)
const totalQty = computed(() => detailedItems.value.reduce((s, i) => s + i.qty, 0))
const grandTotal = computed(() => totalPiles.value + totalInstall.value)

const orderItems = computed(() =>
  detailedItems.value.flatMap((d) => [
    { product_id: d.product.id, name: d.product.name, qty: d.qty, price: Number(d.product.price) },
    { name: `Монтаж: ${d.product.name}`, qty: d.qty, price: Number(d.product.install_price) },
  ])
)
</script>
