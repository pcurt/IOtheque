<script lang="ts" setup>
const { data } = await useAsyncGql('getProducts', { first: 6 });
const products = data.value?.products?.nodes || [];

useSeoMeta({
  title: `IOTheque`,
  ogTitle: `IOTheque`,
  description: `Site et boutique IOTheque.`,
  ogDescription: `Site et boutique IOTheque.`,
});
</script>

<template>
  <main>
    <section class="container my-16">
      <div class="grid justify-center">
        <h1 class="text-lg font-semibold md:text-2xl">Présentation</h1>
        <div class="text-lg my-8">
          <p>
            Chez IOtheque nous concevons et développons des produits électroniques durables et innovants. Nous cherchons à créer des produits agréables et faciles à utiliser. C’est
            à partir d’un besoin identifié que nous imaginons le produit qui répond à ces attentes. Nous impliquons l’utilisateur en développant l’ensemble de nos logiciels de
            manière open source.
          </p>
        </div>
      </div>
    </section>

    <section class="container grid gap-4 my-24 md:grid-cols-2">
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <Icon name="icons8:idea" size="200" />
        <div>
          <h3 class="text-xl font-semibold my-4">Nos valeurs</h3>
          <p>
            La durabilité est un aspect primordial guidant nos choix pendant le développement : composants évolutifs avec un long cycle de vie, utilisation de couches logicielles
            supportées par une grande communauté, etc.
          </p>
          <br />
          <p>Nos produits se veulent réparables facilement : documentation matérielle, conception modulaire, diffusion des documentations techniques</p>
          <br />
          <p>L’écologie guide nos choix techniques tout au long du développement : fournisseurs européens, assemblage en France, produits multifonctions</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <Icon name="pepicons-pop:question" size="200" />
        <div>
          <h3 class="text-xl font-semibold my-4">Qui sommes-nous</h3>
          <p>
            Nous sommes Pierrick et Thibaud, 2 ingénieurs passionnés du monde de l’électronique et de l’embarqué, et avons créé IOTheque en 2024. C’est plus précisément le secteur
            de la domotique qui nous a rapproché, et nous a donné envie de créer la société en créant un premier produit : Mapio.
          </p>
        </div>
      </div>
    </section>

    <section class="container my-16">
      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">{{ $t('messages.shop.shopByCategory') }}</h2>
        <NuxtLink class="text-primary" to="/categories">{{ $t('messages.general.viewAll') }}</NuxtLink>
      </div>
      <div class="grid justify-center grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-6">
        <ProductCard v-for="(product, i) in products" :key="i" class="w-full" :node="product" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}
</style>
