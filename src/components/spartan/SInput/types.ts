import type { TRounded } from '@/helpers';
import type { FunctionalComponent } from 'vue';

type TOption = {
    label: string;
    value: string;
};

export type TInputProps = {
    class: string;
    disabled: boolean;
    endIcon: FunctionalComponent;
    error: boolean;
    id: string;
    options: TOption[];
    icon: FunctionalComponent;
    inputClass: string;
    modelValue: string | number;
    name: string;
    rightOrderSlots: string;
    leftOrderSlots: string;
    placeholder: string;
    prefix: string;
    rounded: TRounded;
    suffix: string;
    type: string;
};
