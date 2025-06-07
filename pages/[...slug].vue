<script setup lang="ts">
const route = useRoute()
const { data: page, error } = await useAsyncData(route.path, () =>
  queryContent(route.path).findOne()
)

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogTitle: page.value?.title,
  ogDescription: page.value?.description,
})

const { data: relatedArticles } = await useAsyncData(
  `content:related-articles:${page.value?.title}`,
  () =>
    queryContent('/articles')
      .where({
        categories: { $in: page.value?.categories },
        _extension: 'md',
      })
      .only([
        '_path',
        'title',
        'categories',
        'description',
        'publishedAt',
        'image',
        'authors',
      ])
      .sort({ publishedAt: -1 })
      .limit(3)
      .find()
)

const runtimeConfig = useRuntimeConfig()

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString()
}

</script>

<template>
  <div v-if="page" class="container mx-auto px-4 py-12">
    <!-- Header -->
    <header class="max-w-5xl mx-auto text-center">
      <h1 class="text-4xl font-bold text-stone-900">{{ page.title }}</h1>
      <p class="mt-2 text-lg text-stone-600">{{ page.description }}</p>

      <NuxtImg
        v-if="page.image"
        :src="page.image.src"
        :alt="page.image.alt"
        class="mt-8 w-full object-cover rounded-lg aspect-[16/9]"
      />

      <dl class="mt-8 flex justify-between text-sm text-stone-700">
        <dd>
          <ol class="flex space-x-4">
            <li v-for="author in page.authors" :key="author.name">
              <NuxtLink
                :to="author.social"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-2"
              >
                <span>{{ author.name }}</span>
              </NuxtLink>
            </li>
          </ol>
        </dd>
        <dd>
          <time :datetime="page.publishedAt">
            {{ formatDate(page.publishedAt) }}
          </time>
        </dd>
      </dl>
    </header>

    <!-- Main Content -->
    <div
      class="mt-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[96px_768px_1fr] gap-8"
    >
      <!-- Social Share Buttons -->
      <div class="flex lg:flex-col lg:items-end gap-2">
        <a
          :href="`https://www.linkedin.com/shareArticle?url=${runtimeConfig.app.name}${page._path}&title=${page.title}`"
          target="_blank"
          class="p-2 border rounded hover:bg-blue-50"
        >
          <Icon name="simple-icons:linkedin" class="w-5 h-5" />
        </a>
      </div>

      <!-- Article Body -->
      <div class="prose prose-stone dark:prose-invert max-w-none">
        <ContentRenderer :value="page" />
      </div>

      <!-- Sidebar -->
      <aside class="space-y-8">

        <hr class="border-stone-200" />

        <div v-if="page.body?.toc?.links" class="text-sm">
          <p class="font-bold mb-2">Sommaire</p>
          <ul class="space-y-1">
            <li v-for="link in page.body.toc.links" :key="link.id">
              <NuxtLink :to="`#${link.id}`" class="hover:underline">
                {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <hr class="border-stone-200 lg:hidden" />
      </aside>
    </div>

    <!-- Related Articles -->
    <section v-if="relatedArticles" class="mt-16">
      <h2 class="text-2xl font-bold text-stone-900">Articles en lien</h2>
      <div class="mt-3 border-b border-stone-200" />
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ArticleCard
          v-for="article in relatedArticles"
          :key="article._path"
          :to="article._path!"
          :title="article.title!"
          :description="article.description"
          :date="article.publishedAt"
          :image="article.image"
          :authors="article.authors"
        />
      </div>
    </section>
  </div>
</template>
