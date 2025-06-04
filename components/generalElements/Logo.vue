<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const img = useImage();

const logo = "https://back.iotheque.com/wp-content/uploads/2025/06/logo_iotheque_books@4x.png"
const name = "https://back.iotheque.com/wp-content/uploads/2025/06/logo_iotheque_text@4x.png"
</script>

<template>
  <NuxtLink to="/">
    <div class="flex items-center gap-2 text-lg font-bold">
      <img :src="logo" alt="Logo" class="object-contain h-10" />
      <span><img :src="name" alt="Logo" class="object-contain h-8" /></span>
    </div>
  </NuxtLink>
</template>
