import type { Component } from 'vue';
import type { TInterfaceId } from '.';
import { InputSelector, TwoInputSelector, OptionsSelector } from './selectors';

export const predefinedOperators = [
    'exist',
    'notExist',
    'equal',
    'notEqual',
    'greaterThan',
    'greaterThanOrEqual',
    'lessThan',
    'lessThanOrEqual',
    'between',
    'notBetween',
    'contains',
    'notContains',
    'startsWith',
    'endsWith',
] as const;

export const interfaceComponents: Record<TInterfaceId, Component | null> = {
    none: null,
    oneInput: InputSelector,
    twoInputs: TwoInputSelector,
    options: OptionsSelector,
};
