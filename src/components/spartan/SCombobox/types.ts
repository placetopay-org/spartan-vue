import type { TRounded } from '@/helpers';

export type TOption = {
    id: number;
    show: boolean;
    value: unknown;
    content: string;
    disabled?: boolean;
};

type TDispayFunction = (option: unknown) => string;

type TComboboxBaseProps = {
    /**
     * @en The HTML id attribute for the combobox trigger element.
     * @es El atributo id HTML para el elemento disparador del combobox.
     */
    id: string;

    /**
     * @en Disables the combobox.
     * @es Deshabilita el combobox.
     * @default false
     */
    disabled?: boolean;

    /**
     * @en Displays the combobox in an error state.
     * @es Muestra el combobox en estado de error.
     * @default false
     */
    error?: boolean;

    /**
     * @en The currently selected value.
     * @es El valor actualmente seleccionado.
     */
    modelValue: string | number | object;

    /**
     * @en The border radius style of the combobox.
     * @es El estilo de radio de borde del combobox.
     * @default 'both'
     */
    rounded?: TRounded;

    /**
     * @en Custom CSS classes to apply to the combobox container.
     * @es Clases CSS personalizadas para aplicar al contenedor del combobox.
     */
    class?: string;

    /**
     * @en When enabled, the dropdown opens aligned to the right edge.
     * @es Cuando está habilitado, el desplegable se abre alineado al borde derecho.
     * @default false
     */
    flipOptions?: boolean;

    /**
     * @en Debounce delay in milliseconds for the search query.
     * @es Retraso de debounce en milisegundos para la consulta de búsqueda.
     * @default 500
     */
    queryDebounce?: number;
};

type TComboboxNormalProps = Partial<TComboboxBaseProps> & {
    /**
     * @en Not used in normal mode.
     * @es No se usa en modo normal.
     */
    search?: undefined;

    /**
     * @en Function that returns the display text for the selected option.
     * @es Función que retorna el texto a mostrar para la opción seleccionada.
     */
    displayButtonText?: TDispayFunction;
};

type TComboboxSearchProps = Partial<TComboboxBaseProps> & {
    /**
     * @en Enables search mode. Set to 'auto' for client-side filtering.
     * @es Habilita el modo de búsqueda. Establece 'auto' para filtrado del lado del cliente.
     */
    search: true | 'auto';

    /**
     * @en Function that returns the display text for the selected option. Required in search mode.
     * @es Función que retorna el texto a mostrar para la opción seleccionada. Requerido en modo búsqueda.
     */
    displayButtonText: TDispayFunction;
};

export type TComboboxProps = TComboboxNormalProps | TComboboxSearchProps;

export type TComboboxEmits = {
    /**
     * @en Emitted when the selected value changes.
     * @es Se emite cuando el valor seleccionado cambia.
     */
    (event: 'update:modelValue', value: string | number | object | unknown): void;

    /**
     * @en Emitted when the search query changes.
     * @es Se emite cuando la consulta de búsqueda cambia.
     */
    (event: 'query', value: string): void;
};

export type TComboboxOptionProps = {
    /**
     * @en Custom CSS classes for the option element.
     * @es Clases CSS personalizadas para el elemento de opción.
     */
    class: string;

    /**
     * @en The value associated with this option.
     * @es El valor asociado con esta opción.
     */
    value: string | number | object;

    /**
     * @en Disables this option, preventing selection.
     * @es Deshabilita esta opción, impidiendo su selección.
     */
    disabled: boolean;
};

export type TStateDefinition = {
    query: string;
    options: TOption[];
    selectionId: TOption['id'] | null;
    autoSearch: boolean;
    getSelection: () => TOption | null;
    isSelected: (optionId: TOption['id']) => boolean;
    isFiltered: (optionId: TOption['content']) => boolean;
    registerOption: (props: Partial<TComboboxOptionProps>) => TOption;
    emptyResults: () => boolean;
    querySelectionId: (value: TOption['value']) => TOption['id'] | null;
    updateQuery: (query: string) => void;
};
