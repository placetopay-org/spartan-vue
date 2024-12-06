import { type TRounded } from '@/helpers';

export type TSelectEmits = {
    (e: 'update:modelValue', value: string | number | undefined): void;
};

export type TSelectProps = {
    disabled?: boolean;
    error?: boolean;
    modelValue?: string | number;
    placeholder?: string;
    rounded?: TRounded;
    class?: string;
};
