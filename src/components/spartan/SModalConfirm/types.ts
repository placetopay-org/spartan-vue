export type TModalConfirmEmits = {
    (e: 'update:open', value: boolean): void;
    (e: 'confirm'): void;
    (e: 'cancel'): void;
};

export type TModalConfirmProps = {
    description: string;
    confirmText?: string;
    cancelText?: string;
};
