import type { Component, FunctionalComponent } from 'vue';

export type TSidebarEmits = {
    (event: 'update:modelValue', value?: string): void;
};

export type TSidebarProps = {
    modelValue: string;
    class?: string;
    placetopayHeader?: boolean | (() => any);
    nested?: boolean;
};

export type TSidebarItemProps = {
    as: string | Component;
    path: string;
    icon: FunctionalComponent;
};

export type TSidebarItemGroupProps = TSidebarItemProps & {
    accordion: boolean;
};

type TPath = {
    group?: string;
    activate: () => void;
    deactivate: () => void;
};

type TGroup = {
    activate: () => void;
    deactivate: () => void;
};

export type TStateDefinition = {
    paths: Record<string, TPath>;
    groups: Record<string, TGroup>;
    path: string | undefined;
    updatePath: (path?: string) => void;
    registerPath: (path: string, setActive: (value: boolean) => void, group?: string) => void;
    registerGroup: (path: string, setActive: (value: boolean) => void) => void;
};

export type TSidebarSeparatorProps = {
    title: string;
};
