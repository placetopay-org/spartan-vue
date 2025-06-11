export type TModalConfirmEmits = {
    (e: 'update:open', value: boolean): void;
    (e: 'confirm'): void;
    (e: 'cancel'): void;
};

export type TModalConfirmProps = {
    text: string;
    confirmText?: string;
    cancelText?: string;
};
