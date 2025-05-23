import type { TPopoverProps } from '../SPopover';

export type TTooltipProps = {
    title: string;
    color?: 'dark' | 'light' | 'auto';
    placement?: TPopoverProps['placement'];
    arrow?: boolean;
    offset?: TPopoverProps['offset'];
    static?: TPopoverProps['static'];
    manual?: boolean;
};
