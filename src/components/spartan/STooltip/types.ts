import type { TPopoverProps } from '../SPopover';

export type TTooltipProps = {
    /**
     * @en The text content displayed inside the tooltip.
     * @es El contenido de texto mostrado dentro del tooltip.
     */
    title: string;

    /**
     * @en The color theme of the tooltip. 'auto' adapts to the current color mode.
     * @es El tema de color del tooltip. 'auto' se adapta al modo de color actual.
     * @default 'auto'
     */
    color?: 'dark' | 'light' | 'auto';

    /**
     * @en Preferred placement of the tooltip relative to the trigger.
     * @es Posición preferida del tooltip relativa al disparador.
     * @default 'bottom'
     */
    placement?: TPopoverProps['placement'];

    /**
     * @en Whether to display an arrow pointing to the trigger.
     * @es Si se muestra una flecha apuntando al disparador.
     * @default true
     */
    arrow?: boolean;

    /**
     * @en Distance in pixels between the trigger and the tooltip.
     * @es Distancia en píxeles entre el disparador y el tooltip.
     */
    offset?: TPopoverProps['offset'];

    /**
     * @en Disables automatic flip positioning.
     * @es Deshabilita el reposicionamiento automático.
     */
    static?: TPopoverProps['static'];

    /**
     * @en Disables automatic open/close on hover. Use exposed methods instead.
     * @es Deshabilita abrir/cerrar automático al pasar el cursor. Use los métodos expuestos.
     */
    manual?: boolean;
};
