---
seo:
  title: Spartan - Biblioteca de Componentes Vue 3 para PlaceToPay
  description: Biblioteca de componentes Vue 3 unificada para aplicaciones web de PlaceToPay. Construida con TailwindCSS, soporte i18n, 54 componentes principales y 10 variantes Block.
---

::u-page-hero
#headline
  ::u-badge{variant="outline"}
  🎊 Nueva Versión 3.0 🎉
  ::

#title
[Spartan]{.font-display}

#description
Sistema de componentes unificado para aplicaciones web de PlaceToPay.

Construido con Vue 3 y TailwindCSS, con soporte nativo de internacionalización.

#links
  :::u-button
  ---
  class: font-bold
  color: neutral
  size: xl
  to: /es/getting-started/installation
  trailing-icon: i-lucide-arrow-right
  ---
  Empezar
  :::

  :::u-button
  ---
  color: neutral
  size: xl
  to: /es/getting-started/components
  icon: i-lucide-layout-grid
  variant: outline
  ---
  Ver componentes
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
    Hecho con [Vue](https://vuejs.org) y [TailwindCss](https://tailwindcss.com)

    #description
    Los componentes se integran nativamente en proyectos que ya usan estas tecnologías.
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
    Diseñado en [Figma](https://www.figma.com)

    #description
    Hermosos diseños y prototipos creados en Figma y luego implementados como componentes reutilizables.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2
    target: _blank
    ---
    :landing-components-showcase

    #title
    [54 componentes]{.text-primary} principales y [10 variantes Block]{.text-primary}

    #description
    Desde botones e inputs hasta modales y tablas, Spartan ofrece componentes reales, reutilizables y personalizables para tus flujos de producto.
    ::::

    ::::u-page-card
    ---
    class: col-span-2 md:col-span-1
    ---
    :::::assistant-demo{placeholder="¿Hay algún componente para notificaciones?"}
      Un asistente impulsado por IA para ayudarte con la documentación de Spartan.

      #banner
      Próximamente
    :::::

    #title
    [Asistente]{.text-primary} Inteligente

    #description
    Pregunta cualquier cosa sobre Spartan y obtén respuestas instantáneas con nuestro asistente impulsado por IA.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 md:col-span-1 min-h-[450px]
    target: _blank
    ---
    :color-mode-switch

    #title
    Modo [Color]{.text-primary} integrado

    #description
    Hecho para alternar entre modo claro y oscuro.
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
    Soporte de [Internacionalización]{.text-primary}

    #description
    Soporte i18n integrado con enrutamiento automático y gestión de contenido. Crea documentación multilingüe sin esfuerzo.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 md:col-span-1
    target: _blank
    ---
    #title
    Integración de [Iconos]{.text-primary}

    #description
    Diseñado para trabajar con [Iconsax Vue](https://placetopay-org.github.io/iconsax-vue/) y [Flagicons Vue](https://placetopay-org.github.io/flagicons-vue/)
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 md:col-span-1
    target: _blank
    ---
    #title
    Escrito en [Typescript]{.text-primary}

    #description
    Todos los componentes y utilidades están desarrollados con Typescript para una mejor experiencia de desarrollo y seguridad de tipos.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 lg:col-span-1
    target: _blank
    ---
    #title
    [Plantillas]{.text-primary} y [Ejemplos]{.text-primary} de uso

    #description
    Aplicaciones reales brillan con el estilo Spartan. Explora nuestras plantillas, ejemplos para comenzar rápidamente.
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
    [Tema]{.text-primary} personalizable con CSS

    #description
    Personaliza la paleta de colores de toda la librería desde la hoja de estilos principal de tu proyecto, sin tocar el código de los componentes.
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
          to: /es/getting-started/introduction
          trailing-icon: i-lucide-arrow-right
          ---
          Lee la Documentación
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
          Ver en GitHub
          :::::::
        ::::::
      :::::

    #title
    [Listo]{.text-primary} para comenzar?

    #description
    Explora todas las características de Spartan.
    ::::
  :::
::
