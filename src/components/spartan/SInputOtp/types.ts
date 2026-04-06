import type { HTMLAttributes } from 'vue';

export type TInputOtpEmits = {
    /**
     * @en Emitted when the OTP value changes.
     * @es Se emite cuando el valor OTP cambia.
     */
    (event: 'update:modelValue', value: string): void;
};

export type TInputOtpProps = {
    /**
     * @en The current OTP string value.
     * @es El valor actual de la cadena OTP.
     */
    modelValue?: string;

    /**
     * @en Custom CSS classes to apply to the OTP container.
     * @es Clases CSS personalizadas para aplicar al contenedor OTP.
     */
    class?: HTMLAttributes['class'];

    /**
     * @en Disables the OTP input.
     * @es Deshabilita el input OTP.
     * @default false
     */
    disabled?: boolean;

    /**
     * @en Displays the OTP cells in a success state with green borders.
     * @es Muestra las celdas OTP en estado de éxito con bordes verdes.
     * @default false
     */
    success?: boolean;

    /**
     * @en Displays the OTP cells in an error state with red borders.
     * @es Muestra las celdas OTP en estado de error con bordes rojos.
     * @default false
     */
    error?: boolean;
};

export type TInputOtpItemProps = {
    /**
     * @en Custom CSS classes to apply to an individual OTP cell.
     * @es Clases CSS personalizadas para aplicar a una celda OTP individual.
     */
    class?: HTMLAttributes['class'];
};
