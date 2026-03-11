import type { TCardProps } from '../SCard';
import type { TModalProps } from '../SModal';

export type TModalCardEmits = {
    /**
     * @en Emitted when the modal close button is clicked.
     * @es Se emite cuando se hace clic en el botón de cerrar del modal.
     */
    (event: 'close'): void;

    /**
     * @en Emitted when the modal open state changes.
     * @es Se emite cuando cambia el estado de apertura del modal.
     */
    (event: 'update:open', value: boolean): void;
};

export type TModalCardProps = TModalProps & TCardProps;
