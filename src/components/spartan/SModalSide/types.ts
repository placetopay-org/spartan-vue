export type TModalSideEmits = {
    (event: 'close'): void;
    (event: 'backdropClick'): void;
};

export type TModalSideProps = {
    /**
     * Controls the visibility of the modal
     */
    open: boolean;
    /**
     * Side from which the modal slides in
     * @default 'left'
     */
    side?: 'left' | 'right';
    /**
     * Additional CSS classes for the root element
     */
    class?: string;
    /**
     * Additional CSS classes for the backdrop
     */
    backdropClass: string;
    /**
     * Breakpoint above which the modal is hidden
     * Useful for responsive designs where modal should only appear on mobile
     */
    breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
};
