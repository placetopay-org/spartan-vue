import * as validators from './validators';

export type TInputPasswordEmits = {
    (event: 'update:modelValue', value?: string): void;
    (event: 'state', value?: TState): void;
    (event: 'isValid', value?: boolean): void;
};

export type TValidatorKey = keyof typeof validators;
type TValidatorParams<K extends TValidatorKey> = Parameters<typeof validators[K]>;

export type TRules = {
    [K in TValidatorKey]: TValidatorParams<K>[1] extends undefined 
    ? boolean 
    : TValidatorParams<K>[1]
};

export type TState = {
    [K in keyof TRules]?: { isValid: boolean; value: any };
};
export type TInputPasswordProps = {
    rules?: TRules;
    meter?: boolean;
};
