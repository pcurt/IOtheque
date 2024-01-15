<script setup lang="ts">
const router = useRouter();
const { isShowingSearch } = useSearching();

const goToContact = () => {
  router.push(`/contact`);
};
</script>

<template>
  <header class="sticky top-0 z-40 bg-white shadow-sm shadow-light-500">
    <div class="container flex items-center justify-between py-4">
      <div class="flex items-center">
        <MenuTrigger class="lg:hidden" />
        <Logo class="md:w-[160px]" />
      </div>
      <MainMenu class="items-center hidden gap-6 text-sm text-gray-500 lg:flex lg:px-4" />
      <div class="flex gap-4 justify-end items-center md:w-[160px] flex-1 ml-auto">
        <nuxt-link to="https://github.com/pcurt/yocto-build" target="_blank">
          <Icon name="mdi:github" size="20" />
        </nuxt-link>
        <nuxt-link to="https://mapio-docs.readthedocs.io/en/latest/" target="_blank">
          <Icon name="devicon:readthedocs" size="20" />
        </nuxt-link>
        <ProductSearch class="hidden sm:inline-flex max-w-[320px] w-[60%]" />
        <SearchTrigger />
        <NuxtLink to="/wishlist" title="Wishlist">
          <Icon name="ion:heart-outline" size="20" />
        </NuxtLink>
        <SignInLink />
        <CartTrigger />
      </div>
    </div>
    <Transition name="scale-y" mode="out-in">
      <div class="container mb-3 -mt-1 sm:hidden" v-if="isShowingSearch">
        <ProductSearch class="flex w-full" />
      </div>
    </Transition>
    <UAlert
    title="Soyez informé(e) de la sortie de MAPIO !"
    description="Inscrivez vous via notre formulaire de contact"
    :id="2"
    :timeout="0"
    @click="goToContact()"
    color="primary"
    variant="solid"
  />
  </header>
</template>
