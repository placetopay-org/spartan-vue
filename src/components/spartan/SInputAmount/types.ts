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
    /**
     * @en Emitted when the selected currency changes.
     * @es Se emite cuando la moneda seleccionada cambia.
     */
    (event: 'update:currency', value: string | undefined): void;

    /**
     * @en Emitted when the numeric value changes.
     * @es Se emite cuando el valor numérico cambia.
     */
    (event: 'update:modelValue', value: number | null): void;

    /**
     * @en Emitted with detailed amount information including currency, symbol, and decimals.
     * @es Se emite con información detallada del monto incluyendo moneda, símbolo y decimales.
     */
    (event: 'info', value: AmountInfo | undefined): void;

    /**
     * @en Emitted on input change. Required by the vue-currency-input library.
     * @es Se emite al cambiar el input. Requerido por la librería vue-currency-input.
     */
    (event: 'change', value: number | null): void;
};

export type TInputAmountProps = {
    /**
     * @en The numeric amount value.
     * @es El valor numérico del monto.
     */
    modelValue: number | null;

    /**
     * @en The ISO 4217 currency code (e.g., 'USD', 'COP').
     * @es El código de moneda ISO 4217 (ej. 'USD', 'COP').
     */
    currency: keyof typeof Currencies;

    /**
     * @en The locale used for number formatting (e.g., 'en-US', 'es-CO').
     * @es El idioma usado para el formato numérico (ej. 'en-US', 'es-CO').
     */
    locale?: string;

    /**
     * @en Whether to display the currency symbol alongside the input.
     * @es Si se muestra el símbolo de la moneda junto al input.
     */
    symbol?: boolean;

    /**
     * @en Whether to display the currency code as a suffix instead of a prefix.
     * @es Si se muestra el código de la moneda como sufijo en vez de prefijo.
     */
    suffixCurrency?: boolean;

    /**
     * @en List of available currencies for the currency selector dropdown.
     * @es Lista de monedas disponibles para el selector de moneda.
     */
    currencies?: Array<keyof typeof Currencies>;

    /**
     * @en When enabled, the value is treated as minor units (e.g., cents).
     * @es Cuando está habilitado, el valor se trata como unidades menores (ej. centavos).
     */
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
