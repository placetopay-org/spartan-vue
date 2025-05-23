import type { VueDatePickerProps } from '@vuepic/vue-datepicker';

export type TInputDateProps = {
    id?: string;
    modelValue: string | null;
    hideInputIcon?: boolean;
    error?: boolean;
    class?: string;
    placeholder?: string;
};

export type TInputDatePropsFull = TInputDateProps & VueDatePickerProps;

export type TInputDateEmits = {
    (event: 'update:modelValue', value: string | null): void;
};
