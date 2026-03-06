export type TModalConfirmEmits = {
    /**
     * @en Emitted when the modal open state changes.
     * @es Se emite cuando cambia el estado de apertura del modal.
     */
    (e: 'update:open', value: boolean): void;

    /**
     * @en Emitted when the user clicks the confirm button.
     * @es Se emite cuando el usuario hace clic en el boton de confirmar.
     */
    (e: 'confirm'): void;

    /**
     * @en Emitted when the user cancels the action.
     * @es Se emite cuando el usuario cancela la accion.
     */
    (e: 'cancel'): void;
};

export type TModalConfirmProps = {
    /**
     * @en Descriptive text shown in the modal body.
     * @es Texto descriptivo que se muestra en el cuerpo del modal.
     */
    description: string;

    /**
     * @en Custom label for the confirm button. Defaults to the i18n translation.
     * @es Etiqueta personalizada para el boton de confirmar. Por defecto usa la traduccion i18n.
     */
    confirmText?: string;

    /**
     * @en Custom label for the cancel button. Defaults to the i18n translation.
     * @es Etiqueta personalizada para el boton de cancelar. Por defecto usa la traduccion i18n.
     */
    cancelText?: string;
};
