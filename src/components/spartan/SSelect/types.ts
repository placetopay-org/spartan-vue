import { type TRounded } from '@/helpers';

export type TSelectProps = {
    disabled: boolean;
    error: boolean;
    id: string;
    modelValue: string;
    name: string;
    placeholder: string;
    rounded: TRounded;
};
