import type { FunctionalComponent, HTMLAttributes } from 'vue';

export type TAlertProps = {
    /**
     * @en The title text displayed at the top of the alert.
     * @es El texto del título mostrado en la parte superior del alert.
     */
    title?: string;

    /**
     * @en The descriptive text content of the alert message.
     * @es El texto descriptivo del contenido del mensaje del alert.
     */
    description?: string;

    /**
     * @en Icon component displayed alongside the alert content.
     * @es Componente de icono mostrado junto al contenido del alert.
     */
    icon?: FunctionalComponent;

    /**
     * @en The color theme of the alert.
     * @es El tema de color del alert.
     * @default 'neutral'
     */
    color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral';

    /**
     * @en The visual style variant of the alert.
     * @es La variante de estilo visual del alert.
     */
    variant?: 'solid' | 'outline' | 'soft' | 'subtle';

    /**
     * @en Whether the alert can be dismissed by the user.
     * @es Si el alert puede ser cerrado por el usuario.
     */
    closeable?: boolean;

    /**
     * @en Icon component for the close button when the alert is closeable.
     * @es Componente de icono para el botón de cerrar cuando el alert es cerrable.
     */
    closeIcon?: FunctionalComponent;

    /**
     * @en Additional CSS classes for the alert container.
     * @es Clases CSS adicionales para el contenedor del alert.
     */
    class?: HTMLAttributes['class'];
};
