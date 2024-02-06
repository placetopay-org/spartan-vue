import { type TRounded } from '@/helpers';

export type TSelectEmits = {
    (e: 'update:modelValue', value: string | number | undefined): void;
};

export type TSelectProps = {
    disabled: boolean;
    error: boolean;
    id: string;
    modelValue: string | number;
    name: string;
    placeholder: string;
    rounded: TRounded;
    class: string;
};
