import type { Placement } from '@floating-ui/vue';

export type TPopoverEmits = {
    (event: 'close'): void;
};

export type TPopoverProps = {
    arrow?: boolean;
    static?: boolean;
    offset?: number;
    placement?: Placement;
    preventClose?: boolean;
    responsive?: boolean;
    class?: string;
};
