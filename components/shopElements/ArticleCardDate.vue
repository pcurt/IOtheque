<script lang="ts" setup>
defineProps<{
  date: string
}>()

function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

</script>

<template>
  <time :datetime="date">
    {{ formatDate(date) }}
  </time>
</template>
