import type { FunctionalComponent, InjectionKey } from 'vue';
import type { TPopoverProps } from '../SPopover';
import type { TDropdownStyles } from './styles';

export const dropdownVariantKey: InjectionKey<NonNullable<TDropdownStyles['variant']>> = Symbol('dropdown-variant');

export type TDropdownProps = {
    /**
     * @en Additional CSS classes for the trigger button.
     * @es Clases CSS adicionales para el botón disparador.
     */
    referenceClass?: string;

    /**
     * @en Additional CSS classes for the floating dropdown panel.
     * @es Clases CSS adicionales para el panel flotante del dropdown.
     */
    floatingClass?: string;

    /**
     * @en Disables automatic open/close behavior. Use exposed methods to control programmatically.
     * @es Deshabilita el comportamiento automático de abrir/cerrar. Use los métodos expuestos para controlar programáticamente.
     */
    manual?: boolean;

    /**
     * @en Visual variant. Use `compact` for tighter spacing without dividers.
     * @es Variante visual. Usa `compact` para un espaciado más compacto sin divisores.
     */
    variant?: NonNullable<TDropdownStyles['variant']>;
} & TPopoverProps;

export type TDropdownItemProps = {
    /**
     * @en Additional CSS classes for the menu item.
     * @es Clases CSS adicionales para el elemento del menú.
     */
    class?: string;

    /**
     * @en Additional CSS classes for the label text.
     * @es Clases CSS adicionales para el texto de la etiqueta.
     */
    labelClass?: string;

    /**
     * @en Additional CSS classes for the icon.
     * @es Clases CSS adicionales para el icono.
     */
    iconClass?: string;

    /**
     * @en Whether the menu item is disabled.
     * @es Si el elemento del menú está deshabilitado.
     */
    disabled?: boolean;

    /**
     * @en Icon component displayed before the label.
     * @es Componente de icono mostrado antes de la etiqueta.
     */
    icon?: FunctionalComponent;

    /**
     * @en Renders the item as an anchor link with this URL.
     * @es Renderiza el elemento como un enlace con esta URL.
     */
    link?: string;
};
