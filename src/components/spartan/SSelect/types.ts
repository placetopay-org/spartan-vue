import type { TRounded } from '@/helpers';
import type { HTMLAttributes } from 'vue';

export type TSelectEmits = {
    /**
     * @en Emitted when the selected value changes.
     * @es Se emite cuando el valor seleccionado cambia.
     */
    (e: 'update:modelValue', value: string | number | undefined): void;
};

export type TSelectProps = {
    /**
     * @en Disables the select when true, preventing user interaction.
     * @es Deshabilita el select cuando es true, impidiendo la interacción del usuario.
     */
    disabled?: boolean;

    /**
     * @en Displays the select in an error state with red border and ring.
     * @es Muestra el select en estado de error con borde y anillo rojo.
     */
    error?: boolean;

    /**
     * @en The current selected value of the select (v-model binding).
     * @es El valor seleccionado actual del select (enlace v-model).
     */
    modelValue?: string | number;

    /**
     * @en Placeholder text displayed as a disabled option when no value is selected.
     * @es Texto de marcador de posición que se muestra como opción deshabilitada cuando no hay un valor seleccionado.
     */
    placeholder?: string;

    /**
     * @en Controls the border radius of the select.
     * @es Controla el radio de borde del select.
     * @default 'both'
     */
    rounded?: TRounded;

    /**
     * @en Additional CSS classes for the select element.
     * @es Clases CSS adicionales para el elemento select.
     */
    class?: HTMLAttributes['class'];
};
