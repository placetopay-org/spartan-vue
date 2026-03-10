import type { VueDatePickerProps } from '@vuepic/vue-datepicker';

export type TDateValue = string | string[] | null;

export type TInputDateProps = {
    id?: string;
    modelValue: TDateValue;
    hideInputIcon?: boolean;
    error?: boolean;
    class?: string;
    placeholder?: string;
};

export type TInputDatePropsFull = TInputDateProps & VueDatePickerProps;

export type TInputDateEmits = {
    (event: 'update:modelValue', value: TDateValue): void;
};
