import { predefinedOperators } from './constants';
import { Currencies } from '@/constants';

export type TOperatorId = (typeof predefinedOperators)[number];

export type TInterfaceId = 'none' | 'oneInput' | 'twoInputs' | 'options';

export type TOperator = {
    id: string;
    translationLabel: string;
    translationTag: string;
};

export type TBaseInterface = {
    operators?: TOperatorId[];
    customOperators?: TOperator[];
};

export type TNoneInterface = TBaseInterface;

type TInputInterfaceBase = {
    type?: 'number' | 'date';
};

type TInputInterfaceForAmount = {
    type: 'amount';
    currency: keyof typeof Currencies;
};

export type TInputInterface = TBaseInterface & (TInputInterfaceBase | TInputInterfaceForAmount);

export type TOptionsInterface = TBaseInterface & {
    options: string[];
    multiple?: boolean;
};

export type TInterface = TNoneInterface | TInputInterface | TOptionsInterface;

export type TField = {
    id: string;
    name: string;
    permanent?: boolean;
    interfaces: {
        none?: TNoneInterface;
        oneInput?: TInputInterface;
        twoInputs?: TInputInterface;
        options?: TOptionsInterface;
    };
    state?: {
        operator: string;
        value: any;
    };
};

export type TOperatorData = Record<string, Record<string, { label: string; interface: string }>>;

export type TOption = {
    label: string;
    value: string;
};

export type SFilterProps = {
    fields: TField[];
};

export type SFilterEmits = {
    (event: 'apply', fields: Omit<TField, 'interfaces'>[] | undefined): void;
};
