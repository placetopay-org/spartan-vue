import { translator } from '@/helpers';
import type { TField, TOperator, TOperatorData, TOptions } from './types';

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

export const buildLabel = (operator: TOperator, value?: string | string[]) => {
    console.log('operator: ', operator);
    console.log('value: ', value);
    const { t } = translator('filter.operator');

    const operatorId = getOperatorId(operator);

    if (none.includes(operatorId)) return '' + value;
    if (not.includes(operatorId)) return `¬ ${value}`;
    if (literal.includes(operatorId)) return t(operatorId);
    if (compound.includes(operatorId)) return `${t(operatorId)} ${value}`;

    return getOperatorTag(operator, value);
};

export const getOptions = (options: TOptions) => {
    return options.map((option) => {
        return typeof option === 'object' ? option : { id: option, label: option };
    });
};

export const getOperatorId = (operator: TOperator) => {
    return typeof operator === 'object' ? operator.id : operator;
}

export const getOperatorLabel = (operator: TOperator) => {
    const { t } = translator('filter.operator');
    return typeof operator === 'object' ? operator.label : t(getOperatorId(operator));
}

export const getOperatorTag = (operator: TOperator, value?: string | string[]) => {
    if (typeof operator === 'string') return '';
    if (typeof operator.tag === 'function') return operator.tag(value);
    return operator.tag || '';
}
