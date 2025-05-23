import type { TRounded } from '@/helpers';

export type TInputTagProps = {
    class?: string;
    modelValue?: string[];
    error?: boolean;
    disabled?: boolean;
    rounded?: TRounded;
    borderless?: boolean;
    placeholder?: string;
    type?: string;
};

export type TInputTagEmits = {
    (event: 'update:modelValue', value: string[]): void;
};
