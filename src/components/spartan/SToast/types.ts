import type { HTMLAttributes } from 'vue';

export type TToastEmits = {
    (event: 'closeToast'): void;
};

export type TToastProps = {
    /**
     * @en Notification type that determines the icon and left border color.
     * @es Tipo de notificación que determina el icono y el color del borde izquierdo.
     * @default 'success'
     */
    type?: 'success' | 'error' | 'warning';

    /**
     * @en Whether to display a colored left border indicating the notification type.
     * @es Si se muestra un borde izquierdo de color que indica el tipo de notificación.
     * @default false
     */
    leftBorder?: boolean;

    /**
     * @en The main title text of the toast notification.
     * @es El texto del título principal de la notificación toast.
     */
    title?: string;

    /**
     * @en Optional secondary description text displayed below the title.
     * @es Texto de descripción secundario opcional que se muestra debajo del título.
     */
    description?: string;

    /**
     * @en Whether to show a close button that emits the closeToast event.
     * @es Si se muestra un botón de cierre que emite el evento closeToast.
     * @default false
     */
    closeable?: boolean;

    /**
     * @en Additional CSS classes to apply to the toast container.
     * @es Clases CSS adicionales para aplicar al contenedor del toast.
     */
    class?: HTMLAttributes['class'];
};
