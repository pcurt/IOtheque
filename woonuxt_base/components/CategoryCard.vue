<script setup lang="ts">
const { formatURI } = useHelpers();
const props = defineProps(['node']);
</script>

<template>
  <NuxtLink
    v-if="node"
    :to="`/product-category/${formatURI(node.slug)}`"
    class="relative flex justify-center overflow-hidden border border-white rounded-xl item snap-mandatory snap-x">
    <NuxtImg
      v-if="node.image?.sourceUrl"
      width="250"
      height="300"
      class="absolute inset-0 object-cover w-full h-full skeleton"
      :src="node.image?.sourceUrl"
      :alt="node.image?.altText || node.name"
      :title="node.image?.title || node.name"
      loading="lazy"
      format="wep"
      fit="outside" />
    <div class="absolute inset-x-0 bottom-0 opacity-50 bg-gradient-to-t from-black to-transparent h-1/2" />
    <span class="relative z-10 mt-auto mb-2 text-sm font-semibold text-white capitalize md:text-base md:mb-4" v-html="node.name" />
  </NuxtLink>
</template>

<style lang="postcss" scoped>
.item {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  aspect-ratio: 4 / 5;
}
</style>
