import type { HTMLAttributes } from "vue";

export type TInputIncrementEmits = {
    (event: 'update:modelValue', value: number): void;
};

export type TInputIncrementProps = {
    containerClass?: HTMLAttributes['class'];
    disabled?: boolean;
    modelValue: number;
    error?: boolean;
};
