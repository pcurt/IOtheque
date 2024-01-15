<script setup lang="ts">
const route = useRoute();
const { articles } = useArticles();
</script>

<template>
  <Transition name="fade" mode="out-in">
    <section v-if="!!articles.length" class="relative w-full">
      <TransitionGroup name="shrink" tag="div" mode="in-out" class="article-grid">
        <ArticleCard v-for="(node, i) in articles" :key="node.databaseId || i" :node="node" :index="i" />
      </TransitionGroup>
    </section>
    <NoArticleFound v-else />
  </Transition>
</template>

<style lang="postcss" scoped>
.article-grid {
  @apply my-4 min-h-[600px] grid transition-all gap-8 lg:my-8;

  grid-template-columns: repeat(2, 1fr);
}
.article-grid:empty {
  display: none;
}

@media (min-width: 768px) {
  .article-grid {
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  }
}

.shrink-move {
  transition: all 400ms;
}

.shrink-leave-active {
  transition: transform 300ms;
  position: absolute;
  opacity: 0;
}

.shrink-enter-active {
  transition:
    opacity 400ms ease-out 200ms,
    transform 400ms ease-out;
  will-change: opacity, transform;
}

.shrink-enter,
.shrink-leave-to,
.shrink-enter-from {
  opacity: 0;
  transform: scale(0.75) translateY(25%);
}
</style>
