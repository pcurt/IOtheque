<script lang="ts" setup>
const { data: articles } = await useAsyncData(
  'content:home:latest-articles',
  () =>
    queryContent('/articles/')
      .where({
        top: { $ne: true },
        _partial: false,
      })
      .sort({ publishedAt: -1 })
      .only([
        '_path',
        'title',
        'categories',
        'description',
        'publishedAt',
        'image',
        'authors',
      ])
      .find()
)
</script>

<template>
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Grid -->
      <div
        class="bg-yellow-800/5 p-4 xl:-mx-12 lg:p-12 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <ArticleCard
          v-for="article in articles"
          :key="article._path"
          :to="article._path!"
          :title="article.title!"
          :description="article.description"
          :date="article.publishedAt"
          :image="article.image"
          :authors="article.authors"
          class="bg-transparent"
        />
      </div>
    </div>
  </section>
</template>
