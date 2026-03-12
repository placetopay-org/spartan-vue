import { type FunctionalComponent } from 'vue';

export type TButtonGroupItemProps = {
    /**
     * @en Whether this item is the currently active/selected one.
     * @es Si este elemento es el activo/seleccionado actualmente.
     */
    active: boolean;

    /**
     * @en Whether the button is disabled.
     * @es Si el botón está deshabilitado.
     */
    disabled: boolean;

    /**
     * @en Places the icon after the text instead of before.
     * @es Coloca el icono después del texto en lugar de antes.
     */
    endIcon: boolean;

    /**
     * @en Marks this as the first item in the group (applies left border radius).
     * @es Marca este como el primer elemento del grupo (aplica radio de borde izquierdo).
     */
    first: boolean;

    /**
     * @en Icon component displayed inside the button.
     * @es Componente de icono mostrado dentro del botón.
     */
    icon: FunctionalComponent;

    /**
     * @en Marks this as the last item in the group (applies right border radius).
     * @es Marca este como el último elemento del grupo (aplica radio de borde derecho).
     */
    last: boolean;

    /**
     * @en Renders a chevron-right icon for pagination next.
     * @es Renderiza un icono de flecha derecha para paginación siguiente.
     */
    next: boolean;

    /**
     * @en Renders a chevron-left icon for pagination previous.
     * @es Renderiza un icono de flecha izquierda para paginación anterior.
     */
    prev: boolean;

    /**
     * @en Additional CSS classes for the button.
     * @es Clases CSS adicionales para el botón.
     */
    class: string;

    /**
     * @en Custom element or component to render instead of a button.
     * @es Elemento o componente personalizado para renderizar en lugar de un botón.
     */
    as?: any;
};
