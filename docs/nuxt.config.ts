import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['@nuxtjs/i18n', '@nuxt/fonts'],

  llms: {
    domain: 'https://placetopay-org.github.io/spartan-vue',
  },
  mcp: {
    enabled: false,
  },
  ogImage: {
    enabled: false,
  },

  css: ['~/assets/css/main.css'],

  // Alias para importar componentes de Spartan
  alias: {
    '@spartan': '../src/components/spartan',
    '@lib': '../src',
    '@': '../src',
  },

  // Auto-import de componentes Spartan
  components: {
    dirs: [
      '~/components',
      {
        path: '../../src/components/spartan',
        pattern: '*/S*.vue',
        pathPrefix: false,
      },
    ],
  },

  app: {
    baseURL: '/spartan-vue/',
    head: {
      title: 'Spartan - Vue 3 Component Library for PlaceToPay',
      meta: [
        { name: 'keywords', content: 'spartan, vue 3, placetopay, juanzea, juan zea, component library, tailwindcss, ui components, design system, evertec' },
        { name: 'author', content: 'JuanZea' },
        { property: 'og:title', content: 'Spartan - Vue 3 Component Library for PlaceToPay' },
        { property: 'og:description', content: 'Unified Vue 3 component library for PlaceToPay with 65 components, TailwindCSS and i18n support.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Spartan' },
        { property: 'og:image', content: 'https://placetopay-org.github.io/spartan-vue/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Spartan - Vue 3 Component Library for PlaceToPay' },
        { name: 'twitter:description', content: 'Unified Vue 3 component library for PlaceToPay with 65 components, TailwindCSS and i18n support.' },
        { name: 'twitter:image', content: 'https://placetopay-org.github.io/spartan-vue/og-image.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/spartan-vue/landing/dark/spartan.svg' },
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

  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../src', import.meta.url)),
        '@internal': fileURLToPath(new URL('../src/components/internal', import.meta.url)),
        '@spartan': fileURLToPath(new URL('../src/components/spartan', import.meta.url)),
      },
    },
    vue: {
      script: {
        propsDestructure: true,
        defineModel: true,
      },
    },
  },
})
