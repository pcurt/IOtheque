<script setup>
import Slider from 'primevue/slider';

const { getFilter, setFilter, isFiltersActive } = useFiltering();
const runtimeConfig = useRuntimeConfig();
const maxPrice = runtimeConfig?.public?.MAX_PRICE || 1000;
const activeFilters = ref(getFilter('price'));
const price = activeFilters.value.length ? ref(activeFilters.value) : ref([0, maxPrice]);
const isOpen = ref(true);

const resetSlider = () => {
  price.value = [0, maxPrice];
};

const applyPrice = () => {
  setFilter('price', price.value);
};

watch(isFiltersActive, () => {
  if (!isFiltersActive.value) resetSlider();
});
</script>

<template>
  <div>
    <div class="cursor-pointer flex font-semibold mt-8 leading-none justify-between items-center" @click="isOpen = !isOpen">
      <span>{{ $t('messages.shop.price') }}</span>
      <Icon name="ion:chevron-down-outline" class="transform" :class="isOpen ? 'rotate-180' : ''" />
    </div>
    <div v-show="isOpen" class="mt-3 grid gap-4 grid-cols-2">
      <div class="flex relative items-center">
        <input
          id="price-from"
          v-model="price[0]"
          class="bg-white border rounded-lg max-w-full border-gray-200 leading-none w-auto p-2 pl-6 md:text-sm"
          type="number"
          placeholder="From"
          min="0"
          @change="applyPrice" />
        <label for="price-from" class="leading-none px-2 text-gray-400 absolute">€</label>
      </div>
      <div class="flex relative items-center">
        <input
          id="price-to"
          v-model="price[1]"
          class="bg-white border rounded-lg max-w-full border-gray-200 leading-none w-auto p-2 pl-6 md:text-sm"
          type="number"
          placeholder="Up to"
          min="1"
          @change="applyPrice" />
        <label for="price-to" class="leading-none px-2 text-gray-400 absolute">€</label>
      </div>
      <div class="mx-1 mt-1 col-span-full px-1">
        <Slider v-model="price" aria-labelledby="price-range" range @slideend="applyPrice" :min="0" :max="maxPrice" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
@import url('primevue/resources/themes/aura-light-green/theme.css');

.p-slider-range {
  @apply bg-primary;
}
</style>
