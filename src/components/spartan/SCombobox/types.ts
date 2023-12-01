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
    disabled: boolean;
    error: boolean;
    modelValue: string | number | object;
    rounded: TRounded;
    class?: string;
    flipOptions?: boolean;
    queryDebounce?: number;
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

export type TComboboxEmits = {
    (event: 'update:modelValue', value: string | number | object | unknown): void;
    (event: 'query', value: string): void;
};

export type TComboboxOptionProps = {
    class: string;
    value: string | number | object;
    disabled: boolean;
};

export type TStateDefinition = {
    query: string;
    options: TOption[];
    selectionId: TOption['id'] | null;
    autoSearch: boolean;
    getSelection: () => TOption | null;
    isSelected: (optionId: TOption['id']) => boolean;
    isFiltered: (optionId: TOption['content']) => boolean;
    registerOption: (props: Partial<TComboboxOptionProps>) => TOption;
    emptyResults: () => boolean;
    querySelectionId: (value: TOption['value']) => TOption['id'] | null;
    updateQuery: (query: string) => void;
};
