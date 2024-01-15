import { Currencies } from '@/constants';

type AmountInfo = {
    currency: keyof typeof Currencies;
    code: string;
    symbol: string | null;
    amount: number | null;
    decimals: number;
    minorUnit: number;
};

export type TInputAmountEmits = {
    (event: 'update:currency', value: string | undefined): void;
    (event: 'update:modelValue', value: number | null): void;
    (event: 'info', value: AmountInfo | undefined): void;
    (event: 'change', value: number | null): void; // Required by the vue-currency-input library
};

export type TInputAmountProps = {
    modelValue: number | null;
    currency: keyof typeof Currencies;
    locale?: string;
    symbol?: boolean;
    suffixCurrency?: boolean;
    currencies?: Array<keyof typeof Currencies>;
    minorUnitMode?: boolean;
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
