export type TRadioEmits = {
    (event: 'update:modelValue', value: boolean | string): void;
};

export type TRadioProps = {
    disabled?: boolean;
    id?: string;
    inline?: boolean;
    modelValue: boolean | string;
    name?: string;
    reverse?: boolean;
    value: string;
};
