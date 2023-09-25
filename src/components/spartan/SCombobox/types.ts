import type { TRounded } from '@/helpers';
import type { ComputedRef, InjectionKey } from 'vue';

export type TOption = {
    label: string;
    value: string;
};

export type TComboboxProps = {
    disabled: boolean;
    error: boolean;
    search: boolean;
    modelValue: TOption;
    rounded: TRounded;
};

export type TContextKey = InjectionKey<TStateDefinition>;

export type TStateDefinition = {
    props: ComputedRef<Partial<TComboboxProps>>;
    currentSelection: TOption | undefined;
    updateCurrentSelection: (option: TOption | undefined) => void;
};
