export type TToastEmits = {
    (event: 'closeToast'): void;
};

export type TToastProps = {
    type?: 'success' | 'error';
    leftBorder?: boolean;
    title?: string;
    description?: string;
    closeable?: boolean;
};
