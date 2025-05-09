import type { TRounded } from "@/constants";

export type TOption = Record<string, any> | string;

export type TSelectorEmits = {
    (event: 'update:modelValue', value?: TOption): void;
    (event: 'query', value: string): void;
};

export type TSelectorProps = {
    class?: string;
    clearable?: boolean;
    search?: boolean;
    loading?: boolean;
    placeholder?: string;
    error?: boolean;
    rounded?: TRounded;
    disabled?: boolean;
    modelValue?: TOption;
    options: TOption[];
    optionLabel?: string;
    optionValue?: string;
    optionGroupLabel?: string;
    optionGroupItems?: string;
};
