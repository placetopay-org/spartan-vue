import type { Placement } from '@floating-ui/vue';

export type TPopoverEmits = {
    /**
     * @en Emitted when the popover closes.
     * @es Se emite cuando el popover se cierra.
     */
    (event: 'close'): void;

    /**
     * @en Emitted when the floating panel receives focus.
     * @es Se emite cuando el panel flotante recibe foco.
     */
    (event: 'focusFloating'): void;

    /**
     * @en Emitted when focus leaves the floating panel.
     * @es Se emite cuando el foco sale del panel flotante.
     */
    (event: 'focusoutFloating'): void;
};

export type TPopoverProps = {
    /**
     * @en Shows a backdrop overlay on small screens.
     * @es Muestra una capa de fondo en pantallas pequeñas.
     */
    backdrop?: boolean;

    /**
     * @en Displays an arrow pointing to the trigger. 'auto' adapts to the color mode.
     * @es Muestra una flecha apuntando al disparador. 'auto' se adapta al modo de color.
     */
    arrow?: 'auto' | 'light' | 'dark';

    /**
     * @en Disables automatic flip positioning when the popover overflows the viewport.
     * @es Deshabilita el reposicionamiento automático cuando el popover se desborda de la ventana.
     */
    static?: boolean;

    /**
     * @en Distance in pixels between the trigger and the floating panel.
     * @es Distancia en píxeles entre el disparador y el panel flotante.
     * @default 0
     */
    offset?: number;

    /**
     * @en Preferred placement of the floating panel relative to the trigger.
     * @es Posición preferida del panel flotante relativa al disparador.
     * @default 'bottom-start'
     */
    placement?: Placement;

    /**
     * @en Prevents the popover from closing when focus leaves it.
     * @es Evita que el popover se cierre cuando pierde el foco.
     * @default false
     */
    preventClose?: boolean;

    /**
     * @en Prevents auto-focusing the floating panel when it opens.
     * @es Evita enfocar automáticamente el panel flotante al abrirse.
     * @default false
     */
    preventFocus?: boolean;

    /**
     * @en Enables responsive behavior for small screens.
     * @es Habilita el comportamiento responsivo para pantallas pequeñas.
     * @default true
     */
    responsive?: boolean;

    /**
     * @en Additional CSS classes for the root element.
     * @es Clases CSS adicionales para el elemento raíz.
     */
    class?: string;

    /**
     * @en Uses v-show instead of v-if for the floating panel (keeps it in the DOM).
     * @es Usa v-show en lugar de v-if para el panel flotante (lo mantiene en el DOM).
     */
    useShow?: boolean;
};
