import type { Component, FunctionalComponent } from 'vue';

export type TTab = {
    path: string;
    setActive: (value: boolean) => void;
};

export type TTabProps = {
    variant: 'underline' | 'pills';
    modelValue: string;
};

export type TTabEmits = {
    (event: 'update:modelValue', value?: string): void;
};

export type TTabItemProps = {
    path: string;
    as: string | Component;
    icon: FunctionalComponent;
};
