<script setup>
const { formatURI } = useHelpers();
const route = useRoute();
const { node } = defineProps({
  node: { type: Object, default: null },
  index: { type: Number, default: 1 },
});

const imgWidth = 220;
const imgHeight = Math.round(imgWidth * 1.125);

const mainImage = computed(() => node?.featuredImage?.node?.sourceUrl);

</script>

<template>
  <div class="relative article-card">
    <NuxtLink :to="`/article/${formatURI(node.slug)}`" :title="node.title">
      <NuxtImg
        :width="imgWidth"
        :height="imgHeight"
        :src="mainImage || '/images/placeholder.jpg'"
        :alt="node.featuredImage?.altText || node.title"
        :title="node.featuredImage?.altText || node.title"
        :loading="index <= 3 ? 'eager' : 'lazy'"
        fit="outside"
        format="webp"
        densities="x1 x2" />
    </NuxtLink>
    <div class="p-2">
      <NuxtLink :to="`/article/${formatURI(node.slug)}`" :title="node.title">
        <h2 class="mb-2 font-light leading-tight">{{ node.title }}</h2>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="postcss">
.article-card img {
  @apply rounded-lg object-top object-cover w-full;
  aspect-ratio: 1/1.125;
}
.article-card:hover {
  h2 {
    @apply text-primary;
  }
}
</style>
