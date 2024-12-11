import type { TRounded } from '@/helpers';

export type TOption = Record<string, any>;

export type TSelectorEmits = {
    (event: 'update:modelValue', value: TOption): void;
};

export type TSelectorProps = {
    class?: string;
    placeholder?: string;
    disabled?: boolean;
    modelValue: TOption;
    options: TOption[];
    optionLabel: string;
    optionGroupLabel?: string;
    optionGroupItems?: string;
};
