<script lang="ts" setup>
defineProps<{
  to: string
  title: string
  description: string
  date?: string
  image?: {
    src: string
    alt: string
  }
  authors?: {
    name: string
    social: string
  }[]
}>()
</script>

<template>
  <UCard
    as="article"
    :ui="{ base: 'relative group' }"
  >
    <header>
      <div
        v-if="image"
        class="overflow-hidden rounded-md"
      >
        <NuxtLink :to="to">
          <NuxtImg
            :src="image.src"
            :alt="image.alt"
            class="w-full h-48 object-cover transform group-hover:scale-[101%] transition-transform ease-in duration-200"
          />
        </NuxtLink>
      </div>

      <h3 class="mt-6 text-lg font-semibold">
        <NuxtLink :to="to">
          {{ title }}
        </NuxtLink>
      </h3>
    </header>

    <p class="mt-2 text-stone-500">
      {{ description }}
    </p>

    <footer class="mt-4">
      <dl
        v-if="date || authors"
        class="flex justify-between items-center text-sm"
      >
        <template v-if="date">
          <dt class="sr-only">
            Published at
          </dt>
          <dd>
            <ArticleCardDate :date="date" />
          </dd>
        </template>
      </dl>
    </footer>
  </UCard>
</template>

