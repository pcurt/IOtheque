<script setup>
const { setArticles, updateArticleList } = useArticles();
const route = useRoute();

const { isQueryEmpty } = useHelpers();

const { data } = await useAsyncGql('getArticles');

const allArticles = data.value?.posts?.nodes ?? [];
setArticles(allArticles);

onMounted(() => {
  if (!isQueryEmpty.value) updateArticleList();
});

watch(
  () => route.query,
  () => {
    if (route.name !== 'Articles') return;
    updateArticleList();
  },
);

useHead({
  title: 'Blog',
  meta: [{ hid: 'description', name: 'description', content: 'Blog' }],
});
</script>

<template>
  <div class="container flex items-start gap-16" v-if="allArticles.length">
    <div class="w-full">
      <PostsList />
    </div>
  </div>
  <NoArticlesFound v-else>Could not fecth Articles from your store. Please check your configuration.</NoArticlesFound>
</template>
