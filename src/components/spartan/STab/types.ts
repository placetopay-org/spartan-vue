import type { Component, FunctionalComponent } from 'vue';

export type Variants = 'underline' | 'pills' | 'vetches';

export type TTab = {
    path: string;
    setActive: (value: boolean) => void;
};

export type TTabProps = {
    variant?: Variants;
    modelValue: string;
    full?: boolean;
    nested?: boolean;
    dropdownResponsive?: boolean;
    class?: string;
};

export type TTabEmits = {
    (event: 'update:modelValue', value?: string): void;
};

export type TTabItemProps = {
    path?: string;
    as?: string | Component;
    icon?: FunctionalComponent;
    dropdown?: boolean;
    class?: string;
};

export type TTabDropdownItemProps = {
    path: string;
}
