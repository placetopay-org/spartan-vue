export type TToastEmits = {
    (event: 'closeToast'): void;
};

export type TToastProps = {
    type?: 'success' | 'danger';
    leftBorder?: boolean;
    title?: string;
    description?: string;
    closeable?: boolean;
};
