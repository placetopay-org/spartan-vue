import type { TRounded } from "@/constants";
import type { TBadgeProps } from "@spartan";

export type TOption = Record<string, any>;

export type TMultiSelectorEmits = {
    (event: 'update:modelValue', value?: TOption[]): void;
    (event: 'query', value: string): void;
};

export type TMultiSelectorProps = {
    class?: string;
    clearable?: boolean;
    removable?: TBadgeProps['removable'];
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
