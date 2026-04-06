export type TDateValue = Date | Date[] | null;

export type TInputDateProps = {
    /**
     * @en The HTML id attribute for the input element.
     * @es El atributo id HTML para el elemento input.
     */
    id?: string;

    /**
     * @en The selected date value. Can be a single Date, an array of Dates, or null.
     * @es El valor de fecha seleccionado. Puede ser un Date, un arreglo de Dates, o null.
     */
    modelValue: TDateValue;

    /**
     * @en Shows the calendar icon inside the input.
     * @es Muestra el ícono de calendario dentro del input.
     */
    showIcon?: boolean;

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

    /**
     * @en Format string for the date display (e.g. 'dd/mm/yy', 'mm/dd/yy', 'yy-mm-dd').
     * @es Cadena de formato para la visualización de la fecha (ej. 'dd/mm/yy', 'mm/dd/yy', 'yy-mm-dd').
     */
    dateFormat?: string;

    /**
     * @en Defines the selection behavior: 'single', 'multiple', or 'range'.
     * @es Define el comportamiento de selección: 'single', 'multiple' o 'range'.
     */
    selectionMode?: 'single' | 'multiple' | 'range';

    /**
     * @en Whether to display time picker alongside the calendar.
     * @es Si se muestra el selector de hora junto al calendario.
     */
    showTime?: boolean;

    /**
     * @en Specifies 12 or 24 hour format.
     * @es Especifica el formato de 12 o 24 horas.
     */
    hourFormat?: '12' | '24';

    /**
     * @en Whether to display today and clear buttons at the footer.
     * @es Si se muestran los botones de hoy y limpiar en el pie.
     */
    showButtonBar?: boolean;

    /**
     * @en The minimum selectable date.
     * @es La fecha mínima seleccionable.
     */
    minDate?: Date;

    /**
     * @en The maximum selectable date.
     * @es La fecha máxima seleccionable.
     */
    maxDate?: Date;

    /**
     * @en When present, the component is disabled.
     * @es Cuando está presente, el componente está deshabilitado.
     */
    disabled?: boolean;

    /**
     * @en When present, the component is read-only.
     * @es Cuando está presente, el componente es de solo lectura.
     */
    readonly?: boolean;

    /**
     * @en Whether the user can type a date into the input field.
     * @es Si el usuario puede escribir una fecha en el campo de entrada.
     */
    manualInput?: boolean;

    /**
     * @en Array of dates that should be disabled.
     * @es Arreglo de fechas que deben estar deshabilitadas.
     */
    disabledDates?: Date[];

    /**
     * @en Number of months to display.
     * @es Número de meses a mostrar.
     */
    numberOfMonths?: number;

    /**
     * @en Whether to show week numbers.
     * @es Si se muestran los números de semana.
     */
    showWeek?: boolean;
};

export type TInputDateEmits = {
    /**
     * @en Emitted when the selected date value changes.
     * @es Se emite cuando el valor de la fecha seleccionada cambia.
     */
    (event: 'update:modelValue', value: TDateValue): void;
};
