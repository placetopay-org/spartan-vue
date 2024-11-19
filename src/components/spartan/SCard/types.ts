import type { FunctionalComponent } from 'vue';

type TAction = {
    icon: FunctionalComponent;
    onClick: () => void;
    text: string;
};

export type TCardProps = {
    class?: string;
    size?: 'sm' | 'md';
    icon?: FunctionalComponent;
    iconVariant?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
    iconType?: 'solid' | 'ping';
    actions?: TAction[];
};
