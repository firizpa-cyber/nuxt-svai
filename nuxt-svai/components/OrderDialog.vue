<template>
  <!-- Backdrop -->
  <div class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="bg-[oklch(0.99_0.005_80)] rounded-xl border border-[oklch(0.85_0.02_70)] shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-[oklch(0.85_0.02_70)]">
        <div>
          <h2 class="font-display text-2xl font-bold">Оформление заявки</h2>
          <p class="text-sm text-[oklch(0.45_0.02_50)] mt-1">Менеджер свяжется в течение 15 минут</p>
        </div>
        <button @click="$emit('close')" class="p-2 hover:bg-[oklch(0.93_0.015_75)] rounded-md transition">
          <XIcon class="h-5 w-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <!-- Items summary -->
        <div class="rounded-md border border-[oklch(0.85_0.02_70)] bg-[oklch(0.93_0.015_75)]/40 p-3 text-sm space-y-1.5 max-h-40 overflow-y-auto">
          <div v-for="(item, idx) in items" :key="idx" class="flex justify-between">
            <span>{{ item.name }} × {{ item.qty }}</span>
            <span class="font-medium">{{ formatRub(item.qty * item.price) }}</span>
          </div>
          <div class="flex justify-between pt-2 border-t border-[oklch(0.85_0.02_70)] font-semibold">
            <span>Итого</span>
            <span class="text-brand">{{ formatRub(total) }}</span>
          </div>
        </div>

        <!-- Contact fields -->
        <div class="grid gap-3 sm:grid-cols-2">
          <div>
            <label class="text-sm font-semibold">Имя *</label>
            <input
              v-model="form.name"
              required
              maxlength="120"
              class="mt-1 w-full rounded-md border border-[oklch(0.85_0.02_70)] px-3 py-2 text-sm focus:outline-none focus:border-[oklch(0.42_0.16_25)]"
            />
          </div>
          <div>
            <label class="text-sm font-semibold">Телефон *</label>
            <input
              v-model="form.phone"
              type="tel"
              required
              maxlength="30"
              class="mt-1 w-full rounded-md border border-[oklch(0.85_0.02_70)] px-3 py-2 text-sm focus:outline-none focus:border-[oklch(0.42_0.16_25)]"
            />
          </div>
        </div>

        <div>
          <label class="text-sm font-semibold">Email</label>
          <input
            v-model="form.email"
            type="email"
            maxlength="200"
            class="mt-1 w-full rounded-md border border-[oklch(0.85_0.02_70)] px-3 py-2 text-sm focus:outline-none focus:border-[oklch(0.42_0.16_25)]"
          />
        </div>

        <div>
          <label class="text-sm font-semibold">Адрес объекта</label>
          <input
            v-model="form.address"
            maxlength="500"
            class="mt-1 w-full rounded-md border border-[oklch(0.85_0.02_70)] px-3 py-2 text-sm focus:outline-none focus:border-[oklch(0.42_0.16_25)]"
          />
        </div>

        <div>
          <label class="text-sm font-semibold">Комментарий</label>
          <textarea
            v-model="form.comment"
            maxlength="2000"
            rows="3"
            class="mt-1 w-full rounded-md border border-[oklch(0.85_0.02_70)] px-3 py-2 text-sm focus:outline-none focus:border-[oklch(0.42_0.16_25)] resize-none"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full h-12 flex items-center justify-center text-sm font-semibold rounded-md bg-[oklch(0.42_0.16_25)] hover:bg-[oklch(0.42_0.16_25)]/90 text-[oklch(0.98_0.01_80)] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {{ loading ? 'Отправляем...' : 'Отправить заявку' }}
        </button>

        <p class="text-xs text-[oklch(0.45_0.02_50)] text-center">
          Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X as XIcon } from 'lucide-vue-next'
import { formatRub } from '~/utils/format'
import { useToast } from '~/composables/useToast'

interface OrderItem {
  name: string
  qty: number
  price: number
  product_id?: string
}

const props = defineProps<{
  items: OrderItem[]
  total: number
}>()

const emit = defineEmits<{
  close: []
}>()

const { success, error } = useToast()
const router = useRouter()

const loading = ref(false)
const form = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
  comment: '',
})

const handleSubmit = async () => {
  if (form.name.trim().length < 2) return error('Укажите имя')
  if (form.phone.trim().length < 5) return error('Укажите телефон')

  loading.value = true
  try {
    const res = await $fetch('/api/orders', {
      method: 'POST',
      body: {
        contact_name: form.name.trim(),
        contact_phone: form.phone.trim(),
        contact_email: form.email.trim() || undefined,
        address: form.address.trim() || undefined,
        comment: form.comment.trim() || undefined,
        items: props.items,
      },
    }) as any

    success(`Заявка №${res.order.order_number} принята. Перезвоним в течение 15 минут.`)
    emit('close')
    router.push('/orders')
  } catch (err: any) {
    error(err?.data?.message || 'Не удалось отправить заявку')
  } finally {
    loading.value = false
  }
}
</script>
