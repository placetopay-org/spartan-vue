export default defineAppConfig({
  seo: {
    title: 'Spartan Documentation',
    description:
      'Unified Vue 3 component library for PlaceToPay web applications. Built with TailwindCSS, with i18n support and 50+ components.',
  },
  ui: {
    pageHero: {
      slots: {
        title: 'font-semibold sm:text-6xl',
        container: '!pb-0',
      },
    },
    pageCard: {
      slots: {
        container: 'lg:flex min-w-0',
        wrapper: 'flex-none',
      },
    },
  },
  header: {
    logo: {
      alt: 'Spartan Logo',
      dark: '/landing/dark/spartan.svg',
      light: '/landing/light/spartan.svg',
    }
  },
  assistant: {
    floatingInput: true,
    explainWithAi: true,
    shortcuts: {
      focusInput: 'meta_i',
    },
    faqQuestions: {
      es: [
        { category: 'Primeros Pasos', items: ['¿Cómo instalo Spartan?', '¿Cómo uso un componente?'] },
        {
          category: 'Personalización',
          items: ['¿Cómo personalizo el tema?', '¿Cómo configuro la internacionalización?'],
        },
      ],
      en: [
        { category: 'Getting Started', items: ['How do I install Spartan?', 'How do I use a component?'] },
        {
          category: 'Customization',
          items: ['How do I customize the theme?', 'How do I set up internationalization?'],
        },
      ],
    },
  },
});
