import type { Component, FunctionalComponent, Ref } from 'vue';

export type Variants = 'underline' | 'pills' | 'vetches';

export type TTab = {
    path: string;
    setActive: (value: boolean) => void;
};

export type TTabProps = {
    variant?: Variants;
    modelValue: string;
    full?: boolean;
    dropdownResponsive?: boolean;
    longestCommonPrefix?: boolean;
    class?: string;
};

export type TTabEmits = {
    (event: 'update:modelValue', value?: string): void;
};

export type TTabItemProps = {
    regex?: RegExp;
    path?: string;
    active?: boolean;
    as?: string | Component;
    icon?: FunctionalComponent;
    dropdown?: boolean;
    class?: string;
};

export type TTabDropdownItemProps = {
    path?: string;
    regex?: RegExp;
    as?: string | Component;
};

export type TDropdownContextKey = Ref<string>;
