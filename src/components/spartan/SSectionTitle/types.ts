import type { HTMLAttributes } from 'vue';

export type TSectionTitleProps = {
    /**
     * @en The HTML heading element to render. Allows semantic control over the document outline.
     * @es El elemento HTML de encabezado a renderizar. Permite control semántico sobre la estructura del documento.
     * @default 'h3'
     */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    /**
     * @en Additional CSS classes to customize the appearance of the section title.
     * @es Clases CSS adicionales para personalizar la apariencia del título de sección.
     */
    class?: HTMLAttributes['class'];
};
