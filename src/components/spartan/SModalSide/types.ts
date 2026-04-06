export type TModalSideEmits = {
    /**
     * @en Emitted when the close button is clicked.
     * @es Se emite cuando se hace clic en el botón de cerrar.
     */
    (event: 'close'): void;

    /**
     * @en Emitted when the backdrop is clicked.
     * @es Se emite cuando se hace clic en el fondo.
     */
    (event: 'backdropClick'): void;
};

export type TModalSideProps = {
    /**
     * @en Whether the modal is currently visible.
     * @es Si el modal está actualmente visible.
     */
    open: boolean;

    /**
     * @en The side from which the modal slides in.
     * @es El lado desde el cual el modal se desliza.
     * @default 'left'
     */
    side?: 'left' | 'right';

    /**
     * @en Additional CSS classes for the root element.
     * @es Clases CSS adicionales para el elemento raíz.
     */
    class?: string;

    /**
     * @en Additional CSS classes for the backdrop overlay.
     * @es Clases CSS adicionales para la capa de fondo.
     */
    backdropClass: string;

    /**
     * @en Breakpoint above which the modal is hidden. Useful for responsive designs.
     * @es Punto de quiebre sobre el cual el modal se oculta. Útil para diseños responsivos.
     */
    breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
};
