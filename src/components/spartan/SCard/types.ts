import type { FunctionalComponent } from 'vue';

type TAction = {
    icon: FunctionalComponent;
    onClick: () => void;
    text: string;
};

export type TCardProps = {
    size: 'sm' | 'md';
    bodyAccent: boolean;
    headerAccent: boolean;
    footerAccent: boolean;
    icon: FunctionalComponent;
    bodyClass: string;
    headerClass: string;
    footerClass: string;
    actions: TAction[];
};
