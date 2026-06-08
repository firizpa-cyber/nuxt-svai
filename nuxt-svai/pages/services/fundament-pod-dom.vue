<template>
  <SeoHead title="Фундамент под дом в Сургуте — монтаж за 1 день | СтройМонтаж-86" description="Фундамент на винтовых сваях под дом в Сургуте. Быстрый монтаж, гарантия, калькулятор онлайн." keywords="фундамент под дом Сургут, свайный фундамент, монтаж свай" />
  <div>
    <section class="relative overflow-hidden border-b border-[oklch(0.85_0.02_70)] bg-[oklch(0.18_0.01_40)] py-16 text-[oklch(0.93_0.025_80)]">
      <div class="absolute inset-0 opacity-20 wood-texture" />
      <div class="relative container mx-auto px-4 max-w-4xl">
        <nav class="text-xs text-[oklch(0.93_0.025_80)]/50 mb-4 flex items-center gap-1">
          <NuxtLink to="/" class="hover:text-[oklch(0.93_0.025_80)]">Главная</NuxtLink>
          <span>/</span>
          <span>Фундамент под дом</span>
        </nav>
        <h1 class="font-display text-4xl sm:text-5xl font-bold leading-tight">
          Свайный фундамент под дом в Сургуте
        </h1>
        <p class="mt-4 text-lg text-[oklch(0.93_0.025_80)]/80 max-w-2xl">
          Фундамент на винтовых сваях для жилых домов, каркасников, брусовых домов и домов из бруса.
          Монтаж за 1 день. Подходит для любого грунта ХМАО.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink to="/calculator">
            <button class="h-12 px-6 font-semibold rounded-md bg-[oklch(0.42_0.16_25)] hover:bg-[oklch(0.42_0.16_25)]/90 text-[oklch(0.98_0.01_80)] transition">
              Рассчитать фундамент
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

    <!-- House types -->
    <section class="container mx-auto px-4 py-16 max-w-5xl">
      <h2 class="font-display text-3xl font-bold mb-10">Под какие дома ставим фундамент</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="t in HOUSE_TYPES" :key="t" class="flex items-center gap-3 p-4 rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)]">
          <CheckCircle2Icon class="h-5 w-5 text-brand shrink-0" />
          <span class="text-sm font-medium">{{ t }}</span>
        </div>
      </div>
    </section>

    <!-- Advantages -->
    <section class="bg-[oklch(0.93_0.015_75)]/40 border-y border-[oklch(0.85_0.02_70)] py-16">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="font-display text-3xl font-bold mb-10">Преимущества свайного фундамента для дома</h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div v-for="a in ADVANTAGES" :key="a.title" class="p-6 rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)]">
            <h3 class="font-display text-lg font-bold text-brand">{{ a.title }}</h3>
            <p class="mt-2 text-sm text-[oklch(0.45_0.02_50)] leading-relaxed">{{ a.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="container mx-auto px-4 py-16 max-w-4xl">
      <h2 class="font-display text-3xl font-bold mb-10">Частые вопросы о свайном фундаменте для дома</h2>
      <div class="space-y-4">
        <details v-for="q in FAQ" :key="q.q" class="rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)] group">
          <summary class="p-5 font-semibold cursor-pointer list-none flex justify-between items-center">
            {{ q.q }}
            <span class="ml-4 text-brand text-xl font-light group-open:rotate-45 transition-transform">+</span>
          </summary>
          <div class="px-5 pb-5 text-sm text-[oklch(0.45_0.02_50)] leading-relaxed border-t border-[oklch(0.85_0.02_70)] pt-4">
            {{ q.a }}
          </div>
        </details>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2 as CheckCircle2Icon } from 'lucide-vue-next'
import SeoHead from '~/components/SeoHead.vue'



useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Сколько свай нужно для дома 6×6?', acceptedAnswer: { '@type': 'Answer', text: 'Для дома 6×6 обычно требуется 9–16 свай в зависимости от типа конструкции, веса дома и несущей способности грунта. Рекомендуем бесплатный выезд замерщика для точного расчёта.' } },
          { '@type': 'Question', name: 'Сколько стоит свайный фундамент под дом в Сургуте?', acceptedAnswer: { '@type': 'Answer', text: 'Стоимость зависит от количества и диаметра свай. Примерно: 12 свай Ø89 мм × 2.5 м — от 36 000 ₽ за сваи + 10 800 ₽ монтаж = от 46 800 ₽ под ключ. Точный расчёт — через калькулятор.' } },
          { '@type': 'Question', name: 'Подходят ли винтовые сваи для грунтов ХМАО?', acceptedAnswer: { '@type': 'Answer', text: 'Да, винтовые сваи идеально подходят для Сургута и ХМАО: они хорошо работают на торфяных, пучинистых, заболоченных и мёрзлых грунтах. Именно поэтому в ХМАО это самый популярный тип фундамента.' } },
        ],
      }),
    },
  ],
})

const HOUSE_TYPES = [
  'Каркасный дом',
  'Брусовой дом',
  'Деревянный дом',
  'Дом из бревна',
  'Садовый домик',
  'Дом из газобетона (до 2 этажей)',
  'Дом из SIP-панелей',
  'Гараж',
  'Хозяйственные постройки',
]

const ADVANTAGES = [
  { title: 'Монтаж за 1 день', desc: 'Бригада из 5–10 мастеров установит сваи для стандартного дома 6×8 за один рабочий день.' },
  { title: 'Работает на любом грунте', desc: 'Торф, суглинок, глина, мёрзлый грунт, высокий уровень грунтовых вод — везде работаем.' },
  { title: 'Срок службы 100+ лет', desc: 'Антикоррозийное покрытие мастикой обеспечивает долговечность даже в агрессивных грунтах ХМАО.' },
  { title: 'Не требует земляных работ', desc: 'Никакой грязи, никаких опалубок и бетонных работ — чистый и быстрый монтаж.' },
  { title: 'Гарантия по договору', desc: 'Официальный договор, акт приёмки и гарантийная расписка на фундамент.' },
  { title: 'Доступная цена', desc: 'Дешевле ленточного и монолитного фундамента в 2–3 раза при сопоставимой надёжности.' },
]

const FAQ = [
  { q: 'Сколько свай нужно для дома 6×6?', a: 'Для дома 6×6 обычно требуется 9–16 свай в зависимости от типа конструкции, веса дома и несущей способности грунта. Рекомендуем бесплатный выезд замерщика для точного расчёта.' },
  { q: 'Сколько стоит свайный фундамент под дом в Сургуте?', a: 'Стоимость зависит от количества и диаметра свай. Примерно: 12 свай Ø89 мм × 2.5 м — от 36 000 ₽ за сваи + 10 800 ₽ монтаж = от 46 800 ₽ под ключ. Точный расчёт — через калькулятор на сайте.' },
  { q: 'Подходят ли винтовые сваи для грунтов ХМАО?', a: 'Да, винтовые сваи идеально подходят для Сургута и ХМАО: торфяные, пучинистые, заболоченные и мёрзлые грунты — всё это наша специализация.' },
  { q: 'Можно ли ставить фундамент зимой?', a: 'Да, мы монтируем сваи зимой при температуре до −40°C. Никаких доплат за зимний монтаж — цена одинакова круглый год.' },
  { q: 'Какой срок службы у свайного фундамента?', a: 'Сваи с антикоррозийным покрытием мастикой служат 100+ лет. Это подтверждено испытаниями и опытом объектов, построенных 20–30 лет назад.' },
]
</script>
