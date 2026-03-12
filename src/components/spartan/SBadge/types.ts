import type { HTMLAttributes } from 'vue';
import type { TBadgeStyles } from './styles';

export type TBadgeEmits = {
    (event: 'removed'): void;
};

export type TBadgeProps = {
    /**
     * @en Defines the color variant of the badge.
     * @es Define la variante de color del badge.
     * @default 'gray'
     */
    color?: NonNullable<TBadgeStyles['color']>;

    /**
     * @en Shows a small colored dot indicator next to the badge content.
     * @es Muestra un pequeño indicador de punto coloreado junto al contenido del badge.
     */
    dot?: boolean;

    /**
     * @en Renders the badge with a transparent background and a colored outline border.
     * @es Renderiza el badge con fondo transparente y un borde de contorno coloreado.
     */
    outline?: boolean;

    /**
     * @en Renders the badge with fully rounded corners (pill shape).
     * @es Renderiza el badge con esquinas completamente redondeadas (forma de píldora).
     */
    pill?: boolean;

    /**
     * @en Adds a remove button to the badge. Set to 'stopPropagation' to also stop event propagation on click.
     * @es Agrega un botón de eliminar al badge. Usa 'stopPropagation' para también detener la propagación del evento al hacer clic.
     */
    removable?: boolean | 'stopPropagation';

    /**
     * @en Defines the size of the badge.
     * @es Define el tamaño del badge.
     * @default 'md'
     */
    size?: NonNullable<TBadgeStyles['size']>;

    /**
     * @en Reverses the visual order of the badge content and tag slot.
     * @es Invierte el orden visual del contenido del badge y el slot tag.
     */
    reverse?: boolean;

    /**
     * @en Additional CSS classes for the badge.
     * @es Clases CSS adicionales para el badge.
     */
    class?: HTMLAttributes['class'];
};
