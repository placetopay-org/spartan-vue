import type { offset } from "@floating-ui/vue";
import type { TPopoverProps } from "../SPopover";

export type TTooltipEmits = {
    (event: 'close'): void;
};

export type TTooltipProps = {
    title: string;
    placement?: TPopoverProps['placement'];
    arrow?: TPopoverProps['arrow'];
    offset?: TPopoverProps['offset'];
    static?: TPopoverProps['static'];
};
