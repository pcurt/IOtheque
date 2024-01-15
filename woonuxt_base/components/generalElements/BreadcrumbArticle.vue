<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const { formatURI } = useHelpers();

const { article } = defineProps<{ article: Article }>();

const format = computed(() => [
  { name: 'Article', slug: '/blog' },
  { name: article.title },
]);
</script>

<template>
  <div class="flex text-sm leading-none text-gray-400 gap-1 items-center">
    <span>
      <NuxtLink to="/" class="hover:text-primary">{{ $t('messages.general.home') }}</NuxtLink>
      <span> /</span>
    </span>
    <span v-for="(link, i) in format" :key="link.name || i">
      <NuxtLink v-if="link.slug" :to="formatURI(link.slug)" class="hover:text-primary">{{ link.name }}</NuxtLink>
      <span v-else class="text-gray-800">{{ link.name }}</span>
      <span v-if="i + 1 < format.length"> /</span>
    </span>
  </div>
</template>
