import type { HTMLAttributes } from 'vue';

export type TLabelProps = {
    /**
     * @en The ID of the input element this label is associated with, enabling click-to-focus behavior.
     * @es El ID del elemento input con el que está asociada esta etiqueta, habilitando el enfoque al hacer clic.
     */
    for?: string;

    /**
     * @en Visually hides the label while keeping it accessible to screen readers.
     * @es Oculta visualmente la etiqueta mientras la mantiene accesible para lectores de pantalla.
     * @default false
     */
    srOnly?: boolean;

    /**
     * @en Additional CSS classes to customize the appearance of the label.
     * @es Clases CSS adicionales para personalizar la apariencia de la etiqueta.
     */
    class?: HTMLAttributes['class'];
};
