import type { TRounded } from '@/helpers';
import type { ComputedRef, InjectionKey } from 'vue';

export type TComboboxBaseProps = {
    disabled: boolean;
    error: boolean;
    modelValue: any;
    rounded: TRounded;
};

export type TComboboxProps = Partial<TComboboxBaseProps> & {
    searchBy: undefined;
    options?: any[];
    displayButtonText?: (option: any) => string;
    displayOptionText?: (option: any) => string;
};

export type TComboboxSearchProps = Partial<TComboboxBaseProps> & {
    searchBy: (option: any) => string;
    options: any[];
    displayButtonText: (option: any) => string;
    displayOptionText: (option: any) => string;
};

export type TContextKey = InjectionKey<TStateDefinition>;

export type TStateDefinition = {
    props: ComputedRef<Partial<TComboboxProps | TComboboxSearchProps>>;
    currentSelection: any;
    updateCurrentSelection: (option: any) => void;
};
