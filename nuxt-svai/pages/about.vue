<template>
  <div class="container mx-auto px-4 py-12 lg:py-16 max-w-5xl">
    <span class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">О компании</span>
    <h1 class="mt-2 font-display text-4xl lg:text-5xl font-bold">Завод винтовых свай в ХМАО</h1>
    <p class="mt-4 text-lg text-[oklch(0.45_0.02_50)] max-w-3xl">
      Производим и монтируем винтовые сваи в Сургуте, по всему ХМАО — Югре и Тюменской области.
      Своё производство, своя техника, опытная бригада.
    </p>

    <!-- Stats -->
    <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="s in STATS" :key="s.label" class="rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)] p-5">
        <component :is="s.icon" class="h-6 w-6 text-brand" />
        <div class="mt-3 font-display text-3xl font-bold">{{ s.value }}</div>
        <div class="text-sm text-[oklch(0.45_0.02_50)]">{{ s.label }}</div>
      </div>
    </div>

    <div class="ornament-divider my-12" />

    <!-- What we do / Why choose us -->
    <div class="grid gap-10 lg:grid-cols-2">
      <div>
        <h2 class="font-display text-2xl font-bold">Что мы делаем</h2>
        <ul class="mt-4 space-y-3 text-sm">
          <li v-for="t in WHAT_WE_DO" :key="t" class="flex gap-2">
            <CheckCircle2Icon class="h-5 w-5 text-brand shrink-0" /> {{ t }}
          </li>
        </ul>
      </div>
      <div>
        <h2 class="font-display text-2xl font-bold">Почему выбирают нас</h2>
        <ul class="mt-4 space-y-3 text-sm">
          <li v-for="t in WHY_US" :key="t" class="flex gap-2">
            <CheckCircle2Icon class="h-5 w-5 text-gold shrink-0" /> {{ t }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Team section -->
    <div class="mt-16 bg-[oklch(0.99_0.005_80)] rounded-2xl border border-[oklch(0.85_0.02_70)] p-8">
      <h2 class="font-display text-2xl font-bold text-center mb-6">Наша команда мастеров</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <div class="aspect-[4/3] rounded-lg overflow-hidden border border-[oklch(0.85_0.02_70)]">
          <img
            src="/gallery/13bd20c33cf9c4e59907_-1.webp"
            alt="Команда мастеров"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex flex-col justify-center">
          <p class="text-sm text-[oklch(0.45_0.02_50)] leading-relaxed">
            Наша команда профессиональных мастеров имеет многолетний опыт монтажа винтовых свай в условиях ХМАО.
            Мы работаем на собственной технике и гарантируем качество каждого объекта.
          </p>
          <ul class="mt-4 space-y-2 text-sm">
            <li v-for="t in TEAM_POINTS" :key="t" class="flex items-center gap-2 text-[oklch(0.18_0.02_40)]">
              <div class="h-1.5 w-1.5 rounded-full bg-[oklch(0.42_0.16_25)]" /> {{ t }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Award as AwardIcon,
  Users as UsersIcon,
  Hammer as HammerIcon,
  Calendar as CalendarIcon,
  CheckCircle2 as CheckCircle2Icon,
} from 'lucide-vue-next'

useSeoMeta({
  title: 'О компании СтройМонтаж-86 — Завод винтовых свай в Сургуте и ХМАО',
  description: 'Собственный завод по производству и монтажу винтовых свай в Сургуте с 2019 года. Более 1000 объектов, опыт 5+ лет. Работаем по всему ХМАО — Югре.',
  keywords: 'завод винтовых свай Сургут, производитель свай ХМАО, монтаж фундамента Сургут отзывы, строительная компания Сургут сваи',
  ogTitle: 'О компании — Завод винтовых свай СтройМонтаж-86',
  ogDescription: 'Производство и монтаж винтовых свай в ХМАО. 1000+ объектов, опыт 5+ лет.',
})

const STATS = [
  { icon: CalendarIcon, value: '5+ лет', label: 'на рынке' },
  { icon: AwardIcon, value: '1000+', label: 'объектов' },
  { icon: UsersIcon, value: '5–20', label: 'мастеров' },
  { icon: HammerIcon, value: '50 свай', label: 'в день' },
]

const WHAT_WE_DO = [
  'Свайный и винтовой фундамент под ключ',
  'Сваи для дома, бани, беседки, забора, террасы',
  'Монтаж в любое время года, включая зиму',
  'Демонтаж и замена фундамента',
  'Подъём и реконструкция домов',
  'Сваи для причалов, пирсов, укрепления берегов',
]

const WHY_US = [
  'Собственное производство — цены без посредников',
  'Сваи покрыты антикоррозийной мастикой — срок службы 100+ лет',
  'Работа по договору, шаблоны: договор, расписка, акт',
  'Бесплатный выезд на замер',
  'Гарантия на материалы и работу',
  'Возможность монтажа техникой и вручную',
]

const TEAM_POINTS = [
  'Опыт более 5 лет',
  'Собственная техника',
  'Работа по договору',
  'Гарантия на работы',
]
</script>
