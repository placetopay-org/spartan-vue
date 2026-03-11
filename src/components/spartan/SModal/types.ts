export type TModalProps = {
    /**
     * @en Whether the modal is currently visible.
     * @es Si el modal está actualmente visible.
     */
    open: boolean;

    /**
     * @en The vertical position of the modal on screen.
     * @es La posición vertical del modal en la pantalla.
     */
    position?: 'top' | 'nearTop' | 'center' | 'bottom';

    /**
     * @en Whether the modal adjusts its layout for small screens.
     * @es Si el modal ajusta su diseño para pantallas pequeñas.
     * @default true
     */
    responsive?: boolean;

    /**
     * @en Prevents the modal from being closed by clicking the backdrop.
     * @es Evita que el modal se cierre al hacer clic en el fondo.
     * @default false
     */
    preventClose?: boolean;
};
