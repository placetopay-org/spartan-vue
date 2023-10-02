import type { TRounded } from '@/helpers';
import type { ComputedRef } from 'vue';

type TComboboxBaseProps = {
    id: string;
    disabled: boolean;
    error: boolean;
    modelValue: any;
    rounded: TRounded;
};

type TComboboxNormalProps = Partial<TComboboxBaseProps> & {
    searchBy: undefined;
    options?: any[];
    displayButtonText?: (option: any) => string;
    displayOptionText?: (option: any) => string;
};

type TComboboxSearchProps = Partial<TComboboxBaseProps> & {
    searchBy: (option: any) => string;
    options: any[];
    displayButtonText: (option: any) => string;
    displayOptionText: (option: any) => string;
};

export type TComboboxProps = TComboboxNormalProps | TComboboxSearchProps;

export type TStateDefinition = {
    props: ComputedRef<Partial<TComboboxProps>>;
    currentSelection: any;
    updateCurrentSelection: (option: any) => void;
};
