import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: `%s`,
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  experimental: {
    sharedPrerenderData: true,
  },

  plugins: [resolve('./plugins/init.ts')],

  components: [{ path: resolve('./components'), pathPrefix: false }],

  modules: ['woonuxt-settings', 'nuxt-graphql-client', '@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxt/image', '@nuxtjs/i18n', 'nuxt-primevue'],

  'graphql-client': {
    clients: {
      default: {
        host: process.env.GQL_HOST || 'http://localhost:4000/graphql',
        corsOptions: { mode: 'cors', credentials: 'include' },
      },
    },
  },

  image: {
    domains: process.env.NUXT_IMAGE_DOMAINS ? process.env.NUXT_IMAGE_DOMAINS.replace(/ /g, '').split(',') : [],
    IMAGE_PROVIDER: process.env.IMAGE_PROVIDER || 'ipx',
    screens: { sm: 640, md: 768, lg: 1024, xl: 1280 },
  },

  primevue: {
    components: {
      include: ['Slider'],
    },
  },

  hooks: {
    'pages:extend'(pages) {
      const addPage = (name: string, path: string, file: string) => {
        pages.push({ name, path, file: resolve(file) });
      };

      addPage('product-page-pager', '/products/page/:pageNumber', './pages/products.vue');
      addPage('product-category-page', '/product-category/:categorySlug', './pages/product-category/[slug].vue');
      addPage('product-category-page-pager', '/product-category/:categorySlug/page/:pageNumber', './pages/product-category/[slug].vue');
      addPage('order-received', '/checkout/order-received/:orderId', './pages/order-summary.vue');
      addPage('order-summary', '/order-summary/:orderId', './pages/order-summary.vue');
    },
  },

  nitro: {
    routeRules: {
      '/checkout/order-received/**': { ssr: false },
      '/order-summary/**': { ssr: false },
    },
  },

  // Multilingual support
  i18n: {
    locales: [
      { code: 'en_US', file: 'en-US.json', name: 'English 🇺🇸' },
      { code: 'de_DE', file: 'de-DE.json', name: 'Deutsch 🇩🇪' },
      { code: 'es_ES', file: 'es-ES.json', name: 'Español 🇪🇸' },
      { code: 'fr_FR', file: 'fr-FR.json', name: 'Français 🇫🇷' },
      { code: 'it_IT', file: 'it-IT.json', name: 'Italiano 🇮🇹' },
      { code: 'pt_BR', file: 'pt-BR.json', name: 'Português 🇧🇷' },
    ],
    langDir: 'locales',
    defaultLocale: 'fr_FR',
    strategy: 'no_prefix',
  },
});
