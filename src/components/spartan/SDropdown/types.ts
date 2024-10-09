import type { FunctionalComponent } from 'vue';
import type { TPopoverProps } from '../SPopover';

export type TDropdownProps = { referenceClass: string } & TPopoverProps;

export type TDropdownItemProps = {
    class?: string;
    labelClass?: string;
    iconClass?: string;
    disabled: boolean;
    icon: FunctionalComponent;
    link?: string;
};
