import { type FunctionalComponent } from 'vue';

export type TButtonGroupItemProps = {
    active: boolean;
    disabled: boolean;
    endIcon: boolean;
    first: boolean;
    icon: FunctionalComponent;
    last: boolean;
    next: boolean;
    prev: boolean;
    class: string;
};
