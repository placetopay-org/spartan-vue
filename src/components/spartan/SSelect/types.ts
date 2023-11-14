import { type TRounded } from '@/helpers';

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
