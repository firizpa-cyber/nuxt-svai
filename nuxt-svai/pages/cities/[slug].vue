<template>
  <div v-if="city">
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-[oklch(0.85_0.02_70)] bg-[oklch(0.18_0.01_40)] py-16 text-[oklch(0.93_0.025_80)]">
      <div class="absolute inset-0 opacity-20 wood-texture" />
      <div class="relative container mx-auto px-4 max-w-4xl">
        <nav class="text-xs text-[oklch(0.93_0.025_80)]/50 mb-4 flex items-center gap-1">
          <NuxtLink to="/" class="hover:text-[oklch(0.93_0.025_80)]">Главная</NuxtLink>
          <span>/</span>
          <span>{{ city.name }}</span>
        </nav>
        <h1 class="font-display text-4xl sm:text-5xl font-bold leading-tight">
          Винтовые сваи и монтаж фундамента в {{ city.name_loc }}
        </h1>
        <p class="mt-4 text-lg text-[oklch(0.93_0.025_80)]/80 max-w-2xl">
          Производство и монтаж винтовых свай в {{ city.name_loc }}. Выезжаем из Сургута.
          Сваи Ø57–325 мм, монтаж за 1 день, гарантия по договору.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink to="/calculator">
            <button class="h-12 px-6 font-semibold rounded-md bg-[oklch(0.42_0.16_25)] hover:bg-[oklch(0.42_0.16_25)]/90 text-[oklch(0.98_0.01_80)] transition">
              Рассчитать стоимость
            </button>
          </NuxtLink>
          <a href="tel:+79992568800">
            <button class="h-12 px-6 font-semibold rounded-md border border-[oklch(0.93_0.025_80)]/30 text-[oklch(0.93_0.025_80)] hover:bg-[oklch(0.93_0.025_80)]/10 transition">
              +7 999 256-88-00
            </button>
          </a>
        </div>
      </div>
      <div class="ornament-divider absolute bottom-0 left-0 right-0" />
    </section>

    <!-- About delivery -->
    <section class="container mx-auto px-4 py-16 max-w-5xl">
      <div class="grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <h2 class="font-display text-3xl font-bold">Работаем в {{ city.name_loc }}</h2>
          <p class="mt-4 text-[oklch(0.45_0.02_50)] leading-relaxed">
            Завод СтройМонтаж-86 базируется в Сургуте и выполняет заказы по всему ХМАО.
            До {{ city.name_gen }} {{ city.km }} км от Сургута — наши бригады выезжают на объект в день согласования.
          </p>
          <ul class="mt-6 space-y-3 text-sm">
            <li v-for="f in city.features" :key="f" class="flex items-center gap-2">
              <CheckCircle2Icon class="h-5 w-5 text-brand shrink-0" />
              {{ f }}
            </li>
          </ul>
        </div>
        <div class="rounded-xl border border-[oklch(0.85_0.02_70)] overflow-hidden bg-[oklch(0.93_0.015_75)] p-6">
          <div class="font-display text-lg font-bold mb-4">Стоимость выезда в {{ city.name }}</div>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between border-b border-[oklch(0.85_0.02_70)] pb-2">
              <span class="text-[oklch(0.45_0.02_50)]">Расстояние от Сургута</span>
              <span class="font-semibold">{{ city.km }} км</span>
            </div>
            <div class="flex justify-between border-b border-[oklch(0.85_0.02_70)] pb-2">
              <span class="text-[oklch(0.45_0.02_50)]">Выезд замерщика</span>
              <span class="font-semibold text-brand">Бесплатно*</span>
            </div>
            <div class="flex justify-between border-b border-[oklch(0.85_0.02_70)] pb-2">
              <span class="text-[oklch(0.45_0.02_50)]">Доставка свай</span>
              <span class="font-semibold">По договорённости</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[oklch(0.45_0.02_50)]">Монтаж</span>
              <span class="font-semibold">от 900 ₽/сваю</span>
            </div>
          </div>
          <p class="text-xs text-[oklch(0.45_0.02_50)] mt-4">* При объёме от 20 свай</p>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="bg-[oklch(0.93_0.015_75)]/40 border-y border-[oklch(0.85_0.02_70)] py-16">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="font-display text-3xl font-bold mb-10">Наши услуги в {{ city.name_loc }}</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink v-for="s in SERVICES" :key="s.href" :to="s.href"
            class="p-5 rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)] hover:border-[oklch(0.42_0.16_25)] hover:shadow-card transition block relative">
            <div class="izba-roof absolute top-0 left-0 right-0 h-1" />
            <div class="font-display font-bold">{{ s.name }}</div>
            <div class="text-sm text-[oklch(0.45_0.02_50)] mt-1">{{ s.desc }}</div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="container mx-auto px-4 py-16 max-w-5xl">
      <div class="rounded-2xl wood-texture text-[oklch(0.93_0.025_80)] p-8 md:p-12 text-center relative overflow-hidden">
        <div class="izba-roof absolute top-0 left-0 right-0 h-3" />
        <h2 class="font-display text-3xl font-bold">Нужны сваи в {{ city.name_loc }}?</h2>
        <p class="mt-3 text-[oklch(0.93_0.025_80)]/80">Позвоните — согласуем выезд на сегодня или завтра</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <NuxtLink to="/calculator">
            <button class="h-12 px-8 font-semibold rounded-md bg-[oklch(0.42_0.16_25)] hover:bg-[oklch(0.42_0.16_25)]/90 text-[oklch(0.98_0.01_80)] transition">
              Рассчитать онлайн
            </button>
          </NuxtLink>
          <a href="tel:+79992568800">
            <button class="h-12 px-8 font-semibold rounded-md bg-[oklch(0.93_0.025_80)] text-[oklch(0.18_0.01_40)] hover:bg-[oklch(0.72_0.13_75)] transition">
              +7 999 256-88-00
            </button>
          </a>
        </div>
      </div>
    </section>
  </div>

  <!-- 404 if city not found -->
  <div v-else class="container mx-auto px-4 py-24 text-center max-w-md">
    <h1 class="font-display text-3xl font-bold">Страница не найдена</h1>
    <NuxtLink to="/" class="mt-4 inline-block text-brand underline">На главную</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2 as CheckCircle2Icon } from 'lucide-vue-next'

