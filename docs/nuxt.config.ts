export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['@nuxtjs/i18n', '@nuxt/fonts'],

  llms: {
    domain: 'http://localhost:3000',
  },
  mcp: {
    enabled: false,
  },

  css: ['~/assets/css/main.css'],

  // Alias para importar componentes de Spartan
  alias: {
    '@spartan': '../src/components/spartan',
    '@lib': '../src',
  },

  app: {
    head: {
      title: 'Spartan Documentation',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/landing/dark/spartan.svg' },
      ]
    }
  },

  site: {
    name: 'Spartan',
  },

  i18n: {
    defaultLocale: 'es',
    locales: [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
    ],
  },

  fonts: {
    priority: ['fontsource']
  },

  nitro: {
    preset: 'static',
  },

  routeRules: {
    '/': { redirect: '/es' },
  },
})
