import type { FunctionalComponent } from 'vue';

type TAction = {
    icon: FunctionalComponent;
    onClick: () => void;
    text: string;
};

export type TCardProps = {
    class?: string;
    title?: string;
    size?: 'sm' | 'md';
    icon?: FunctionalComponent | 'primary' | 'success' | 'danger' | 'warning' | 'info';
    iconColor?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
    iconType?: 'solid' | 'ping';
    closable?: boolean;
    actions?: TAction[];
};
