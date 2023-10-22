import type { FunctionalComponent } from 'vue';

export type TSidebarEmits = {
    (event: 'update:modelValue', value?: string): void;
};

export type TSidebarProps = {
    modelValue: string;
    class?: string;
    placetopayHeader?: boolean;
};

export type TSidebarItemProps = {
    path: string;
    icon: FunctionalComponent;
};
export type TStateDefinition = {
    path: string | undefined;
    updatePath: (path?: string) => void;
};
