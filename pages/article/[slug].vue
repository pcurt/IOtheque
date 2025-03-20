<script lang="ts" setup>
const route = useRoute();
const slug = route.params.slug as string;

const { data } = (await useAsyncGql('getArticle', { slug })) as { data: { value: { post: SimpleArticle } } };
const article = ref<SimpleArticle>(data?.value?.post);

// Replace some wrong balise format for Tailwind CSS
let articleContent = article?.value?.content?.replace(/<h1 class="wp-block-heading">/g, '<h1 class="text-lg font-semibold md:text-2xl my-8">');
articleContent = articleContent?.replace(/<h2 class="wp-block-heading">/g, '<h2 class="text-lg font-semibold md:text-2xl my-8">');
articleContent = articleContent?.replace(/<a href=/g, '<a class="text-blue-500 hover:text-blue-600" href=');

const imgWidth = 600;
const imgHeight = Math.round(imgWidth * 1.125);
const mainImage = computed(() => article?.value?.featuredImage?.node?.sourceUrl);
</script>

<template>
  <main class="container relative py-6 xl:max-w-7xl" v-if="article">
    <BreadcrumbArticle :article="article" class="mb-6" />
    <h1 class="text-4xl">{{ article.title }}</h1>
    <NuxtImg
      :width="imgWidth"
      :height="imgHeight"
      :src="mainImage || '/images/placeholder.jpg'"
      :alt="article.title"
      :title="article.title"
      fit="outside"
      format="webp"
      densities="x1 x2" />
    <div class="article-content" v-html="articleContent"></div>
  </main>
</template>

<style lang="postcss" scoped></style>
