---
seo:
  title: Spartan
  description: Unified Vue 3 component library for PlaceToPay web applications. Built with TailwindCSS, with i18n support and 50+ components.
---

::u-page-hero
#headline
  ::u-badge{variant="outline"}
  🎊 New Version 3.0 🎉
  ::

#title
[Spartan]{.font-display}

#description
Unified component system for PlaceToPay web applications.

Built with Vue 3 and TailwindCSS, with native internationalization support.

#links
  :::u-button
  ---
  class: font-bold
  color: neutral
  size: xl
  to: /en/getting-started/installation
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  color: neutral
  size: xl
  to: /en/getting-started/components
  icon: i-lucide-layout-grid
  variant: outline
  ---
  Browse components
  :::

  :::u-button
  ---
  color: neutral
  icon: simple-icons-github
  size: xl
  to: https://github.com/placetopay-org/spartan-vue
  variant: outline
  ---
  GitHub
  :::
::

::u-page-section
  :::u-page-grid
    ::::u-page-card
    ---
    spotlight: true
    class: group col-span-2 lg:col-span-1
    target: _blank
    ---
    :floating-spartan

    #title
    Built with [Vue](https://vuejs.org) and [TailwindCss](https://tailwindcss.com)

    #description
    Components integrate natively into projects that already use these technologies.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2
    target: _blank
    to: https://ui.nuxt.com
    ---
      :::::u-color-mode-image
      ---
      height: 320
      width: 859
      alt: Beautiful visual powered by UI
      class: h-80 object-cover rounded-lg
      dark: /landing/cover.webp
      light: /landing/cover.webp
      ---
      :::::

    #title
    Designed in [Figma](https://www.figma.com)

    #description
    Beautiful designs and prototypes created in Figma and then implemented as reusable components.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2
    target: _blank
    ---
      :::::tabs
        ::::::tabs-item{.mt-5 icon="i-lucide-eye" label="Preview"}
          :::::::div{.flex.flex-col.gap-4}
            ::::::::note{.my-0}
            Here's some additional information for you.
            ::::::::

            ::::::::tip{.my-0}
            Here's a helpful suggestion.
            ::::::::

            ::::::::warning{.my-0}
            Be careful with this action as it might have unexpected results.
            ::::::::

            ::::::::caution{.my-0}
            This action cannot be undone.
            ::::::::
          :::::::
        ::::::

        ::::::tabs-item
        ---
        class: mt-5 mb-2 text-xs overflow-x-auto
        icon: i-lucide-code
        label: Code
        ---
        ```vue
        <note>
        Here's some additional information.
        </note>

        <tip>
        Here's a helpful suggestion.
        </tip>

        <warning>
        Be careful with this action as it might have unexpected results.
        </warning>

        <caution>
        This action cannot be undone.
        </caution>
        ```
        ::::::
      :::::

    #title
    More than [50 components]{.text-primary} ready to use

    #description
    From buttons and cards to modals and tables, Spartan offers a wide range of customizable components for your development needs.
    ::::

    ::::u-page-card
    ---
    class: col-span-2 md:col-span-1
    ---
    :::::assistant-demo{placeholder="Is there a component for notifications?"}
      An AI-powered assistant to help you with Spartan documentation.

      #banner
      Out of funds
    :::::

    #title
    [Smart]{.text-primary} Assistant

    #description
    Ask anything about Spartan and get instant answers with our AI-powered assistant.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 md:col-span-1 min-h-[450px]
    target: _blank
    ---
    :color-mode-switch

    #title
    Built-in [Color]{.text-primary} Mode

    #description
    Designed to switch between light and dark mode.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 lg:col-span-2
    target: _blank
    to: /es/getting-started/i18n
    ---
      :::::u-color-mode-image
      ---
      height: 195
      width: 403
      alt: Internationalization illustration
      class: w-full my-12 lg:my-0
      dark: /landing/dark/i18n.svg
      light: /landing/light/i18n.svg
      ---
      :::::

    #title
    [Internationalization]{.text-primary} Support

    #description
    Built-in i18n support with automatic routing and content management. Create multilingual documentation effortlessly.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-1
    target: _blank
    ---
    #title
    [Icon]{.text-primary} Integration

    #description
    Designed to work with [Iconsax Vue](https://placetopay-org.github.io/iconsax-vue/) and [Flagicons Vue](https://placetopay-org.github.io/flagicons-vue/)
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-1
    target: _blank
    ---
    #title
    Written in [TypeScript]{.text-primary}

    #description
    All components and utilities are developed with TypeScript for a better development experience and type safety.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-1
    target: _blank
    ---
    #title
    [Templates]{.text-primary} and [Examples]{.text-primary}

    #description
    Real applications shine with the Spartan style. Explore our templates and examples to get started quickly.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2
    target: _blank
    ---
    #default
    ```css [main.css]
    @theme {
      --color-spartan-primary-50:  rgb(228 242 253);
      --color-spartan-primary-100: rgb(187 222 251);
      --color-spartan-primary-200: rgb(144 202 249);
      --color-spartan-primary-300: rgb(100 181 246);
      --color-spartan-primary-400: rgb(66 165 245);
      --color-spartan-primary-500: rgb(33 150 243);
      --color-spartan-primary-600: rgb(30 132 229);
      --color-spartan-primary-700: rgb(25 103 196);
      --color-spartan-primary-800: rgb(21 78 148);
      --color-spartan-primary-900: rgb(13 42 84);
    }
    ```

    #title
    [Customizable]{.text-primary} CSS Theme

    #description
    Customize the color palette of the entire library from your project's main stylesheet, without touching the component code.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 lg:col-span-1
    ---
      :::::div{.flex-1.flex.flex-col.items-center.justify-center.py-8.text-center}
        ::::::div{.flex.flex-col.gap-3.w-full.max-w-xs}
          :::::::u-button
          ---
          class: font-bold
          block: true
          color: primary
          size: lg
          to: /en/getting-started/introduction
          trailing-icon: i-lucide-arrow-right
          ---
          Read the Documentation
          :::::::

          :::::::u-button
          ---
          block: true
          color: neutral
          icon: i-simple-icons-github
          size: lg
          target: _blank
          to: https://github.com/placetopay-org/spartan-vue
          variant: outline
          ---
          View on GitHub
          :::::::
        ::::::
      :::::

    #title
    Ready to [get started]{.text-primary}?

    #description
    Explore all features of Spartan.
    ::::
  :::
::
