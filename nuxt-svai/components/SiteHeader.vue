<template>
  <header class="sticky top-0 z-50 border-b border-[oklch(0.85_0.02_70)] bg-[oklch(0.97_0.01_80)]/95 backdrop-blur">
    <!-- Top gradient stripe -->
    <div class="h-1 bg-gradient-to-r from-[oklch(0.42_0.16_25)] via-[oklch(0.72_0.13_75)] to-[oklch(0.42_0.16_25)]" />

    <div class="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="flex flex-col">
          <img src="/logo.webp" alt="Завод винтовых свай" class="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
          <div class="text-[10px] text-[oklch(0.45_0.02_50)] uppercase tracking-wider mt-1">Завод винтовых свай · Сургут</div>
        </div>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-1">
        <NuxtLink
          v-for="item in NAV"
          :key="item.to"
          :to="item.to"
          class="px-3 py-2 text-sm font-medium text-[oklch(0.18_0.02_40)]/80 hover:text-[oklch(0.42_0.16_25)] transition-colors relative"
          :class="{ 'text-[oklch(0.42_0.16_25)]': isActive(item.to) }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Right side controls -->
      <div class="flex items-center gap-2">
        <a
          href="tel:+79992568800"
          class="hidden md:flex items-center gap-2 text-sm font-semibold text-[oklch(0.18_0.02_40)] hover:text-[oklch(0.42_0.16_25)]"
        >
          <PhoneIcon class="h-4 w-4" />
          +7 999 256-88-00
        </a>

        <!-- Cart button -->
        <NuxtLink to="/cart">
          <button class="relative flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[oklch(0.85_0.02_70)] rounded-md hover:border-[oklch(0.42_0.16_25)] transition-colors">
            <ShoppingCartIcon class="h-4 w-4" />
            <span class="hidden sm:inline">Корзина</span>
            <span
              v-if="cartCount > 0"
              class="absolute -top-1 -right-1 h-5 w-5 bg-[oklch(0.42_0.16_25)] text-[oklch(0.98_0.01_80)] text-xs font-bold rounded-full flex items-center justify-center"
            >
              {{ cartCount }}
            </span>
          </button>
        </NuxtLink>

        <!-- Mobile menu toggle -->
        <button
          class="lg:hidden p-2 -mr-2"
          @click="mobileOpen = !mobileOpen"
          aria-label="Меню"
        >
          <XIcon v-if="mobileOpen" class="h-5 w-5" />
          <MenuIcon v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileOpen" class="lg:hidden border-t border-[oklch(0.85_0.02_70)] bg-[oklch(0.97_0.01_80)]">
      <div class="container mx-auto px-4 py-3 flex flex-col gap-1">
        <NuxtLink
          v-for="item in NAV"
          :key="item.to"
          :to="item.to"
          class="py-2.5 px-3 rounded text-sm font-medium hover:bg-[oklch(0.93_0.015_75)]"
          :class="{ 'text-[oklch(0.42_0.16_25)] bg-[oklch(0.93_0.015_75)]': isActive(item.to) }"
          @click="mobileOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
        <a
          href="tel:+79992568800"
          class="py-2.5 px-3 rounded text-sm font-semibold flex items-center gap-2 text-[oklch(0.42_0.16_25)]"
        >
          <PhoneIcon class="h-4 w-4" /> +7 999 256-88-00
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Phone as PhoneIcon, Menu as MenuIcon, X as XIcon, ShoppingCart as ShoppingCartIcon } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const mobileOpen = ref(false)

const NAV = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/prices', label: 'Цены' },
  { to: '/calculator', label: 'Калькулятор' },
  { to: '/about', label: 'О компании' },
  { to: '/contacts', label: 'Контакты' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

// Cart count from localStorage
const cartCount = ref(0)

const updateCart = () => {
  if (import.meta.client) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cartCount.value = cart.reduce((sum: number, item: any) => sum + item.qty, 0)
    
  }
}

onMounted(() => {
  updateCart()
  window.addEventListener('cart-updated', updateCart)
  window.addEventListener('storage', updateCart)
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('cart-updated', updateCart)
    window.removeEventListener('storage', updateCart)
  }
})

// Close mobile menu on route change
watch(() => route.path, () => { mobileOpen.value = false })
</script>
