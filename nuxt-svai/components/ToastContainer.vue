<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <TransitionGroup name="toast" tag="div" class="flex flex-col gap-2">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg text-sm font-medium"
          :class="{
            'bg-[oklch(0.99_0.005_80)] border-[oklch(0.85_0.02_70)] text-[oklch(0.18_0.02_40)]': toast.type === 'default',
            'bg-green-50 border-green-200 text-green-900': toast.type === 'success',
            'bg-red-50 border-red-200 text-red-900': toast.type === 'error',
          }"
        >
          <CheckCircleIcon v-if="toast.type === 'success'" class="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
          <XCircleIcon v-else-if="toast.type === 'error'" class="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
          <InfoIcon v-else class="h-4 w-4 text-[oklch(0.42_0.16_25)] shrink-0 mt-0.5" />
          <span>{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { CheckCircle as CheckCircleIcon, XCircle as XCircleIcon, Info as InfoIcon } from 'lucide-vue-next'
import { useToast } from '~/composables/useToast'

const { toasts } = useToast()
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
