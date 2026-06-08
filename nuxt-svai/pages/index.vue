<template>

  <SeoHead title="Винтовые сваи в Сургуте — производство и монтаж | СтройМонтаж-86" description="Продажа винтовых свай и монтаж фундаментов под ключ в Сургуте. Расчет стоимости за 15 минут." keywords="винтовые сваи Сургут, монтаж свай Сургут, фундамент на сваях" />
  <div>
    <!-- HERO SECTION -->
    <section class="relative overflow-hidden border-b border-[oklch(0.85_0.02_70)] bg-[oklch(0.18_0.01_40)]">
      <div class="absolute inset-0">
        <NuxtImg src="/gallery/hero-piles.webp" alt="Монтаж винтовой сваи зимой в ХМАО" width="800" height="600" class="h-full w-full object-cover" fetchpriority="high" />
        <div class="absolute inset-0 bg-black/60" />
      </div>

      <div class="relative container mx-auto px-4 py-24 lg:py-32 text-[oklch(0.93_0.025_80)]">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.42_0.16_25)] text-[oklch(0.98_0.01_80)] text-xs font-semibold uppercase tracking-wider mb-4 border border-[oklch(0.72_0.13_75)]/30">
            <span class="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.13_75)] animate-pulse" />
            Собственное производство свай
          </div>

          <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
            Винтовые сваи <span class="text-gold">СтройМонтаж-86</span><br />
            <span class="text-sm sm:text-lg font-sans font-medium text-[oklch(0.93_0.025_80)]/90 block mt-2 tracking-wide uppercase">
              Производство и профессиональный монтаж в Сургуте и ХМАО-Югре
            </span>
          </h1>

          <p class="mt-5 text-lg text-[oklch(0.93_0.025_80)]/85 max-w-xl leading-relaxed">
            Изготавливаем и монтируем сваи Ø 57–325 мм любой длины от 1.5 до 12 м с защитным покрытием мастикой.
            Срок службы 100+ лет. Гарантия, работа по договору, бесплатный выезд замерщика.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink to="/calculator">
              <button class="inline-flex items-center gap-2 h-14 px-6 text-base font-semibold rounded-md bg-[oklch(0.42_0.16_25)] hover:bg-[oklch(0.42_0.16_25)]/90 text-[oklch(0.98_0.01_80)] shadow-lg border border-[oklch(0.72_0.13_75)]/20 transition">
                Рассчитать стоимость <ArrowRightIcon class="h-4 w-4" />
              </button>
            </NuxtLink>
            <a href="tel:+79992568800">
              <button class="inline-flex items-center gap-2 h-14 px-6 text-base font-semibold rounded-md bg-[oklch(0.93_0.025_80)]/10 border border-[oklch(0.93_0.025_80)]/30 text-[oklch(0.93_0.025_80)] hover:bg-[oklch(0.93_0.025_80)]/20 transition">
                <PhoneIcon class="h-4 w-4" /> +7 999 256-88-00
              </button>
            </a>
          </div>

          <div class="mt-12 grid grid-cols-3 gap-6 max-w-lg border-t border-[oklch(0.93_0.025_80)]/10 pt-6">
            <div v-for="s in STATS" :key="s.l" class="border-l-2 border-[oklch(0.72_0.13_75)] pl-3">
              <div class="font-display text-2xl sm:text-3xl font-bold text-gold">{{ s.v }}</div>
              <div class="text-[10px] text-[oklch(0.93_0.025_80)]/70 uppercase tracking-wider mt-0.5">{{ s.l }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="ornament-divider absolute bottom-0 left-0 right-0" />
    </section>

    <!-- CORE SPECIFICATIONS -->
    <section class="bg-[oklch(0.99_0.005_80)] py-16 border-b border-[oklch(0.85_0.02_70)]">
      <div class="container mx-auto px-4 max-w-5xl">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Характеристики</span>
          <h2 class="mt-2 font-display text-3xl font-bold">Надежный свайный фундамент в цифрах</h2>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="spec in SPECS" :key="spec.label" class="p-5 bg-[oklch(0.93_0.015_75)]/40 rounded-lg border border-[oklch(0.85_0.02_70)]">
            <div class="text-xs text-[oklch(0.45_0.02_50)] uppercase font-semibold">{{ spec.label }}</div>
            <div class="mt-2 font-display text-2xl font-bold text-brand">{{ spec.value }}</div>
            <p class="mt-2 text-xs text-[oklch(0.45_0.02_50)]">{{ spec.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ADVANTAGES -->
    <section class="container mx-auto px-4 py-16 lg:py-24">
      <div class="max-w-2xl mx-auto text-center mb-16">
        <span class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Преимущества работы</span>
        <h2 class="mt-2 font-display text-3xl lg:text-4xl font-bold">Почему фундамент заказывают у нас</h2>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
        <div
          v-for="f in FEATURES"
          :key="f.title"
          class="group p-6 rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)] hover:border-[oklch(0.42_0.16_25)] hover:shadow-card transition duration-300 relative"
        >
          <div class="izba-roof absolute top-0 left-0 right-0 h-1" />
          <div class="h-12 w-12 rounded bg-[oklch(0.42_0.16_25)]/10 grid place-items-center text-brand group-hover:bg-[oklch(0.42_0.16_25)] group-hover:text-[oklch(0.98_0.01_80)] transition-colors mt-2">
            <component :is="f.icon" class="h-6 w-6" />
          </div>
          <div class="mt-4 font-display text-lg font-bold">{{ f.title }}</div>
          <div class="mt-2 text-xs text-[oklch(0.45_0.02_50)] leading-relaxed">{{ f.desc }}</div>
        </div>
      </div>
    </section>

    <!-- PRODUCT CATALOG PREVIEW -->
    <section class="bg-[oklch(0.93_0.015_75)]/40 border-y border-[oklch(0.85_0.02_70)] py-16 lg:py-20">
      <div class="container mx-auto px-4 max-w-5xl">
        <div class="flex items-end justify-between gap-4 mb-10 border-b border-[oklch(0.85_0.02_70)] pb-4">
          <div>
            <span class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Популярные товары</span>
            <h2 class="mt-2 font-display text-3xl font-bold">Винтовые сваи в наличии</h2>
          </div>
          <NuxtLink to="/catalog" class="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
            Смотреть весь каталог <ArrowRightIcon class="h-4 w-4" />
          </NuxtLink>
        </div>

        <div v-if="pending" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="i in 8" :key="i" class="bg-[oklch(0.99_0.005_80)] rounded-lg border border-[oklch(0.85_0.02_70)] h-64 animate-pulse" />
        </div>

        <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="(p, idx) in featured"
            :key="p.id"
            :to="`/product/${p.slug}`"
            class="bg-[oklch(0.99_0.005_80)] rounded-lg border border-[oklch(0.85_0.02_70)] overflow-hidden hover:shadow-card hover:border-[oklch(0.42_0.16_25)] transition duration-300 relative block"
          >
            <div class="izba-roof absolute top-0 left-0 right-0 h-1 z-10" />
            <div class="aspect-[4/3] bg-gradient-to-br from-[oklch(0.18_0.01_40)] via-[oklch(0.18_0.01_40)]/80 to-[oklch(0.42_0.16_25)]/40 overflow-hidden">
              <img
                :src="`/gallery/${PREVIEW_PHOTOS[idx % PREVIEW_PHOTOS.length]}`"
                :alt="p.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-5">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="text-[10px] uppercase font-bold tracking-wider text-[oklch(0.45_0.02_50)]">В наличии · Ø {{ p.diameter_mm }} мм</div>
                  <div class="font-display text-lg font-bold mt-1 leading-tight">{{ p.name }}</div>
                </div>
                <div class="h-10 w-10 rounded bg-gradient-to-br from-[oklch(0.42_0.16_25)] to-[oklch(0.42_0.16_25)]/60 grid place-items-center text-[oklch(0.98_0.01_80)] font-bold shrink-0 text-sm">
                  {{ p.diameter_mm }}
                </div>
              </div>
              <div class="mt-4 flex gap-4 text-xs text-[oklch(0.45_0.02_50)] border-t border-[oklch(0.85_0.02_70)]/50 pt-3">
                <span>Длина: <strong>{{ p.length_m }} м</strong></span>
                <span>Стенка: <strong>{{ p.wall_thickness_mm }} мм</strong></span>
              </div>
              <div class="mt-4 flex items-end justify-between border-t border-[oklch(0.85_0.02_70)] pt-4">
                <div>
                  <div class="text-[10px] text-[oklch(0.45_0.02_50)]">Цена сваи</div>
                  <div class="font-display text-xl font-bold text-brand">{{ formatRub(p.price) }}</div>
                </div>
                <div class="text-right">
                  <div class="text-[10px] text-[oklch(0.45_0.02_50)]">Монтаж под ключ</div>
                  <div class="text-sm font-semibold">{{ formatRub(p.price + p.install_price) }}</div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- TRUST BUILDER: DOCUMENTS -->
    <section class="bg-[oklch(0.99_0.005_80)] border-y border-[oklch(0.85_0.02_70)] py-16">
      <div class="container mx-auto px-4 max-w-5xl">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Юридическая гарантия</span>
          <h2 class="mt-2 font-display text-3xl font-bold">Работаем строго по договору</h2>
          <p class="mt-2 text-sm text-[oklch(0.45_0.02_50)]">Предоставляем клиенту полный пакет документов для отчётности и гарантии.</p>
        </div>
        <div class="grid gap-6 md:grid-cols-3">
          <div
            v-for="(doc, idx) in DOCS"
            :key="idx"
            class="p-6 rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.93_0.015_75)]/30 flex gap-4 hover:border-[oklch(0.42_0.16_25)] transition"
          >
            <div class="h-10 w-10 rounded bg-[oklch(0.42_0.16_25)]/10 text-brand grid place-items-center shrink-0">
              <FileCheckIcon class="h-5 w-5" />
            </div>
            <div>
              <h3 class="font-display text-base font-bold">{{ doc.title }}</h3>
              <p class="mt-1 text-xs text-[oklch(0.45_0.02_50)] leading-relaxed">{{ doc.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="container mx-auto px-4 py-16 lg:py-24 max-w-5xl">
      <div class="relative overflow-hidden rounded-2xl wood-texture text-[oklch(0.93_0.025_80)] p-8 md:p-14 shadow-elevated border border-[oklch(0.72_0.13_75)]/20">
        <div class="izba-roof absolute top-0 left-0 right-0 h-3" />
        <div class="relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 class="font-display text-3xl lg:text-4xl font-bold text-[oklch(0.93_0.025_80)] leading-tight">
              Бесплатный выезд на замер в Сургуте!
            </h2>
            <p class="mt-4 text-[oklch(0.93_0.025_80)]/85 text-sm leading-relaxed">
              Наш инженер приедет к вам на участок, проведет пробы грунта, рассчитает нужное количество и параметры свай абсолютно бесплатно. Вы получите точную смету фундамента.
            </p>
            <ul class="mt-6 space-y-2 text-[oklch(0.93_0.025_80)]/90 text-xs">
              <li v-for="t in CTA_LIST" :key="t" class="flex items-center gap-2">
                <CheckCircle2Icon class="h-4 w-4 text-gold shrink-0" /> {{ t }}
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-3">
            <NuxtLink to="/calculator" class="block">
              <button class="w-full flex items-center justify-center gap-2 h-14 text-base font-semibold rounded-md bg-[oklch(0.42_0.16_25)] hover:bg-[oklch(0.42_0.16_25)]/90 text-[oklch(0.98_0.01_80)] shadow border border-[oklch(0.72_0.13_75)]/20 transition">
                <AwardIcon class="h-5 w-5" /> Рассчитать смету онлайн
              </button>
            </NuxtLink>
            <a href="https://t.me/stroymantazh86" target="_blank" rel="noopener" class="block">
              <button class="w-full flex items-center justify-center gap-2 h-14 text-base font-semibold rounded-md bg-[oklch(0.93_0.025_80)] text-[oklch(0.18_0.01_40)] hover:bg-[oklch(0.72_0.13_75)] border border-[oklch(0.93_0.025_80)] transition">
                <SendIcon class="h-5 w-5" /> Написать в Telegram
              </button>
            </a>
            <a href="tel:+79992568800" class="block">
              <button class="w-full flex items-center justify-center gap-2 h-14 text-base font-semibold rounded-md bg-transparent border border-[oklch(0.93_0.025_80)]/40 text-[oklch(0.93_0.025_80)] hover:bg-[oklch(0.93_0.025_80)]/10 transition">
                <PhoneIcon class="h-5 w-5" /> +7 999 256-88-00
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight as ArrowRightIcon,
  Phone as PhoneIcon,
  Hammer as HammerIcon,
  Snowflake as SnowflakeIcon,
  Truck as TruckIcon,
  Shield as ShieldIcon,
  FileCheck as FileCheckIcon,
  CheckCircle2 as CheckCircle2Icon,
  Award as AwardIcon,
  Send as SendIcon,
} from 'lucide-vue-next'
import { formatRub } from '~/utils/format'

import SeoHead from '~/components/SeoHead.vue'

const { data, pending } = await useFetch('/api/products')
const featured = computed(() => (data.value?.products || []).slice(0, 16))

const STATS = [
  { v: '1000+', l: 'объектов' },
  { v: '5+ лет', l: 'опыт в сфере' },
  { v: '100+ лет', l: 'срок службы свай' },
]

const SPECS = [
  { label: 'Размеры свай', value: 'от 1.5 до 12 метров', desc: 'Любая длина и диаметры (57, 73, 89, 108, 133, 159, 219, 325 мм) всегда на складе.' },
  { label: 'Толщина стали', value: 'от 4 мм до 12 мм', desc: 'Применяем только новые прочные стальные трубы без коррозии и б/у металла.' },
  { label: 'Защита от коррозии', value: 'Мастичное покрытие', desc: 'Каждая свая покрывается специальной мастикой, гарантирующей срок службы 100+ лет.' },
  { label: 'Объемы монтажа', value: 'до 50 свай в день', desc: 'Собственные бригады монтажников со стажем 5+ лет и профессиональная спецтехника.' },
]

const FEATURES = [
  { icon: HammerIcon, title: 'Прямой производитель', desc: 'Цены завода без посредников. Любые типоразмеры в наличии на складе в Сургуте.' },
  { icon: SnowflakeIcon, title: 'Зимний монтаж свай', desc: 'Успешно производим установку в промерзший грунт при температуре до −40°C.' },
  { icon: TruckIcon, title: 'Доставка и спецтехника', desc: 'Своя спецтехника (КАМАЗы, мини-экскаваторы). Выезд по всему городу и ХМАО.' },
  { icon: ShieldIcon, title: 'Гарантия по договору', desc: 'Юридическая чистота сделки: предоставляем договор, акты и финансовые расписки.' },
]

const DOCS = [
  { title: 'Официальный договор', desc: 'Четко прописаны сроки, стоимость свай и монтажа' },
  { title: 'Гарантийная расписка', desc: 'Гарантия на фундамент и выполненные работы' },
  { title: 'Акт приема-передачи', desc: 'Двусторонний акт после проверки качества уровня' },
]

const CTA_LIST = [
  'Минимальный объем работ: от 100 м²',
  'Доступно мастеров: от 5 до 20 человек',
  'Выезжаем по всему Сургуту и ближайшим районам ХМАО',
]

const PREVIEW_PHOTOS = [
  '1.webp', '123.webp', '1231.webp', '12311.webp', '1231111.webp', '123112.webp',
  '1231123.webp', '123122222.webp', '1231223.webp', '1234.webp', '1234122.webp',
  '123441222.webp', '12345.webp', '123451.webp', '123456.webp', '1234567.webp',
]
</script>
