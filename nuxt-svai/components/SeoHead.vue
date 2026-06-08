<script setup lang="ts">
import { useSeoMeta, useHead } from '#imports'

interface Props {
  title: string
  description: string
  keywords?: string
}

const props = defineProps<Props>()

useSeoMeta({
  title: props.title,
  description: props.description,
  keywords: props.keywords ?? ''
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Сваи Сургут',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Сургут'
        }
      })
    }
  ]
})
</script>

<template></template>
