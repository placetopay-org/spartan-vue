import type { TRounded } from '@/constants';

export type TOption = Record<string, any> | string | number;

export type TMultiSelectorSlots = {
    /**
     * @en Replaces the selector button content. Receives the array of resolved selected option objects (objects when a match is found in `options`, otherwise the raw values) and the `placeholder` prop.
     * @es Reemplaza el contenido del botón del selector. Recibe el array de options seleccionadas ya resueltas (objetos cuando hay match en `options`, si no, los valores crudos) y el prop `placeholder`.
     */
    trigger?(props: { options: TOption[]; placeholder: string | undefined }): any;

    /**
     * @en Replaces the rendering of each option inside the dropdown. Receives the iterated option.
     * @es Reemplaza la renderización de cada option dentro del dropdown. Recibe la option iterada.
     */
    option?(props: { option: TOption }): any;
};

export type TMultiSelectorEmits = {
    (event: 'update:modelValue', value?: TOption[]): void;
    (event: 'update:options', value?: TOption[]): void;
    (event: 'query', value: string): void;
    (event: 'add', value: TOption): void;
};

export type TMultiSelectorProps = {
    class?: string;
    clearable?: boolean;
    removable?: boolean;
    badgeList?: boolean;
    handler?: boolean;
    compact?: boolean;
    count?: number;
    search?: boolean;
    loading?: boolean;
    placeholder?: string;
    error?: boolean;
    rounded?: TRounded;
    disabled?: boolean;
    modelValue?: TOption[];
    options: TOption[];
    optionLabel?: string;
    optionValue?: string;
    optionGroupLabel?: string;
    optionGroupItems?: string;
};
