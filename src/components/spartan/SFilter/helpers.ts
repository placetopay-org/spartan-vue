import { translator } from '@/helpers';
import type { TCustomOperator, TField, TOperator, TOptions } from './types';

export const buildLabel = (operator: string | TOperator, value?: any) => {
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

/**
 * Resolves option IDs to their labels.
 * If the value is an array, resolves each ID to its label.
 * If the ID is not found in options, returns the ID as-is.
 */
export const resolveOptionLabels = (value: any, options?: TOptions): any => {
    if (!options || value === undefined || value === null) return value;

    const normalizedOptions = getOptions(options);

    const resolveId = (id: string): string => {
        const option = normalizedOptions.find((opt) => opt.id === id);
        return option?.label ?? id;
    };

    if (Array.isArray(value)) {
        return value.map(resolveId);
    }

    return resolveId(value);
};

export const getOperators = (field: TField): TOperator[] => {
    return Object.keys(field.interfaces || {}).reduce((acc, key) => {
        // @ts-expect-error - accessing dynamic interface keys
        acc.push(...field.interfaces[key].operators);
        return acc;
    }, []);
};

export const getOperatorId = (operator: TOperator) => {
    return typeof operator === 'object' ? operator.id : operator;
};

export const getOperatorLabel = (operator?: TOperator) => {
    if (!operator) return '';

    const { t } = translator('filter.operator');
    return typeof operator === 'object' ? operator.label : t(getOperatorId(operator));
};

export const getOperatorTag = (operator: TCustomOperator, value?: any) => {
    if (typeof operator.tag === 'function') return operator.tag(value);
    return operator.tag || value || '';
};

/**
 * Creates a clean copy of a field with only the necessary properties for saving.
 * Removes any extra properties that shouldn't be persisted.
 */
export const cleanFieldForSave = (field: TField): TField | null => {
    if (!field.state || !field.interfaces) return null;

    const baseField = {
        id: field.id,
        name: field.name,
        state: field.state,
    };

    if (field.interfaces.none) {
        return {
            ...baseField,
            interfaces: {
                none: { operators: field.interfaces.none.operators },
            },
        };
    }

    if (field.interfaces.oneInput) {
        return {
            ...baseField,
            interfaces: {
                oneInput: {
                    type: field.interfaces.oneInput.type,
                    minorUnitMode: field.interfaces.oneInput.minorUnitMode,
                    currency: field.interfaces.oneInput.currency,
                    currencies: field.interfaces.oneInput.currencies,
                    operators: field.interfaces.oneInput.operators,
                },
            },
        };
    }

    if (field.interfaces.twoInputs) {
        return {
            ...baseField,
            interfaces: {
                twoInputs: {
                    type: field.interfaces.twoInputs.type,
                    minorUnitMode: field.interfaces.twoInputs.minorUnitMode,
                    currency: field.interfaces.twoInputs.currency,
                    currencies: field.interfaces.twoInputs.currencies,
                    operators: field.interfaces.twoInputs.operators,
                },
            },
        };
    }

    if (field.interfaces.options) {
        return {
            ...baseField,
            interfaces: {
                options: {
                    options: field.interfaces.options.options,
                    multiple: field.interfaces.options.multiple,
                    operators: field.interfaces.options.operators,
                },
            },
        };
    }

    if (field.interfaces.selection) {
        return {
            ...baseField,
            interfaces: {
                selection: { operators: field.interfaces.selection.operators },
            },
        };
    }

    return null;
};
