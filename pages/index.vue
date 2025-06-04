<script lang="ts" setup>
const { data } = await useAsyncGql('getProducts', { first: 6 });
const products = data.value?.products?.nodes || [];

const news = [
  {
    title: "Le site maison-et-domotique.com parle de Mapio",
    date: "02/06/2024",
    url: "https://www.maison-et-domotique.com/162245-mapio-home-assistant-dans-tableau-electrique/"
  },
  {
    title: "Le site goodtech.info parle de Mapio",
    date: "30/05/2024",
    url: "https://goodtech.info/mapio-box-domotique-multimedia/"
  },
  {
    title: "Le site programmez.com parle de Mapio",
    date: "30/05/2024",
    url: "https://www.programmez.com/actualites/mapio-une-box-domotique-open-source-sur-ulule-37753"
  },
  {
    title: "Lancement de la campagne ulule de Mapio",
    date: "28/05/2024",
    content: "Notre premier produit Mapio est disponible en précommande !",
    url: "https://fr.ulule.com/mapio-box-domotique-multimedia"
  },
  {
    title: "Le site iGenerarion.fr parle de Mapio",
    date: "28/05/2024",
    url: "https://www.igen.fr/domotique/2025/05/mapio-gere-home-assistant-et-dautres-services-de-votre-choix-depuis-le-tableau-electrique-150171"
  }
];

function getPreviewImage(item) {
  if (item.image) return item.image;
  if (item.url)
    return `https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=false&meta=true&embed=image.url`;
  return '';
}

useSeoMeta({
  title: `IOTheque concepteur de produits électroniques innovants`,
  ogTitle: `IOTheque concepteur de produits électroniques innovants`,
  description: `IOTheque concepteur et développeur de produits électroniques durables et innovants. Le tout en open source avec une logique d'eco conception.`,
  ogDescription: `Site et boutique IOTheque, concepteur et développeur de produits électroniques durables et innovants.`,
  ogImage: "https://back.iotheque.com/wp-content/uploads/2025/06/logo_iotheque@4x.png",
});
</script>

<template>
  <main>
    <section class="container my-16">
      <div class="grid justify-center">
        <h1 class="text-lg font-semibold md:text-2xl">Présentation d'IOTheque</h1>
        <div class="text-lg my-8">
          <p>
            Chez IOtheque nous concevons et développons des produits électroniques durables et innovants. Nous cherchons à créer des produits agréables et faciles à utiliser. C’est
            à partir d’un besoin identifié que nous imaginons le produit qui répond à ces attentes. Nous impliquons l’utilisateur en développant l’ensemble de nos logiciels de
            manière open source.
          </p>
        </div>
      </div>
    </section>

    <!-- Section Actualité -->
    <section class="container my-16">
      <h2 class="text-lg font-semibold md:text-2xl mb-6">Actualités</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <div v-for="(item, i) in news" :key="i" class="p-6 bg-white rounded-lg shadow flex gap-4 items-start">
          <a v-if="item.url" :href="item.url" target="_blank" rel="noopener" class="block">
            <NuxtImg
              :src="getPreviewImage(item)"
              alt="miniature actualité"
              class="w-24 h-16 object-cover rounded"
              loading="eager"
              fetchpriority="high"
              preload
            />
          </a>
          <NuxtImg
            v-else-if="item.image"
            :src="item.image"
            alt="miniature actualité"
            class="w-24 h-16 object-cover rounded"
            loading="eager"
            fetchpriority="high"
            preload
          />
          <div>
            <h4 class="text-primary font-semibold mb-2">
              <a v-if="item.url" :href="item.url" target="_blank" rel="noopener" class="hover:underline">{{ item.title }}</a>
              <span v-else>{{ item.title }}</span>
            </h4>
            <div class="text-xs text-gray-500 mb-2">{{ item.date }}</div>
            <div>{{ item.content }}</div>
          </div>
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
      <div class="flex flex-col gap-8 p-8 bg-white rounded-lg">
        <h3 class="text-xl font-semibold my-4">Qui sommes-nous</h3>
        <div class="mt-8">
          <p>
            Nous sommes Pierrick et Thibaud, 2 ingénieurs passionnés du monde de l’électronique et de l’embarqué, et avons créé IOTheque en 2024. C’est plus précisément le secteur
            de la domotique qui nous a rapproché, et nous a donné envie de créer la société en créant un premier produit : Mapio.
          </p>
        </div>
        <div class="flex flex-col gap-8">
          <!-- Pierrick -->
          <div class="flex items-center gap-6">
            <img src="/images/pierrick.png" alt="Pierrick" class="w-40 h-40 rounded-full object-cover border-2 border-primary" />
            <div class="text-left">
              <div class="font-semibold">Pierrick</div>
              <div><span class="font-semibold">Rôle :</span> Président</div>
              <div><span class="font-semibold">Compétences :</span> Développement embarqué</div>
            </div>
          </div>
          <!-- Thibaud -->
          <div class="flex items-center gap-6">
            <img src="/images/thibaud.png" alt="Thibaud" class="w-40 h-40 rounded-full object-cover border-2 border-primary" />
            <div class="text-left">
              <div class="font-semibold">Thibaud</div>
              <div><span class="font-semibold">Rôle :</span> Directeur Général</div>
              <div><span class="font-semibold">Compétences :</span> Conception électronique</div>
            </div>
          </div>
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