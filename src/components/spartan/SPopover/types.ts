import type { Placement } from '@floating-ui/vue';

export type TPopoverEmits = {
    (event: 'close'): void;
    (event: 'focusFloating'): void;
    (event: 'focusoutFloating'): void;
};

export type TPopoverProps = {
    backdrop?: boolean;
    arrow?: 'auto' | 'light' | 'dark';
    static?: boolean;
    offset?: number;
    placement?: Placement;
    preventClose?: boolean;
    preventFocus?: boolean;
    responsive?: boolean;
    class?: string;
    useShow?: boolean;
};
