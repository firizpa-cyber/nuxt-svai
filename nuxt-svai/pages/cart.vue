<template>
  <div class="container mx-auto px-4 py-12 lg:py-16 max-w-5xl">
    <NuxtLink to="/catalog" class="inline-flex items-center gap-2 text-sm text-[oklch(0.45_0.02_50)] hover:text-[oklch(0.18_0.02_40)] mb-6">
      <ArrowLeftIcon class="h-4 w-4" /> Вернуться в каталог
    </NuxtLink>

    <div class="flex items-center gap-3 mb-8">
      <ShoppingCartIcon class="h-8 w-8 text-brand" />
      <h1 class="font-display text-3xl lg:text-4xl font-bold">Корзина</h1>
    </div>

    <!-- Empty -->
    <div v-if="!cart.length" class="rounded-lg border-2 border-dashed border-[oklch(0.85_0.02_70)] p-12 text-center">
      <PackageIcon class="h-16 w-16 mx-auto text-[oklch(0.45_0.02_50)]" />
      <div class="mt-4 font-display text-lg font-semibold">Корзина пуста</div>
      <p class="text-sm text-[oklch(0.45_0.02_50)] mt-2">Добавьте товары из каталога</p>
      <NuxtLink to="/catalog">
        <button class="mt-4 px-4 py-2 rounded-md bg-[oklch(0.42_0.16_25)] hover:bg-[oklch(0.42_0.16_25)]/90 text-[oklch(0.98_0.01_80)] text-sm font-semibold">
          В каталог
        </button>
      </NuxtLink>
    </div>

    <div v-else class="grid gap-6 lg:grid-cols-[1fr_380px]">
      <!-- Items -->
      <div class="space-y-4">
        <div
          v-for="item in cart"
          :key="item.product_id"
          class="rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)] p-5 hover:border-[oklch(0.42_0.16_25)] transition"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <h3 class="font-display font-semibold">{{ item.name }}</h3>
              <div class="text-xs text-[oklch(0.45_0.02_50)] mt-1">
                Свая {{ formatRub(item.price) }} + монтаж {{ formatRub(item.install_price) }}
              </div>
            </div>
            <button @click="remove(item.product_id)" class="text-[oklch(0.45_0.02_50)] hover:text-red-600 p-1" aria-label="Удалить">
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
            <div class="font-display text-xl font-bold text-brand">
              {{ formatRub(item.qty * (item.price + item.install_price)) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <aside class="lg:sticky lg:top-24 lg:self-start">
        <div class="rounded-lg border-2 border-[oklch(0.42_0.16_25)]/20 bg-[oklch(0.99_0.005_80)] p-6 shadow-elevated">
          <div class="font-display text-xl font-bold">Итого</div>
          <div class="mt-4 space-y-2.5 text-sm">
            <div class="flex justify-between">
              <span class="text-[oklch(0.45_0.02_50)]">Количество</span>
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
          <NuxtLink to="/order">
            <button class="w-full mt-5 flex items-center justify-center gap-2 h-12 text-sm font-semibold rounded-md bg-[oklch(0.42_0.16_25)] hover:bg-[oklch(0.42_0.16_25)]/90 text-[oklch(0.98_0.01_80)] transition">
              <ShoppingCartIcon class="h-4 w-4" /> Оформить заявку
            </button>
          </NuxtLink>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeft as ArrowLeftIcon,
  ShoppingCart as ShoppingCartIcon,
  Package as PackageIcon,
  Trash2 as Trash2Icon,
  Minus as MinusIcon,
  Plus as PlusIcon,
} from 'lucide-vue-next'
import { formatRub } from '~/utils/format'
import { useCart } from '~/composables/useCart'

useHead({ title: 'Корзина — Завод винтовых свай' })

const { cart, updateQty, setQty, remove, totalQty, totalPiles, totalInstall, grandTotal } = useCart()
</script>
