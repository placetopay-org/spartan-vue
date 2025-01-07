import type { Component } from 'vue';
import type { TInterfaceId } from './types';
import { IOneInput, ITwoInputs, IOptions, ISelection } from './interfaces';

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
    oneInput: IOneInput,
    twoInputs: ITwoInputs,
    options: IOptions,
    selection: ISelection
};
