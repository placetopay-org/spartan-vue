export type TInputDateProps = {
    modelValue: string | null;
    hideInputIcon?: boolean;
    error?: boolean;
    class?: string;
    placeholder?: string;
};

export type TInputDateEmits = {
    (event: 'update:modelValue', value: string | null): void;
};