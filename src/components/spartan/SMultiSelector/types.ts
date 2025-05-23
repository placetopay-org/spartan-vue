import type { TRounded } from '@/constants';

export type TOption = Record<string, any>;

export type TMultiSelectorEmits = {
    (event: 'update:modelValue', value?: TOption[]): void;
    (event: 'update:options', value?: TOption[]): void;
    (event: 'query', value: string): void;
    (event: 'add', value: TOption): void;
};

export type TMultiSelectorProps = {
    class?: string;
    clearable?: boolean;
    removable?: boolean;
    badgeList?: boolean;
    handler?: boolean;
    compact?: boolean;
    count?: number;
    search?: boolean;
    loading?: boolean;
    placeholder?: string;
    error?: boolean;
    rounded?: TRounded;
    disabled?: boolean;
    modelValue?: TOption[];
    options: TOption[];
    optionLabel: string;
    optionGroupLabel?: string;
    optionGroupItems?: string;
};
