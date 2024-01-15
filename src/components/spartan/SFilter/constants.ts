import type { Component } from 'vue';
import type { TInterfaceId } from '.';
import { InputSelector, TwoInputSelector, OptionsSelector } from './selectors';

export const predefinedOperators = [
    'between',
    'contains',
    'endsWith',
    'equal',
    'exist',
    'greaterThan',
    'greaterThanOrEqual',
    'lastMonth',
    'lastWeek',
    'lastYear',
    'lessThan',
    'lessThanOrEqual',
    'notBetween',
    'notContains',
    'notEqual',
    'notExist',
    'startsWith',
    'today',
    'yesterday',
] as const;

export const interfaceComponents: Record<TInterfaceId, Component | null> = {
    none: null,
    oneInput: InputSelector,
    twoInputs: TwoInputSelector,
    options: OptionsSelector,
};
