import type { Component } from 'vue';
import type {
    TInterfaceId,
    TExistenceOperator,
    TComparisonOperator,
    TTextOperator,
    TDateOperator,
    TRangeOperator,
} from './types';
import { IOneInput, ITwoInputs, IOptions, ISelection } from './interfaces';

// Basic comparison operators
export const comparisonOperators = [
    'equal',
    'notEqual',
    'greaterThan',
    'greaterThanOrEqual',
    'lessThan',
    'lessThanOrEqual',
] as const;

// Text-specific operators
export const textOperators = ['contains', 'notContains', 'startsWith', 'endsWith'] as const;

// Range-specific operators
export const rangeOperators = ['between', 'notBetween'] as const;

// Date-specific operators
export const dateOperators = ['lastWeek', 'lastMonth', 'lastYear', 'today', 'yesterday'] as const;

// Existence operators
export const existenceOperators = ['exist', 'notExist'] as const;

// Union of all predefined operators
export const predefinedOperators = [
    ...comparisonOperators,
    ...textOperators,
    ...rangeOperators,
    ...dateOperators,
    ...existenceOperators,
] as const;

// Operator mapping by field type
export const operatorsByFieldType = {
    none: [...existenceOperators] as TExistenceOperator[],
    single: {
        text: [...comparisonOperators, ...textOperators, ...existenceOperators] as (
            | TComparisonOperator
            | TTextOperator
            | TExistenceOperator
        )[],
        number: [...comparisonOperators, ...existenceOperators] as (TComparisonOperator | TExistenceOperator)[],
        date: [...comparisonOperators, ...dateOperators, ...existenceOperators] as (
            | TComparisonOperator
            | TDateOperator
            | TExistenceOperator
        )[],
        amount: [...comparisonOperators, ...existenceOperators] as (TComparisonOperator | TExistenceOperator)[],
    },
    range: {
        number: [...rangeOperators, ...existenceOperators] as (TRangeOperator | TExistenceOperator)[],
        date: [...rangeOperators, ...dateOperators, ...existenceOperators] as (
            | TRangeOperator
            | TDateOperator
            | TExistenceOperator
        )[],
        amount: [...rangeOperators, ...existenceOperators] as (TRangeOperator | TExistenceOperator)[],
    },
    options: [...comparisonOperators, 'contains', 'notContains', ...existenceOperators] as (
        | TComparisonOperator
        | Extract<TTextOperator, 'contains' | 'notContains'>
        | TExistenceOperator
    )[],
    selection: [...comparisonOperators, ...existenceOperators] as (TComparisonOperator | TExistenceOperator)[],
} as const;

// Map of interface components
export const interfaceComponents: Record<TInterfaceId, Component | null> = {
    none: null,
    oneInput: IOneInput,
    twoInputs: ITwoInputs,
    options: IOptions,
    selection: ISelection,
};
