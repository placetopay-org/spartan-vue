import type { HTMLAttributes } from 'vue';

export type TAvatarProps = {
    /**
     * @en Additional CSS classes to customize the appearance of the avatar.
     * @es Clases CSS adicionales para personalizar la apariencia del avatar.
     */
    class?: HTMLAttributes['class'];

    /**
     * @en Removes the outline border around the avatar.
     * @es Remueve el borde outline alrededor del avatar.
     * @default false
     */
    borderless?: boolean;

    /**
     * @en Shows a status indicator dot on the avatar.
     * @es Muestra un punto indicador de estado en el avatar.
     * @default false
     */
    indicator?: boolean;

    /**
     * @en Position of the status indicator dot.
     * @es Posición del punto indicador de estado.
     * @default 'right-top'
     */
    indicatorPosition?: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';

    /**
     * @en Name used to generate initials. Also used as alt text for images.
     * @es Nombre usado para generar las iniciales. También se usa como texto alt para imágenes.
     * @default '?'
     */
    name?: string;

    /**
     * @en The size of the avatar.
     * @es El tamaño del avatar.
     * @default 'md'
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

    /**
     * @en Image URL. When provided, displays an image instead of initials.
     * @es URL de la imagen. Cuando se proporciona, muestra una imagen en lugar de las iniciales.
     * @default ''
     */
    src?: string;
};
