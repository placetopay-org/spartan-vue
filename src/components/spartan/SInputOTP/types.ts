import type { HTMLAttributes } from 'vue';

export type TInputOTPEmits = {
    (event: 'update:modelValue', value: string): void;
};

export type TInputOTPProps = {
    modelValue?: string;
    class?: HTMLAttributes['class'];
    disabled?: boolean;
    success?: boolean;
    error?: boolean;
};

export type TInputOTPItemProps = {
    class?: HTMLAttributes['class'];
};
