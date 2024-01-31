import type { Placement } from '@floating-ui/vue';

export type TPopoverEmits = {
    (event: 'close'): void;
};

export type TPopoverProps = {
    static?: boolean;
    offset?: number;
    placement?: Placement;
    preventClose?: boolean;
    responsive?: boolean;
};
