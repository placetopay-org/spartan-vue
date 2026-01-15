import type { HTMLAttributes } from 'vue';

export type TInputOtpEmits = {
    (event: 'update:modelValue', value: string): void;
};

export type TInputOtpProps = {
    modelValue?: string;
    class?: HTMLAttributes['class'];
    disabled?: boolean;
    success?: boolean;
    error?: boolean;
};

export type TInputOtpItemProps = {
    class?: HTMLAttributes['class'];
};
