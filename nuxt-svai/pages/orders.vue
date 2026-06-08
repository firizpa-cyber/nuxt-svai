<template>
  <div class="container mx-auto px-4 py-12 max-w-5xl">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <span class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Личный кабинет</span>
        <h1 class="mt-2 font-display text-3xl lg:text-4xl font-bold">Мои заказы</h1>
        <p class="text-sm text-[oklch(0.45_0.02_50)] mt-1">{{ currentUser }}</p>
      </div>
      <div class="flex gap-2">
        <button
          @click="signOut"
          class="inline-flex items-center gap-2 px-3 py-2 text-sm border border-[oklch(0.85_0.02_70)] rounded-md hover:border-[oklch(0.42_0.16_25)] transition"
        >
          <LogOutIcon class="h-4 w-4" /> Выйти
        </button>
      </div>
    </div>

    <div class="mt-8 space-y-4">
      <div v-if="pending" class="text-[oklch(0.45_0.02_50)]">Загрузка...</div>

      <div v-else-if="!orders.length" class="rounded-lg border-2 border-dashed border-[oklch(0.85_0.02_70)] p-12 text-center">
        <PackageIcon class="h-12 w-12 mx-auto text-[oklch(0.45_0.02_50)]" />
        <div class="mt-3 font-display text-lg font-semibold">Заказов пока нет</div>
        <p class="text-sm text-[oklch(0.45_0.02_50)] mt-1">Перейдите в каталог или калькулятор для оформления заказа.</p>
        <NuxtLink to="/catalog">
          <button class="mt-4 px-4 py-2 rounded-md bg-[oklch(0.42_0.16_25)] hover:bg-[oklch(0.42_0.16_25)]/90 text-[oklch(0.98_0.01_80)] text-sm font-semibold">
            В каталог
          </button>
        </NuxtLink>
      </div>

      <div
        v-else
        v-for="order in orders"
        :key="order.id"
        class="rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)] p-5 hover:border-[oklch(0.42_0.16_25)] transition"
      >
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-display text-xl font-bold">Заказ №{{ order.order_number }}</span>
              <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border" :class="STATUS_COLOR[order.status]">
                {{ STATUS_LABEL[order.status] }}
              </span>
            </div>
            <div class="text-xs text-[oklch(0.45_0.02_50)] mt-1 flex items-center gap-1">
              <CalendarIcon class="h-3 w-3" />
              {{ new Date(order.created_at).toLocaleString('ru-RU') }}
            </div>
          </div>
          <div class="text-right">
            <div class="text-xs text-[oklch(0.45_0.02_50)]">Сумма</div>
            <div class="font-display text-2xl font-bold text-brand">{{ formatRub(Number(order.total)) }}</div>
          </div>
        </div>

        <div v-if="order.status_note" class="mt-3 p-3 rounded bg-[oklch(0.93_0.015_75)] text-sm">
          <span class="font-semibold">Комментарий менеджера: </span>{{ order.status_note }}
        </div>

        <div class="mt-4 pt-4 border-t border-[oklch(0.85_0.02_70)]">
          <div class="text-xs uppercase tracking-wider text-[oklch(0.45_0.02_50)] mb-2">Состав</div>
          <div class="space-y-1 text-sm">
            <div v-for="(item, idx) in order.items" :key="idx" class="flex justify-between">
              <span>{{ item.name }} × {{ item.qty }}</span>
              <span class="font-medium">{{ formatRub(item.qty * item.price) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Package as PackageIcon,
  LogOut as LogOutIcon,
  Calendar as CalendarIcon,
} from 'lucide-vue-next'
import { formatRub, STATUS_LABEL, STATUS_COLOR } from '~/utils/format'

useHead({ title: 'Мои заказы — Личный кабинет' })

const router = useRouter()

const currentUser = ref('')

onMounted(() => {
  const session = localStorage.getItem('admin_session')
  if (!session) {
    router.replace('/auth')
    return
  }
  currentUser.value = session
})

const { data, pending, refresh } = await useFetch('/api/orders')
const orders = computed(() => data.value?.orders || [])

const signOut = () => {
  localStorage.removeItem('admin_session')
  router.push('/auth')
}
</script>
