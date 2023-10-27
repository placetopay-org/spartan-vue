import { Currencies } from '@/constants';

export type TInputAmountEmits = {
    (event: 'update:currency', value: string | undefined): void;
    (event: 'update:modelValue', value: number | null): void;
    (event: 'change', value: number | null): void;
};

export type TInputAmountProps = {
    modelValue: number | null;
    currency: keyof typeof Currencies;
    locale?: string;
    symbol?: boolean;
    suffixCurrency?: boolean;
    currencies?: Array<keyof typeof Currencies>;
};

// TODO: vite plugin prevents splitting types
// export type TInputAmountPropsFull = Partial<TInputProps> & {
//     modelValue: number | null;
//     currency: keyof typeof Currencies;
//     locale?: string;
//     symbol?: boolean;
//     suffixCurrency?: boolean;
//     currencies?: Array<keyof typeof Currencies>;
// };
