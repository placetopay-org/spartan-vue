import type { TRounded } from '@/constants';

export type TOption = Record<string, any> | string;

export type TSelectorEmits = {
    /**
     * @en Emitted when the selected value changes. Passes `undefined` when cleared.
     * @es Se emite cuando el valor seleccionado cambia. Pasa `undefined` cuando se limpia.
     */
    (event: 'update:modelValue', value?: TOption): void;

    /**
     * @en Emitted when the search query changes.
     * @es Se emite cuando la consulta de búsqueda cambia.
     */
    (event: 'query', value: string): void;
};

export type TSelectorProps = {
    /**
     * @en Additional CSS classes for the selector button.
     * @es Clases CSS adicionales para el botón del selector.
     */
    class?: string;

    /**
     * @en Shows a clear button when a value is selected, allowing the user to reset the selection.
     * @es Muestra un botón de limpiar cuando hay un valor seleccionado, permitiendo al usuario restablecer la selección.
     */
    clearable?: boolean;

    /**
     * @en Enables search filtering in the dropdown. Set to `'manual'` to handle filtering externally via the `query` event.
     * @es Habilita el filtrado por búsqueda en el dropdown. Usa `'manual'` para manejar el filtrado externamente mediante el evento `query`.
     */
    search?: boolean | 'manual';

    /**
     * @en Shows a loading spinner in the selector button.
     * @es Muestra un spinner de carga en el botón del selector.
     */
    loading?: boolean;

    /**
     * @en Placeholder text displayed when no value is selected.
     * @es Texto de marcador de posición que se muestra cuando no hay un valor seleccionado.
     */
    placeholder?: string;

    /**
     * @en Displays the selector in an error state with red border and ring.
     * @es Muestra el selector en estado de error con borde y anillo rojo.
     */
    error?: boolean;

    /**
     * @en Controls the border radius of the selector button.
     * @es Controla el radio de borde del botón del selector.
     * @default 'both'
     */
    rounded?: TRounded;

    /**
     * @en Disables the selector when true, preventing user interaction.
     * @es Deshabilita el selector cuando es true, impidiendo la interacción del usuario.
     */
    disabled?: boolean;

    /**
     * @en The currently selected value (v-model binding). Can be a string or object.
     * @es El valor actualmente seleccionado (enlace v-model). Puede ser un string u objeto.
     */
    modelValue?: TOption;

    /**
     * @en The array of available options. Each option can be a string or an object.
     * @es El arreglo de opciones disponibles. Cada opción puede ser un string o un objeto.
     */
    options: TOption[];

    /**
     * @en Property name to display as the option label when options are objects.
     * @es Nombre de la propiedad a mostrar como etiqueta de la opción cuando las opciones son objetos.
     * @default 'label'
     */
    optionLabel?: string;

    /**
     * @en Property name to use as the option value when options are objects.
     * @es Nombre de la propiedad a usar como valor de la opción cuando las opciones son objetos.
     */
    optionValue?: string;

    /**
     * @en Property name for the group label when using grouped options.
     * @es Nombre de la propiedad para la etiqueta de grupo cuando se usan opciones agrupadas.
     */
    optionGroupLabel?: string;

    /**
     * @en Property name for the group items array when using grouped options.
     * @es Nombre de la propiedad para el arreglo de elementos del grupo cuando se usan opciones agrupadas.
     */
    optionGroupItems?: string;
};
