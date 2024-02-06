export type TInputIncrementEmits = {
    (event: 'update:modelValue', value: number): void;
};

export type TInputIncrementProps = {
    disabled?: boolean;
    modelValue: number;
    error?: boolean;
};
