<script setup lang="ts">
const { frontEndUrl, wooNuxtSEO, isDev, stripHtml } = useHelpers();
const { path } = useRoute();
const { info } = defineProps({ info: { type: Object as PropType<Product>, required: true } });

const title = info.name;
const canonical = `${frontEndUrl}${path}`;
const siteName = 'IOTheque';

const img = useImage();
const imagePrefix = isDev ? '' : frontEndUrl;
const imageURL = info.image?.sourceUrl ?? '/images/placeholder.jpg';
const defaultImage = imagePrefix + img.getSizes(imageURL, { width: 1200, height: 630 }).src;
const description = info.shortDescription || info.description ? stripHtml(info.shortDescription) : stripHtml(info.description);

</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta v-if="description" name="description" hid="description" :content="description" />
    <Meta name="image" hid="image" :content="defaultImage" />
    <Meta property="og:site_name" hid="og:site_name" :content="siteName" />
    <Meta property="og:url" hid="og:url" :content="canonical" />
    <Meta v-if="info.name" property="og:title" hid="og:title" :content="info.name" />
    <Meta v-if="description" property="og:description" hid="og:description" :content="description" />
    <Meta property="og:image" hid="og:image" :content="defaultImage" />
    <Link rel="canonical" hid="canonical" :href="canonical" />
  </Head>
</template>
