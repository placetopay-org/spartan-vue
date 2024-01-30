import type { Placement } from '@floating-ui/vue';

export type TPopoverProps = {
    static?: boolean;
    offset?: number;
    placement?: Placement;
    preventClose?: boolean;
    responsive?: boolean;
};
