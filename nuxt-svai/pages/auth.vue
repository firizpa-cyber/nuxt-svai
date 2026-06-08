<template>
  <div class="container mx-auto px-4 py-12 max-w-md">
    <h1 class="font-display text-3xl font-bold text-center">Личный кабинет</h1>
    <p class="text-center text-[oklch(0.45_0.02_50)] mt-2 text-sm">Отслеживайте статус заказов в реальном времени</p>

    <div class="mt-8 rounded-lg border border-[oklch(0.85_0.02_70)] bg-[oklch(0.99_0.005_80)] p-6 shadow-card">
      <form @submit.prevent="handleLogin" class="space-y-4 mt-4">
        <div>
          <label class="text-sm font-medium">Логин</label>
          <input
            v-model="username"
            required
            placeholder="admin"
            class="mt-1 w-full rounded-md border border-[oklch(0.85_0.02_70)] px-3 py-2 text-sm focus:outline-none focus:border-[oklch(0.42_0.16_25)]"
          />
        </div>
        <div>
          <label class="text-sm font-medium">Пароль</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="admin123"
            class="mt-1 w-full rounded-md border border-[oklch(0.85_0.02_70)] px-3 py-2 text-sm focus:outline-none focus:border-[oklch(0.42_0.16_25)]"
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full h-10 flex items-center justify-center text-sm font-semibold rounded-md bg-[oklch(0.42_0.16_25)] hover:bg-[oklch(0.42_0.16_25)]/90 text-[oklch(0.98_0.01_80)] disabled:opacity-50 transition"
        >
          Войти
        </button>
        <p class="text-xs text-[oklch(0.45_0.02_50)] text-center">
          Демо: admin / admin123 или manager / manager123
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

useHead({ title: 'Вход — Завод винтовых свай' })

const router = useRouter()
const { success, error } = useToast()

const username = ref('')
const password = ref('')
const loading = ref(false)

// Redirect if already logged in
onMounted(() => {
  if (localStorage.getItem('admin_session')) {
    router.replace('/orders')
  }
})

const CREDENTIALS = [
  { username: 'admin', password: 'admin123' },
  { username: 'manager', password: 'manager123' },
]

const handleLogin = () => {
  const valid = CREDENTIALS.some(
    (c) => c.username === username.value && c.password === password.value
  )
  if (valid) {
    localStorage.setItem('admin_session', username.value)
    success('Добро пожаловать!')
    router.push('/orders')
  } else {
    error('Неверный логин или пароль')
  }
}
</script>
