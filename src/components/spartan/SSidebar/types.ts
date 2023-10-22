import type { FunctionalComponent } from 'vue';

export type TSidebarProps = {
    placetopayHeader: boolean;
};

export type TSidebarItemProps = {
    path: string;
    icon: FunctionalComponent;
};
export type TStateDefinition = {
    path: string;
};