const CITIES: Record<string, {
  name: string; name_loc: string; name_gen: string; km: string; features: string[]
}> = {
  'nefteyugansk': {
    name: 'Нефтеюганск', name_loc: 'Нефтеюганске', name_gen: 'Нефтеюганску', km: '80',
    features: [
      'Выезд бригады из Сургута в день звонка',
      'Сваи Ø57–325 мм в наличии на складе',
      'Монтаж за 1 день, работаем зимой',
      'Гарантия на сваи и монтаж по договору',
    ],
  },
  'kogalym': {
    name: 'Когалым', name_loc: 'Когалыме', name_gen: 'Когалыму', km: '120',
    features: [
      'Обслуживаем Когалым и Лянторский район',
      'Сваи собственного производства из Сургута',
      'Монтаж под ключ с актом приёмки',
      'Опыт работы на грунтах Когалыма 5+ лет',
    ],
  },
  'nizhnevartovsk': {
    name: 'Нижневартовск', name_loc: 'Нижневартовске', name_gen: 'Нижневартовску', km: '280',
    features: [
      'Регулярные выезды бригады в Нижневартовск',
      'Крупные заказы от 50 свай — приоритет',
      'Доставка сваи собственным транспортом',
      'Полный пакет документов по договору',
    ],
  },
  'langepas': {
    name: 'Лангепас', name_loc: 'Лангепасе', name_gen: 'Лангепасу', km: '170',
    features: [
      'Выполняем заказы в Лангепасе и окрестностях',
      'Работаем на болотистых грунтах ХМАО',
      'Монтаж при любой температуре',
      'Бесплатная консультация по телефону',
    ],
  },
  'pyt-yah': {
    name: 'Пыть-Ях', name_loc: 'Пыть-Яхе', name_gen: 'Пыть-Яху', km: '65',
    features: [
      'Ближайший к Сургуту крупный город — выезд быстро',
      'Сваи всех диаметров и длин в наличии',
      'Монтаж фундамента под дом, баню, забор',
      'Работа по договору, гарантия',
    ],
  },
}

const SERVICES = [
  { name: 'Монтаж свай', desc: 'Установка под ключ за 1 день', href: '/services/montazh-svaj' },
  { name: 'Фундамент под дом', desc: 'Для каркасных и брусовых домов', href: '/services/fundament-pod-dom' },
  { name: 'Фундамент под баню', desc: 'Монтаж за 4–6 часов', href: '/services/fundament-pod-banju' },
  { name: 'Каталог свай', desc: 'Ø57–325 мм, длина 1.5–12 м', href: '/catalog' },
  { name: 'Цены', desc: 'Актуальный прайс-лист 2026', href: '/prices' },
  { name: 'Калькулятор', desc: 'Рассчитать смету онлайн', href: '/calculator' },
]

const route = useRoute()
const slug = route.params.slug as string
const city = CITIES[slug] ?? null

useSeoMeta(() => ({
  title: city
    ? `Винтовые сваи в ${city.name_loc} — монтаж фундамента | СтройМонтаж-86 Сургут`
    : 'Страница не найдена',
  description: city
    ? `Производство и монтаж винтовых свай в ${city.name_loc}. Выезд из Сургута, ${city.km} км. Сваи Ø57–325 мм, монтаж за 1 день, гарантия по договору.`
    : '',
  keywords: city
    ? `винтовые сваи ${city.name}, монтаж свай ${city.name}, фундамент на сваях ${city.name}, сваи под дом ${city.name}, свайный фундамент ${city.name} цена`
    : '',
  ogTitle: city ? `Сваи и монтаж фундамента в ${city.name_loc}` : '',
  ogDescription: city ? `Выезд из Сургута, ${city.km} км. Работаем в ${city.name_loc}.` : '',
}))

useHead(() => city ? {
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Монтаж винтовых свай в ${city.name_loc}`,
      provider: { '@type': 'LocalBusiness', name: 'СтройМонтаж-86', address: { '@type': 'PostalAddress', addressLocality: 'Сургут', addressCountry: 'RU' } },
      areaServed: { '@type': 'City', name: city.name },
    }),
  }],
} : {})
</script>
