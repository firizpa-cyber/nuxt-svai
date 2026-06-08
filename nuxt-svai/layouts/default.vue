<template>
  <div class="min-h-screen flex flex-col bg-[oklch(0.97_0.01_80)] text-[oklch(0.18_0.02_40)]">
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
    <!-- Toast notifications -->
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
// Inject Schema.org LocalBusiness structured data on every page
useLocalBusinessSchema()
</script>
