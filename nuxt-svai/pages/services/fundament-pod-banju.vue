<template>
  <SeoHead title="Фундамент под баню на сваях в Сургуте — монтаж за 4 часа | СтройМонтаж-86" description="Свайный фундамент под баню в Сургуте. Монтаж за 4–6 часов. Для бани 3×4, 4×6, 6×6. Цены от 18 000 ₽. Подходит для любых грунтов ХМАО." keywords="фундамент под баню Сургут, сваи для бани, свайный фундамент для бани цена, баня на сваях Сургут, фундамент под баню на сваях ХМАО" />
  <div>
    <section class="relative overflow-hidden border-b border-[oklch(0.85_0.02_70)] bg-[oklch(0.18_0.01_40)] py-16 text-[oklch(0.93_0.025_80)]">
      <div class="absolute inset-0 opacity-20 wood-texture" />
      <div class="relative container mx-auto px-4 max-w-4xl">
        <nav class="text-xs text-[oklch(0.93_0.025_80)]/50 mb-4 flex items-center gap-1">
          <NuxtLink to="/" class="hover:text-[oklch(0.93_0.025_80)]">Главная</NuxtLink>
          <span>/</span>
          <span>Фундамент под баню</span>
        </nav>
        <h1 class="font-display text-4xl sm:text-5xl font-bold leading-tight">
          Фундамент под баню на винтовых сваях в Сургуте
        </h1>
        <p class="mt-4 text-lg text-[oklch(0.93_0.025_80)]/80 max-w-2xl">
          Быстрый, надёжный и недорогой свайный фундамент для бани. Монтаж за 4–6 часов.
          Подходит для влажных, торфяных и пучинистых грунтов Сургута.
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

    <!-- Why svaи for banya -->
    <section class="container mx-auto px-4 py-16 max-w-5xl">
      <h2 class="font-display text-3xl font-bold mb-4">Почему сваи — лучший выбор для бани</h2>
      <p class="text-[oklch(0.45_0.02_50)] mb-10 max-w-3xl">
        Баня — небольшой, лёгкий объект. Ленточный или монолитный фундамент для неё — это переплата в 2–3 раза и месяц ожидания. Сваи ставятся за один день, стоят дешевле и служат столько же.
      </p>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="p in PROS" :key="p.title" class="p-5 rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)] relative">
          <div class="izba-roof absolute top-0 left-0 right-0 h-1" />
          <h3 class="font-semibold text-brand">{{ p.title }}</h3>
          <p class="mt-2 text-sm text-[oklch(0.45_0.02_50)]">{{ p.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Sizes -->
    <section class="bg-[oklch(0.93_0.015_75)]/40 border-y border-[oklch(0.85_0.02_70)] py-16">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="font-display text-3xl font-bold mb-10">Сколько свай нужно для бани</h2>
        <div class="overflow-x-auto rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)]">
          <table class="w-full text-sm text-left">
            <thead>
              <tr class="bg-[oklch(0.42_0.16_25)] text-[oklch(0.98_0.01_80)] text-xs uppercase tracking-wider">
                <th class="p-4">Размер бани</th>
                <th class="p-4">Количество свай</th>
                <th class="p-4">Диаметр</th>
                <th class="p-4 text-right">Примерная цена</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[oklch(0.85_0.02_70)]">
              <tr v-for="s in SIZES" :key="s.size" class="hover:bg-[oklch(0.93_0.015_75)]/40">
                <td class="p-4 font-semibold">{{ s.size }}</td>
                <td class="p-4">{{ s.count }}</td>
                <td class="p-4 text-[oklch(0.45_0.02_50)]">{{ s.dia }}</td>
                <td class="p-4 text-right font-bold text-brand">{{ s.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-xs text-[oklch(0.45_0.02_50)] mt-3">* Цены включают сваи и монтаж. Точный расчёт — через калькулятор.</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="container mx-auto px-4 py-16 max-w-5xl">
      <div class="rounded-2xl wood-texture text-[oklch(0.93_0.025_80)] p-8 md:p-12 text-center relative overflow-hidden">
        <div class="izba-roof absolute top-0 left-0 right-0 h-3" />
        <h2 class="font-display text-3xl font-bold">Фундамент под баню за 1 день</h2>
        <p class="mt-3 text-[oklch(0.93_0.025_80)]/80 max-w-xl mx-auto">Позвоните сегодня — завтра приедем на замер бесплатно</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <NuxtLink to="/calculator">
            <button class="h-12 px-8 font-semibold rounded-md bg-[oklch(0.42_0.16_25)] hover:bg-[oklch(0.42_0.16_25)]/90 text-[oklch(0.98_0.01_80)] transition">
              Калькулятор
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
</template>

<script setup lang="ts">


const PROS = [
  { title: 'Монтаж за 4–6 часов', desc: 'Стандартная баня 4×6 — 9–12 свай — ставится за один рабочий день' },
  { title: 'Не нужен котлован', desc: 'Никакой грязи и земляных работ, участок остаётся чистым' },
  { title: 'Подходит для болот', desc: 'Работает на торфяных, заболоченных и пучинистых грунтах Сургута' },
  { title: 'Дешевле бетонного', desc: 'В 2–3 раза дешевле ленточного фундамента при одинаковой надёжности' },
  { title: 'Можно строить сразу', desc: 'После монтажа можно начинать строительство в тот же день' },
  { title: 'Срок службы 100 лет', desc: 'Стальные сваи с мастичным покрытием не гниют и не ржавеют' },
]

const SIZES = [
  { size: 'Баня 3×4 м', count: '6–9 свай', dia: 'Ø89 мм', price: 'от 18 000 ₽' },
  { size: 'Баня 4×6 м', count: '9–12 свай', dia: 'Ø89 мм', price: 'от 25 000 ₽' },
  { size: 'Баня 5×7 м', count: '12–16 свай', dia: 'Ø108 мм', price: 'от 36 000 ₽' },
  { size: 'Баня 6×6 м', count: '9–16 свай', dia: 'Ø108 мм', price: 'от 32 000 ₽' },
]
</script>
