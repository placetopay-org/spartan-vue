import type { FunctionalComponent } from 'vue';
import type { TPopoverProps } from '../SPopover'

export type TDropdownProps = TPopoverProps;

export type TDropdownItemProps = {
    class?: string;
    disabled: boolean;
    icon: FunctionalComponent;
}
