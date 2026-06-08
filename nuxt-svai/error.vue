<template>
  <div class="flex min-h-screen items-center justify-center bg-[oklch(0.97_0.01_80)] px-4">
    <div class="max-w-md text-center">
      <h1 class="font-display text-7xl font-bold text-[oklch(0.42_0.16_25)]">
        {{ error?.statusCode || 500 }}
      </h1>
      <h2 class="mt-4 text-xl font-semibold">
        {{ error?.statusCode === 404 ? 'Страница не найдена' : 'Произошла ошибка' }}
      </h2>
      <p class="mt-2 text-sm text-[oklch(0.45_0.02_50)]">
        {{ error?.statusCode === 404 ? 'Возможно, страница удалена или перемещена.' : 'Попробуйте обновить страницу.' }}
      </p>
      <div class="mt-6 flex justify-center gap-3">
        <button
          @click="handleError"
          class="rounded-md bg-[oklch(0.42_0.16_25)] px-4 py-2 text-sm font-medium text-[oklch(0.98_0.01_80)] hover:bg-[oklch(0.42_0.16_25)]/90"
        >
          На главную
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: any }>()

const handleError = () => clearError({ redirect: '/' })
</script>
