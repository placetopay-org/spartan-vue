import type { TRounded } from '@/helpers';
import type { FunctionalComponent } from 'vue';

type TOption = {
    label: string;
    value: string;
};

export type TInputEmits = {
    (event: 'update:modelValue', value: string | number | undefined): void;
    (event: 'update:rightOption', value: string | undefined): void;
    (event: 'update:leftOption', value: string | undefined): void;
};

export type TInputProps = {
    class: string;
    disabled: boolean;
    error: boolean;
    id: string;
    inputClass: string;
    modelValue: string | number | null;
    name: string;
    placeholder: string;
    prefix: string;
    suffix: string;
    rounded: TRounded;
    type: string;
    rightIcon: FunctionalComponent;
    leftIcon: FunctionalComponent;
    rightOption: string | undefined;
    rightOptions: TOption[];
    leftOption: string | undefined;
    leftOptions: TOption[];
    rightOrderSlots: string;
    leftOrderSlots: string;
    borderless?: boolean;
};
