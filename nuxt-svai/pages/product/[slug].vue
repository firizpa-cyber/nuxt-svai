<template>
  <div class="container mx-auto px-4 py-12 lg:py-16 max-w-6xl">
    <NuxtLink to="/catalog" class="inline-flex items-center gap-2 text-sm text-[oklch(0.45_0.02_50)] hover:text-[oklch(0.18_0.02_40)] mb-6">
      <ArrowLeftIcon class="h-4 w-4" /> Вернуться в каталог
    </NuxtLink>

    <!-- Not found -->
    <div v-if="!product" class="max-w-2xl text-center mx-auto py-20">
      <PackageIcon class="h-16 w-16 mx-auto text-[oklch(0.45_0.02_50)]" />
      <h1 class="mt-4 font-display text-2xl font-bold">Товар не найден</h1>
      <NuxtLink to="/catalog">
        <button class="mt-4 px-4 py-2 rounded-md bg-[oklch(0.42_0.16_25)] text-[oklch(0.98_0.01_80)] text-sm font-semibold">
          Вернуться в каталог
        </button>
      </NuxtLink>
    </div>

    <div v-else class="grid gap-8 lg:grid-cols-2">
      <!-- Image -->
      <div class="aspect-square rounded-2xl overflow-hidden border border-[oklch(0.85_0.02_70)] bg-[oklch(0.93_0.015_75)]">
        <img
          :src="imageUrl"
          :alt="product.name"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <!-- Details -->
      <div class="flex flex-col">
        <div>
          <span class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{{ product.category }}</span>
          <h1 class="mt-2 font-display text-3xl lg:text-4xl font-bold">{{ product.name }}</h1>
        </div>

        <div v-if="product.diameter_mm > 0" class="mt-6 grid grid-cols-3 gap-4">
          <div class="rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)] p-4">
            <div class="text-xs text-[oklch(0.45_0.02_50)]">Диаметр</div>
            <div class="font-display text-xl font-bold mt-1">Ø {{ product.diameter_mm }} мм</div>
          </div>
          <div class="rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)] p-4">
            <div class="text-xs text-[oklch(0.45_0.02_50)]">Длина</div>
            <div class="font-display text-xl font-bold mt-1">{{ product.length_m }} м</div>
          </div>
          <div class="rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)] p-4">
            <div class="text-xs text-[oklch(0.45_0.02_50)]">Стенка</div>
            <div class="font-display text-xl font-bold mt-1">{{ product.wall_thickness_mm }} мм</div>
          </div>
        </div>

        <div class="mt-8 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-[oklch(0.45_0.02_50)]">Цена за единицу</span>
            <span class="font-display text-2xl font-bold text-brand">{{ formatRub(product.price) }}</span>
          </div>
          <div v-if="product.install_price > 0" class="flex items-center justify-between">
            <span class="text-sm text-[oklch(0.45_0.02_50)]">Монтаж за единицу</span>
            <span class="font-display text-xl font-semibold">{{ formatRub(product.install_price) }}</span>
          </div>
        </div>

        <!-- Quantity -->
        <div class="mt-8">
          <label class="text-sm font-semibold">Количество</label>
          <div class="mt-2 flex items-center gap-3">
            <button
              @click="quantity = Math.max(1, quantity - 1)"
              class="h-9 w-9 rounded-md border border-[oklch(0.85_0.02_70)] flex items-center justify-center hover:border-[oklch(0.42_0.16_25)] transition"
            >
              <MinusIcon class="h-4 w-4" />
            </button>
            <input
              type="number"
              min="1"
              max="9999"
              v-model.number="quantity"
              class="w-24 text-center rounded-md border border-[oklch(0.85_0.02_70)] px-3 py-2 text-sm focus:outline-none focus:border-[oklch(0.42_0.16_25)]"
            />
            <button
              @click="quantity++"
              class="h-9 w-9 rounded-md border border-[oklch(0.85_0.02_70)] flex items-center justify-center hover:border-[oklch(0.42_0.16_25)] transition"
            >
              <PlusIcon class="h-4 w-4" />
            </button>
          </div>
        </div>

        <!-- Totals -->
        <div class="mt-8 space-y-4 pt-8 border-t border-[oklch(0.85_0.02_70)]">
          <div class="flex items-center justify-between">
            <span class="text-sm text-[oklch(0.45_0.02_50)]">Итого за товар</span>
            <span class="font-display text-2xl font-bold">{{ formatRub(quantity * product.price) }}</span>
          </div>
          <div v-if="product.install_price > 0" class="flex items-center justify-between">
            <span class="text-sm text-[oklch(0.45_0.02_50)]">С монтажом</span>
            <span class="font-display text-2xl font-bold text-brand">{{ formatRub(quantity * (product.price + product.install_price)) }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-8 space-y-3">
          <button
            @click="addToCart"
            class="w-full flex items-center justify-center gap-2 h-12 text-sm font-semibold rounded-md bg-[oklch(0.42_0.16_25)] hover:bg-[oklch(0.42_0.16_25)]/90 text-[oklch(0.98_0.01_80)] transition"
          >
            <ShoppingCartIcon class="h-5 w-5" /> Добавить в корзину
          </button>
          <NuxtLink :to="`/calculator?d=${product.diameter_mm}`" class="block">
            <button class="w-full h-12 text-sm font-semibold rounded-md border border-[oklch(0.85_0.02_70)] hover:border-[oklch(0.42_0.16_25)] transition">
              Рассчитать стоимость
            </button>
          </NuxtLink>
        </div>

        <div v-if="product.description" class="mt-8 pt-8 border-t border-[oklch(0.85_0.02_70)]">
          <h3 class="font-semibold mb-2">Описание</h3>
          <p class="text-sm text-[oklch(0.45_0.02_50)] leading-relaxed">{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeft as ArrowLeftIcon,
  Package as PackageIcon,
  Minus as MinusIcon,
  Plus as PlusIcon,
  ShoppingCart as ShoppingCartIcon,
} from 'lucide-vue-next'
import { formatRub } from '~/utils/format'
import { useCart } from '~/composables/useCart'
import { useToast } from '~/composables/useToast'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const { success } = useToast()
const { addItem } = useCart()

const { data, pending } = await useFetch('/api/products')

const GALLERY_PHOTOS = [
  '1.webp', '123.webp', '1231.webp', '12311.webp', '1231111.webp', '123112.webp',
  '1231123.webp', '123122222.webp', '1231223.webp', '1234.webp', '1234122.webp',
  '123441222.webp', '12345.webp', '123451.webp', '123456.webp', '1234567.webp',
]

const product = computed(() => {
  return (data.value?.products || []).find((p: any) => p.slug === slug.value) || null
})

const photoIndex = computed(() => {
  const products = data.value?.products || []
  const idx = products.findIndex((p: any) => p.slug === slug.value)
  return idx % GALLERY_PHOTOS.length
})

const imageUrl = computed(() =>
  product.value?.image_url || `/gallery/${GALLERY_PHOTOS[photoIndex.value]}`
)

const quantity = ref(1)

useSeoMeta(() => ({
  title: product.value
    ? `${product.value.name} — купить в Сургуте | СтройМонтаж-86`
    : 'Товар — Завод винтовых свай Сургут',
  description: product.value
    ? `Купить ${product.value.name} в Сургуте. Диаметр Ø${product.value.diameter_mm} мм, длина ${product.value.length_m} м, стенка ${product.value.wall_thickness_mm} мм. Цена ${product.value.price.toLocaleString('ru-RU')} ₽. Монтаж под ключ.`
    : '',
  keywords: product.value
    ? `${product.value.name}, свая ${product.value.diameter_mm} мм купить Сургут, винтовая свая ${product.value.diameter_mm} мм цена`
    : '',
  ogTitle: product.value ? `${product.value.name} — СтройМонтаж-86 Сургут` : '',
  ogImage: imageUrl.value,
}))

const addToCart = () => {
  if (!product.value) return
  addItem({
    product_id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    install_price: product.value.install_price,
    qty: quantity.value,
  })
  success(`Добавлено в корзину: ${product.value.name} × ${quantity.value}`)
}
</script>
