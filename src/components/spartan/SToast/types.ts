export type TToastEmits = {
    (event: 'close'): void;
};

export type TToastProps = {
    type?: 'success' | 'danger';
    leftBorder?: boolean;
};
