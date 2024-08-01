import { predefinedOperators } from './constants';
import { Currencies } from '@/constants';

export type TOperatorId = (typeof predefinedOperators)[number];

export type TInterfaceId = 'none' | 'oneInput' | 'twoInputs' | 'options';

export type TOperator = {
    id: string;
    label: string;
};

export type TOperatorData = Record<
    string,
    { operators: TOperator[]; interfaces: Record<string, TInterfaceId> }
>;

export type TBaseInterface = {
    operators?: TOperatorId[];
    customOperators?: (TOperator | string)[];
};

export type TNoneInterface = TBaseInterface;

export type TInputInterface = TBaseInterface & {
    type?: 'number' | 'date' | 'amount';
    minorUnitMode?: boolean;
    currency?: keyof typeof Currencies;
    currencies?: (keyof typeof Currencies)[];
};

export type TOptionsInterface = TBaseInterface & {
    options: (string | { id: string; label: string })[];
    multiple?: boolean;
};

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

export type NFilterProps = {
    fields: TField[];
    hideApplyButton?: boolean;
    hideClearButton?: boolean;
    applyWhenClear?: boolean;
    immediateApply?: boolean;
    notResponsive?: boolean;
};

export type NFilterEmits = {
    (event: 'apply', fields: Omit<TField, 'interfaces'>[] | undefined): void;
};