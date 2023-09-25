import type { TRounded } from '@/helpers';
import type { FunctionalComponent } from 'vue';

type TOption = {
    label: string;
    value: string;
};

export type TInputProps = {
    class: string;
    disabled: boolean;
    error: boolean;
    id: string;
    inputClass: string;
    modelValue: string | number;
    name: string;
    placeholder: string;
    prefix: string;
    suffix: string;
    rounded: TRounded;
    type: string;
    rightIcon: FunctionalComponent;
    leftIcon: FunctionalComponent;
    rightOptions: TOption[];
    leftOptions: TOption[];
    rightOrderSlots: string;
    leftOrderSlots: string;
};
