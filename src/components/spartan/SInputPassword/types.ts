import * as validators from './validators';

export type TInputPasswordEmits = {
    /**
     * @en Emitted when the password value changes.
     * @es Se emite cuando el valor de la contraseña cambia.
     */
    (event: 'update:modelValue', value?: string): void;

    /**
     * @en Emitted with the validation state of each rule when the password changes.
     * @es Se emite con el estado de validación de cada regla cuando la contraseña cambia.
     */
    (event: 'state', value?: TState): void;

    /**
     * @en Emitted when the overall password validity changes.
     * @es Se emite cuando la validez general de la contraseña cambia.
     */
    (event: 'isValid', value?: boolean): void;
};

export type TValidatorKey = keyof typeof validators;
type TValidatorParams<K extends TValidatorKey> = Parameters<(typeof validators)[K]>;

export type TRules = {
    [K in TValidatorKey]: TValidatorParams<K>[1] extends undefined ? boolean : TValidatorParams<K>[1];
};

export type TState = {
    [K in keyof TRules]?: { isValid: boolean; value: any };
};

export type TInputPasswordProps = {
    /**
     * @en Validation rules to apply to the password (e.g., minLength, uppercase, number).
     * @es Reglas de validación a aplicar a la contraseña (ej. minLength, uppercase, number).
     */
    rules?: TRules;

    /**
     * @en Shows a strength meter bar below the input.
     * @es Muestra una barra de medidor de fortaleza debajo del input.
     * @default false
     */
    meter?: boolean;
};
