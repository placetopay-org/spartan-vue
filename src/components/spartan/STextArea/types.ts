export type TTextAreaProps = {
    modelValue: string;
    class?: string;
    error?: boolean;
    disabled?: boolean;
};

export type TTextAreaEmits = {
    (e: 'update:modelValue', value: string): void;
};
