import type { HTMLAttributes } from 'vue';

export type TSectionDescriptionProps = {
    /**
     * @en The HTML element to render. Defaults to a paragraph element.
     * @es El elemento HTML a renderizar. Por defecto es un elemento de párrafo.
     * @default 'p'
     */
    as?: string;

    /**
     * @en Additional CSS classes to customize the appearance of the section description.
     * @es Clases CSS adicionales para personalizar la apariencia de la descripción de sección.
     */
    class?: HTMLAttributes['class'];
};
