import type { Component, FunctionalComponent } from 'vue';

export type TBreadcrumbsItemProps = {
    first: boolean;
    href: string;
    active: boolean;
    icon: FunctionalComponent;
    as?: string | Component;
};
