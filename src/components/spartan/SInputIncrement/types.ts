import type { HTMLAttributes } from 'vue';

export type TInputIncrementEmits = {
    /**
     * @en Emitted when the numeric value changes.
     * @es Se emite cuando el valor numérico cambia.
     */
    (event: 'update:modelValue', value: number): void;
};

export type TInputIncrementProps = {
    /**
     * @en Custom CSS classes for the container element.
     * @es Clases CSS personalizadas para el elemento contenedor.
     */
    containerClass?: HTMLAttributes['class'];

    /**
     * @en Disables the input and both increment/decrement buttons.
     * @es Deshabilita el input y ambos botones de incremento/decremento.
     * @default false
     */
    disabled?: boolean;

    /**
     * @en The current numeric value.
     * @es El valor numérico actual.
     */
    modelValue: number;

    /**
     * @en Displays the input in an error state.
     * @es Muestra el input en estado de error.
     * @default false
     */
    error?: boolean;

    /**
     * @en Minimum allowed value. The decrement button is disabled when reached.
     * @es Valor mínimo permitido. El botón de decremento se deshabilita al alcanzarlo.
     */
    min?: number;

    /**
     * @en Maximum allowed value. The increment button is disabled when reached.
     * @es Valor máximo permitido. El botón de incremento se deshabilita al alcanzarlo.
     */
    max?: number;
};
