export type TRadioEmits = {
    (event: 'update:modelValue', value: boolean): void;
};

export type TRadioProps = {
    disabled?: boolean;
    id?: string;
    inline?: boolean;
    modelValue: boolean;
    name?: string;
    reverse?: boolean;
    value: string;
};
