export type TModalLeftEmits = {
    (event: 'close'): void;
    (event: 'backdropClick'): void;
};

export type TModalLeftProps = {
    open: boolean;
    class?: string;
    backdropClass: string;
    breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
};
