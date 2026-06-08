<template>
  <div class="container mx-auto px-4 py-12 lg:py-16">
    <div class="max-w-2xl">
      <span class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Продукция</span>
      <h1 class="mt-2 font-display text-4xl lg:text-5xl font-bold">Каталог винтовых свай</h1>
      <p class="mt-3 text-[oklch(0.45_0.02_50)]">
        Производим сваи диаметром от 57 до 325 мм. Стенка от 4 до 12 мм. Все сваи покрыты антикоррозийной мастикой.
      </p>
    </div>

    <!-- Category filter -->
    <div class="mt-8 flex flex-wrap gap-2">
      <button
        v-for="c in categories"
        :key="c"
        @click="filter = c"
        class="px-4 py-2 rounded-full text-sm font-medium border transition"
        :class="filter === c
          ? 'bg-[oklch(0.42_0.16_25)] text-[oklch(0.98_0.01_80)] border-[oklch(0.42_0.16_25)]'
          : 'border-[oklch(0.85_0.02_70)] hover:border-[oklch(0.42_0.16_25)]'"
      >
        {{ catLabel[c] ?? c }}
      </button>
    </div>

    <!-- Skeleton -->
    <div v-if="pending" class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 6" :key="i" class="bg-[oklch(0.99_0.005_80)] rounded-lg border border-[oklch(0.85_0.02_70)] h-72 animate-pulse" />
    </div>

    <!-- Products grid -->
    <div v-else class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="(p, idx) in items"
        :key="p.id"
        :to="`/product/${p.slug}`"
        class="group bg-[oklch(0.99_0.005_80)] rounded-lg border border-[oklch(0.85_0.02_70)] overflow-hidden hover:border-[oklch(0.42_0.16_25)] hover:shadow-elevated transition-all block"
      >
        <div class="aspect-[5/3] bg-gradient-to-br from-[oklch(0.18_0.01_40)] via-[oklch(0.18_0.01_40)]/80 to-[oklch(0.42_0.16_25)]/40 relative overflow-hidden">
          <img
            :src="p.image_url || `/gallery/${GALLERY_PHOTOS[idx % GALLERY_PHOTOS.length]}`"
            :alt="p.name"
            class="w-full h-full object-cover"
          />
          <div class="izba-roof absolute top-0 left-0 right-0 h-2" />
          <div v-if="!p.in_stock" class="absolute top-3 right-3 px-2 py-1 rounded bg-[oklch(0.18_0.01_40)]/80 text-[oklch(0.93_0.025_80)] text-xs">
            Под заказ
          </div>
        </div>

        <div class="p-5">
          <h2 class="font-display text-lg font-semibold leading-tight">{{ p.name }}</h2>
          <p v-if="p.description" class="mt-2 text-xs text-[oklch(0.45_0.02_50)] line-clamp-2">{{ p.description }}</p>

          <dl v-if="p.diameter_mm > 0" class="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div><dt class="text-[oklch(0.45_0.02_50)]">Диаметр</dt><dd class="font-semibold">{{ p.diameter_mm }} мм</dd></div>
            <div><dt class="text-[oklch(0.45_0.02_50)]">Длина</dt><dd class="font-semibold">{{ p.length_m }} м</dd></div>
            <div><dt class="text-[oklch(0.45_0.02_50)]">Стенка</dt><dd class="font-semibold">{{ p.wall_thickness_mm }} мм</dd></div>
          </dl>

          <div class="mt-4 pt-4 border-t border-[oklch(0.85_0.02_70)] flex items-end justify-between">
            <div>
              <div v-if="p.price > 0">
                <div class="text-xs text-[oklch(0.45_0.02_50)]">Цена</div>
                <div class="font-display text-2xl font-bold text-brand">{{ formatRub(p.price) }}</div>
              </div>
              <div v-if="p.install_price > 0" class="text-xs text-[oklch(0.45_0.02_50)] mt-0.5">
                + монтаж {{ formatRub(p.install_price) }}
              </div>
            </div>
            <NuxtLink :to="`/calculator?d=${p.diameter_mm}`" @click.stop>
              <button class="px-3 py-1.5 text-xs font-semibold rounded-md bg-[oklch(0.42_0.16_25)] hover:bg-[oklch(0.42_0.16_25)]/90 text-[oklch(0.98_0.01_80)] transition">
                Заказать
              </button>
            </NuxtLink>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatRub } from '~/utils/format'

useSeoMeta({
  title: 'Каталог винтовых свай Ø57–325 мм — цены и характеристики | СтройМонтаж-86 Сургут',
  description: 'Каталог винтовых свай собственного производства. Диаметры Ø57, 73, 89, 108, 133, 159, 219, 325 мм. Длина 1.5–12 м. Цены, технические характеристики, монтаж под ключ в Сургуте и ХМАО.',
  keywords: 'каталог винтовых свай, купить сваи Сургут, сваи 89 мм, сваи 108 мм, сваи 133 мм, винтовые сваи цены, сваи под дом Сургут, сваи под баню',
  ogTitle: 'Каталог винтовых свай — Завод СтройМонтаж-86 Сургут',
  ogDescription: 'Сваи всех диаметров и длин в наличии на складе в Сургуте.',
})

const { data, pending } = await useFetch('/api/products')
const filter = ref('all')

const categories = computed(() => {
  const cats = new Set((data.value?.products || []).map((p: any) => p.category ?? 'standard'))
  return ['all', ...Array.from(cats)] as string[]
})

const items = computed(() => {
  const products = data.value?.products || []
  if (filter.value === 'all') return products
  return products.filter((p: any) => (p.category ?? 'standard') === filter.value)
})

const catLabel: Record<string, string> = {
  all: 'Все',
  'Винтовые сваи': 'Винтовые сваи',
  'Опоры': 'Стальные опоры',
  'Винтовые сваи под ключ': 'Винтовые сваи под ключ',
  'Оцинкованные сваи': 'Оцинкованные сваи',
  'Специальные сваи': 'Специальные сваи',
  'Железобетонные сваи': 'Железобетонные сваи',
  'Буронабивные сваи': 'Буронабивные сваи',
  'Готовые фундаменты': 'Готовые фундаменты',
  'Монтаж по типам объектов': 'Монтаж по типам объектов',
  'Услуги монтажа': 'Услуги монтажа',
  'Обвязка свай': 'Обвязка свай',
  'Комплектующие': 'Комплектующие',
  'Бурение и аренда': 'Бурение и аренда',
  'Металлоконструкции': 'Металлоконструкции',
  light: 'Лёгкие',
  standard: 'Стандартные',
  heavy: 'Усиленные',
  industrial: 'Промышленные',
}

const GALLERY_PHOTOS = [
  '1.webp', '123.webp', '1231.webp', '12311.webp', '1231111.webp', '123112.webp',
  '1231123.webp', '123122222.webp', '1231223.webp', '1234.webp', '1234122.webp',
  '123441222.webp', '12345.webp', '123451.webp', '123456.webp', '1234567.webp',
  '1234567123.webp', '12345678.webp', '123456781.webp', '12345678111.webp',
  '213.webp', '2222.webp', '23122.webp', '23412.webp', '23423.webp',
  '3122.webp', '31234.webp', '32.webp', '3231.webp', '41.webp', '41231.webp',
]
</script>
