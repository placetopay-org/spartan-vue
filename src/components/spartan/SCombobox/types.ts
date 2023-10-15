import type { Ref } from 'vue';
import type { TRounded } from '@/helpers';

export type TOption = {
    id: number;
    show: boolean;
    value: unknown;
    content: string;
    disabled?: boolean;
};

type TDispayFunction = (option: unknown) => string;

type TComboboxBaseProps = {
    id: string;
    initialOption: boolean | TOption['id'];
    disabled: boolean;
    error: boolean;
    modelValue: string | number | object;
    rounded: TRounded;
    class?: string;
};

type TComboboxNormalProps = Partial<TComboboxBaseProps> & {
    search: false;
    displayButtonText?: TDispayFunction;
};

type TComboboxSearchProps = Partial<TComboboxBaseProps> & {
    search: true | 'auto';
    displayButtonText: TDispayFunction;
};

export type TComboboxProps = TComboboxNormalProps | TComboboxSearchProps;

export type TComboboxOptionProps = {
    class: string;
    value: string | number | object;
    disabled: boolean;
};

export type TStateDefinition = {
    autoSearch: boolean;
    query: string;
    options: TOption[];
    selectionId: TOption['id'] | null;
    isSelected: (optionId: TOption['id']) => boolean;
    isFiltered: (optionId: TOption['content']) => boolean;
    getSelection: () => TOption;
    updateSelection: (optionId: TOption['id']) => void;
    registerOption: (props: Partial<TComboboxOptionProps>, el: Ref<HTMLElement | null>) => TOption;
    emptyResults: () => boolean;
};
