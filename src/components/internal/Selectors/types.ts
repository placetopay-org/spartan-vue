export type TOption = Record<string, any>;

export type TSelectorLayoutProps = {
    modelValue?: TOption | TOption[];
    disabled?: boolean;
    error?: boolean;
    rounded?: 'both' | 'left' | 'right' | 'none';
    search?: boolean;
    options?: TOption[];
    optionLabel?: string;
    optionGroupLabel?: string;
    optionGroupItems?: string;
    width: number;
    PtOptions: any[];
}