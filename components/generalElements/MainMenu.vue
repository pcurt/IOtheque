<template>
  <nav>
    <NuxtLink to="/">{{ $t('messages.general.home') }}</NuxtLink>
    <NuxtLink to="/products">{{ $t('messages.general.allProducts') }}</NuxtLink>
    <NuxtLink to="/contact">{{ $t('messages.general.contact') }}</NuxtLink>
    <NuxtLink to="/blog">Blog</NuxtLink>
    <NuxtLink class="lg:hidden" to="/wishlist" :prefetch="false">Liste d'envies</NuxtLink>
    <NuxtLink class="lg:hidden" to="/my-account" :prefetch="false">Mon compte</NuxtLink>
  </nav>
</template>
