import type { Component, FunctionalComponent, Ref } from 'vue';

export type Variants = 'underline' | 'pills' | 'vetches';

export type TTab = {
    path: string;
    setActive: (value: boolean) => void;
};

export type TTabProps = {
    /**
     * @en Visual style variant of the tab navigation.
     * @es Variante de estilo visual de la navegación por pestañas.
     * @default 'underline'
     */
    variant?: Variants;

    /**
     * @en The active tab path. Required. Use with `v-model`.
     * @es La ruta de la pestaña activa. Requerido. Usar con `v-model`.
     */
    modelValue: string;

    /**
     * @en Makes the tabs stretch to fill the full available width.
     * @es Hace que las pestañas se expandan para llenar todo el ancho disponible.
     */
    full?: boolean;

    /**
     * @en Enables responsive dropdown behavior for overflow tabs.
     * @es Habilita el comportamiento responsivo de dropdown para pestañas desbordadas.
     */
    dropdownResponsive?: boolean;

    /**
     * @en Uses longest common prefix matching for active tab detection.
     * @es Usa la coincidencia del prefijo común más largo para la detección de la pestaña activa.
     */
    longestCommonPrefix?: boolean;

    /**
     * @en Additional CSS classes for the root element.
     * @es Clases CSS adicionales para el elemento raíz.
     */
    class?: string;
};

export type TTabEmits = {
    (event: 'update:modelValue', value?: string): void;
};

export type TTabItemProps = {
    /**
     * @en Regular expression for custom active state matching against the model value.
     * @es Expresión regular para la coincidencia personalizada del estado activo contra el valor del modelo.
     */
    regex?: RegExp;

    /**
     * @en Unique identifier for the tab. Used to match the `modelValue`.
     * @es Identificador único de la pestaña. Se usa para coincidir con el `modelValue`.
     */
    path?: string;

    /**
     * @en Manually sets the tab as active, overriding path matching.
     * @es Establece manualmente la pestaña como activa, anulando la coincidencia por ruta.
     */
    active?: boolean;

    /**
     * @en The HTML element or Vue component to render the tab as.
     * @es El elemento HTML o componente Vue con el que se renderiza la pestaña.
     * @default 'button'
     */
    as?: string | Component;

    /**
     * @en Icon component displayed before the tab label.
     * @es Componente de icono mostrado antes de la etiqueta de la pestaña.
     */
    icon?: FunctionalComponent;

    /**
     * @en Renders the tab as a dropdown trigger. Use the `items` slot for dropdown content.
     * @es Renderiza la pestaña como un disparador de dropdown. Usa el slot `items` para el contenido del dropdown.
     */
    dropdown?: boolean;

    /**
     * @en Additional CSS classes for the tab item.
     * @es Clases CSS adicionales para el elemento de la pestaña.
     */
    class?: string;
};

export type TTabDropdownItemProps = {
    /**
     * @en Unique identifier for the dropdown item. Used to match the `modelValue`.
     * @es Identificador único del elemento del dropdown. Se usa para coincidir con el `modelValue`.
     */
    path?: string;

    /**
     * @en Regular expression for custom active state matching.
     * @es Expresión regular para la coincidencia personalizada del estado activo.
     */
    regex?: RegExp;

    /**
     * @en The HTML element or Vue component to render as.
     * @es El elemento HTML o componente Vue con el que se renderiza.
     */
    as?: string | Component;
};

export type TDropdownContextKey = Ref<string>;
