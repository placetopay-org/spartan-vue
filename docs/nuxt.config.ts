import { fileURLToPath } from 'node:url';
import { readFileSync, readdirSync } from 'node:fs';
import svgLoader from 'vite-svg-loader';

const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
const componentDirectories = readdirSync(new URL('../src/components/spartan', import.meta.url), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('S'))
    .map((entry) => entry.name);
const blockComponentCount = componentDirectories.filter((name) => name.endsWith('Block')).length;
const mainComponentCount = componentDirectories.length - blockComponentCount;
const componentDescription = `Unified Vue 3 component library for PlaceToPay with ${mainComponentCount} main components, ${blockComponentCount} Block variants, TailwindCSS and i18n support.`;

export default defineNuxtConfig({
    extends: ['docus'],
    modules: ['@nuxtjs/i18n', '@nuxt/fonts'],

    robots: { robotsTxt: false },

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
                {
                    name: 'keywords',
                    content:
                        'spartan, vue 3, placetopay, juanzea, juan zea, component library, tailwindcss, ui components, design system, evertec',
                },
                { name: 'author', content: 'JuanZea' },
                { property: 'og:title', content: 'Spartan - Vue 3 Component Library for PlaceToPay' },
                {
                    property: 'og:description',
                    content: componentDescription,
                },
                { property: 'og:type', content: 'website' },
                { property: 'og:site_name', content: 'Spartan' },
                { property: 'og:image', content: 'https://placetopay-org.github.io/spartan-vue/og-image.png' },
                { property: 'og:image:width', content: '1200' },
                { property: 'og:image:height', content: '630' },
                { property: 'og:image:type', content: 'image/png' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: 'Spartan - Vue 3 Component Library for PlaceToPay' },
                {
                    name: 'twitter:description',
                    content: componentDescription,
                },
                { name: 'twitter:image', content: 'https://placetopay-org.github.io/spartan-vue/og-image.png' },
            ],
            link: [{ rel: 'icon', type: 'image/svg+xml', href: '/spartan-vue/landing/dark/spartan.svg' }],
        },
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
        priority: ['fontsource'],
    },

    nitro: {
        preset: 'static',
    },

    // Nuxt UI ≥4.5 joins `app.baseURL` into every image src (resolveBaseURL in
    // UColorModeImage / prose Img) assuming a plain <img>. With the IPX provider
    // that prefixed src is treated as a file path under public/, which does not
    // exist — every landing image 404s. IPX adds nothing here (SVGs pass through
    // untransformed and cover.webp is 131 KB), so render plain <img> tags.
    image: {
        provider: 'none',
    },

    runtimeConfig: {
        public: {
            version,
            componentCount: componentDirectories.length,
            mainComponentCount,
            blockComponentCount,
        },
    },

    routeRules: {
        '/': { redirect: '/es' },
    },

    vite: {
        plugins: [svgLoader()],
        ssr: {
            external: ['primevue', '@primevue/icons', '@primevue/core', '@primeuix'],
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('../src', import.meta.url)),
                '@internal': fileURLToPath(new URL('../src/components/internal', import.meta.url)),
                '@spartan': fileURLToPath(new URL('../src/components/spartan', import.meta.url)),
                '~': fileURLToPath(new URL('./app', import.meta.url)),
            },
        },
        vue: {
            script: {
                propsDestructure: true,
                defineModel: true,
            },
        },
    },
});
