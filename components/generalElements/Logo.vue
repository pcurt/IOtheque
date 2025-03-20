<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const img = useImage();

const logoUrl = runtimeConfig?.public?.LOGO ? img(runtimeConfig?.public?.LOGO) : "null";
</script>

<template>
  <NuxtLink to="/">
    <div class="flex items-center gap-2 text-lg font-bold">
      <img :src="logoUrl" alt="Logo" class="object-contain h-10" />
      <span>IOTheque</span>
    </div>
  </NuxtLink>
</template>
