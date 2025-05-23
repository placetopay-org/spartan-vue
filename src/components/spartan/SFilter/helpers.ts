import { translator } from '@/helpers';
import type { TField, TOperator, TOptions } from './types';

export const buildLabel = (operator: string | TOperator, value?: any) => {
    console.log('--operator', operator);
    console.log('--value', value);
    const { t } = translator('filter.operator');

    if (typeof operator === 'object') {
        return getOperatorTag(operator, value);
    }

    if (!value) {
        return t(operator);
    }

    if (Array.isArray(value)) {
        return `${t(operator)} ${value.join(', ')}`;
    }

    return `${t(operator)} ${value}`;
};

export const getOptions = (options: TOptions) => {
    return options.map((option) => {
        return typeof option === 'object' ? option : { id: option, label: option };
    });
};

export const getOperators = (field: TField): TOperator[] => {
    return Object.keys(field.interfaces || {}).reduce((acc, key) => {
        // @ts-ignore
        acc.push(...field.interfaces[key].operators);
        return acc;
    }, []);
}

export const getOperatorId = (operator: TOperator) => {
    return typeof operator === 'object' ? operator.id : operator;
};

export const getOperatorLabel = (operator?: TOperator) => {
    if (!operator) return '';

    const { t } = translator('filter.operator');
    return typeof operator === 'object' ? operator.label : t(getOperatorId(operator));
};

export const getOperatorTag = (operator: TOperator, value?: string | string[] | number | Date) => {
    if (typeof operator === 'string') return '';
    if (typeof operator.tag === 'function') return operator.tag(value);
    return operator.tag || '';
};
