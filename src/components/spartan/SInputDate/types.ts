export type TInputDateProps = {
    modelValue: string | null;
};

export type TInputDateEmits = {
    (event: 'update:modelValue', value: string | null): void;
};