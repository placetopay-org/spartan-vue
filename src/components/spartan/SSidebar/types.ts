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
