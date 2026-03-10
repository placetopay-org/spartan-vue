import type { RootProps } from '@vuepic/vue-datepicker';

export type TDateValue = string | string[] | null;

export type TInputDateProps = {
    /**
     * @en The HTML id attribute for the input element.
     * @es El atributo id HTML para el elemento input.
     */
    id?: string;

    /**
     * @en The selected date value. Can be a single date string, an array of date strings, or null.
     * @es El valor de fecha seleccionado. Puede ser una cadena de fecha, un arreglo de cadenas, o null.
     */
    modelValue: TDateValue;

    /**
     * @en Hides the calendar icon inside the input.
     * @es Oculta el ícono de calendario dentro del input.
     */
    hideInputIcon?: boolean;

    /**
     * @en Displays the input in an error state with red border.
     * @es Muestra el input en estado de error con borde rojo.
     */
    error?: boolean;

    /**
     * @en Custom CSS classes to apply to the component.
     * @es Clases CSS personalizadas para aplicar al componente.
     */
    class?: string;

    /**
     * @en Placeholder text shown when no date is selected.
     * @es Texto de marcador que se muestra cuando no hay fecha seleccionada.
     */
    placeholder?: string;
};

export type TInputDatePropsFull = TInputDateProps & RootProps;

export type TInputDateEmits = {
    /**
     * @en Emitted when the selected date value changes.
     * @es Se emite cuando el valor de la fecha seleccionada cambia.
     */
    (event: 'update:modelValue', value: TDateValue): void;
};
