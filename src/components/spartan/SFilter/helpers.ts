import { translator } from '@/helpers';
import type { TField, TOperatorData, TOptions } from './types';

const none = ['contains', 'equal', 'exist'];
const not = ['notContains', 'notEqual', 'notExist'];
const literal = ['lastMonth', 'lastWeek', 'lastYear', 'today', 'yesterday'];
const compound = [
    'between',
    'endsWith',
    'startsWith',
    'notBetween',
    'greaterThan',
    'greaterThanOrEqual',
    'lessThan',
    'lessThanOrEqual',
];

export const buildLabel = (operator: string, value?: string | string[]) => {
    const { t } = translator('filter.operator');

    if (none.includes(operator)) return '' + value;
    if (not.includes(operator)) return `¬ ${value}`;
    if (literal.includes(operator)) return t(operator);
    if (compound.includes(operator)) return `${t(operator)} ${value}`;

    return '';
};

export const getOptions = (options: TOptions) => {
    return options.map((option) => {
        return typeof option === 'object' ? option : { id: option, label: option };
    });
};
