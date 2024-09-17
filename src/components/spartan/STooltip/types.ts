import type { TPopoverProps } from "../SPopover";

export type TTooltipProps = {
    title: string;
    placement?: TPopoverProps['placement'];
    arrow?: TPopoverProps['arrow'];
    offset?: TPopoverProps['offset'];
    static?: TPopoverProps['static'];
};
