export type TRadioGroupEmits = {
    (event: 'update:modelValue', value: string): void;
};
export type TRadioGroupProps = {
    modelValue: string;
};

export type TRadioGroupItemProps = {
    value: string;
};
