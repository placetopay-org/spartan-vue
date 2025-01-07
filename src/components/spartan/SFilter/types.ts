import { predefinedOperators } from './constants';
import { Currencies } from '@/constants';

export type TOperatorId = (typeof predefinedOperators)[number];

export type TInterfaceId = 'none' | 'oneInput' | 'twoInputs' | 'options' | 'selection';

export type TOperator = {
    id: string;
    label?: string;
    tag?: string | ((value: any) => string);
} | string;

export type TOptions = (string | { id: string; label: string })[];

export type TOperatorData = Record<
    string,
    { operators: TOperator[]; interfaces: Record<string, TInterfaceId> }
>;

export type TBaseInterface = {
    operators?: TOperator[];
};

export type TNoneInterface = TBaseInterface;

export type TInputInterface = TBaseInterface & {
    type?: 'number' | 'date' | 'amount';
    minorUnitMode?: boolean;
    currency?: keyof typeof Currencies;
    currencies?: (keyof typeof Currencies)[];
};

export type TOptionsInterface = TBaseInterface & {
    options: TOptions;
    multiple?: boolean;
};

export type TSelectionInterface = TBaseInterface

export type TField = {
    id: string;
    name: string;
    permanent?: boolean;
    interfaces: {
        none?: TNoneInterface;
        oneInput?: TInputInterface;
        twoInputs?: TInputInterface;
        options?: TOptionsInterface;
        selection?: TSelectionInterface;
    };
    state?: {
        operator: TOperator;
        value: any;
    };
};

export type SFilterProps = {
    fields: TField[];
    hideApplyButton?: boolean;
    hideClearButton?: boolean;
    applyWhenClear?: boolean;
    immediateApply?: boolean;
    responsive?: boolean;
    saved?: TSaveData[];
};

export type SFilterEmits = {
    (event: 'apply', fields: Omit<TField, 'interfaces'>[] | undefined): void;
    (event: 'save', data: TSaveData[]): void
    (event: 'load', data: TSaveData['filters']): void
};

export type TSaveData = {
    name: string;
    filters: Omit<TField, 'interfaces'>[];
}