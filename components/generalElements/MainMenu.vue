<template>
  <nav>
    <NuxtLink to="/">{{ $t('messages.general.home') }}</NuxtLink>
    <NuxtLink to="/products">{{ $t('messages.general.allProducts') }}</NuxtLink>
    <NuxtLink to="/contact">{{ $t('messages.general.contact') }}</NuxtLink>
    <NuxtLink to="/blog">Blog</NuxtLink>
    <NuxtLink to="https://github.com/pcurt/yocto-build">
      <Icon name="mdi:github" size="20" />
    </NuxtLink>
    <NuxtLink to="https://mapio-docs.readthedocs.io/en/latest/">
      <Icon name="devicon:readthedocs" size="20" />
    </NuxtLink>
    <NuxtLink class="lg:hidden" to="/wishlist" :prefetch="false">Liste d'envies</NuxtLink>
    <NuxtLink class="lg:hidden" to="/my-account" :prefetch="false">Mon compte</NuxtLink>
  </nav>
</template>
