import {
    predefinedOperators,
    comparisonOperators,
    textOperators,
    rangeOperators,
    dateOperators,
    existenceOperators,
} from './constants';
import { Currencies } from '@/constants';
import type { Ref } from 'vue';

// Operator types
export type TComparisonOperator = (typeof comparisonOperators)[number];
export type TTextOperator = (typeof textOperators)[number];
export type TRangeOperator = (typeof rangeOperators)[number];
export type TDateOperator = (typeof dateOperators)[number];
export type TExistenceOperator = (typeof existenceOperators)[number];
export type TOperatorId = (typeof predefinedOperators)[number];

// Interface types
export type TInterfaceId = 'none' | 'oneInput' | 'twoInputs' | 'options' | 'selection';
export type TOptions = { id: string; label: string }[];

// Custom operator type
export type TCustomOperator = {
    id: string;
    label?: string;
    tag?: string | ((value: any) => string);
};

// Combined operator type (predefined or custom)
export type TOperator = TOperatorId | TCustomOperator;

// Value types
export type TValue = string | number | Date;
export type TInputType = 'number' | 'date' | 'amount' | 'text';

// Base interfaces
export type TField = {
    id: string;
    name: string;
    interfaces?: TInterfaces;
    permanent?: boolean;
    state?: {
        operator: TOperator;
        value: any;
    };
    validate?: (value: any, operator: TOperator, error: Ref<string | null>) => boolean;
};

export type TInterfaces = {
    none?: TNoneInterface;
    single?: TSingleInterface;
    range?: TRangeInterface;
    options?: TOptionsInterface;
    selection?: TSelectionInterface;
};

// Specific interfaces
type TNoneInterface = {
    operators: (TExistenceOperator | TCustomOperator)[];
};

type TSingleInterface = {
    inputType: TInputType;
    minorUnitMode?: boolean;
    currency?: keyof typeof Currencies;
    currencies?: (keyof typeof Currencies)[];
    operators: (TComparisonOperator | TTextOperator | TDateOperator | TExistenceOperator | TCustomOperator)[];
};

type TRangeInterface = {
    inputType: Exclude<TInputType, 'text'>;
    minorUnitMode?: boolean;
    currency?: keyof typeof Currencies;
    currencies?: (keyof typeof Currencies)[];
    operators: (TRangeOperator | TDateOperator | TExistenceOperator | TCustomOperator)[];
};

type TOptionsInterface = {
    options: TOptions;
    multiple?: boolean;
    operators: (
        | TComparisonOperator
        | Extract<TTextOperator, 'contains' | 'notContains'>
        | TExistenceOperator
        | TCustomOperator
    )[];
};

type TSelectionInterface = {
    operators: (TComparisonOperator | TExistenceOperator | TCustomOperator)[];
};

// Specific fields
// export type TNoneField = TBaseField & {
//     operators: (TExistenceOperator | TCustomOperator)[];
//     state?: {
//         operator: TExistenceOperator | TCustomOperator;
//     };
// };

// export type TSingleField = TBaseField & {
//     type: 'single';
//     inputType: TInputType;
//     minorUnitMode?: boolean;
//     currency?: keyof typeof Currencies;
//     currencies?: (keyof typeof Currencies)[];
//     operators: (TComparisonOperator | TTextOperator | TDateOperator | TExistenceOperator | TCustomOperator)[];
//     state?: {
//         operator: TComparisonOperator | TTextOperator | TDateOperator | TExistenceOperator | TCustomOperator;
//         value: TValue;
//     };
// };

// export type TRangeField = TBaseField & {
//     type: 'range';
//     inputType: Exclude<TInputType, 'text'>;
//     minorUnitMode?: boolean;
//     currency?: keyof typeof Currencies;
//     currencies?: (keyof typeof Currencies)[];
//     operators: (TRangeOperator | TDateOperator | TExistenceOperator | TCustomOperator)[];
//     state?: {
//         operator: TRangeOperator | TDateOperator | TExistenceOperator | TCustomOperator;
//         value: [TValue, TValue];
//     };
// };

// export type TOptionsField = TBaseField & {
//     type: 'options';
//     options: TOptions;
//     multiple?: boolean;
//     operators: (TComparisonOperator | Extract<TTextOperator, 'contains' | 'notContains'> | TExistenceOperator | TCustomOperator)[];
//     state?: {
//         operator: TComparisonOperator | Extract<TTextOperator, 'contains' | 'notContains'> | TExistenceOperator | TCustomOperator;
//         value: string | string[];
//     };
// };

// export type TSelectionField = TBaseField & {
//     type: 'selection';
//     operators: (TComparisonOperator | TExistenceOperator | TCustomOperator)[];
//     state?: {
//         operator: TComparisonOperator | TExistenceOperator | TCustomOperator;
//         value: any;
//     };
// };

// Union type for all field types
// export type TField = TNoneField | TSingleField | TRangeField | TOptionsField | TSelectionField;

// Operator data type
export type TOperatorData = Record<
    string,
    {
        operators: (TOperatorId | TCustomOperator)[];
        interfaces: Record<string, TInterfaceId>;
    }
>;

// Props and Emits
export type TFilterProps = {
    fields: TField[];
    hideApplyButton?: boolean;
    hideClearButton?: boolean;
    applyWhenClear?: boolean;
    immediateApply?: boolean;
    responsive?: boolean;
    saved?: TSaveData[];
};

export type TFilterEmits = {
    (event: 'apply', fields: TField[]): void;
    (event: 'save', data: TSaveData[]): void;
    (event: 'load', data: TSaveData['filters']): void;
    (event: 'clear', fields: TField[]): void;
};

export type TSaveData = {
    name: string;
    filters: TField[];
};
