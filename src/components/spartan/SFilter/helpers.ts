import { translator } from '@/helpers';
import type { SFilterChoices, SFilterCustomOperator, SFilterField } from './types';
import { DEFAULT_OPERATOR_BY_TYPE, FIELD_TYPE_INPUT_COUNT, OPERATOR_INPUT_COUNT } from './constants';

// `translator()` calls `useI18n()` under the hood, which requires an active Vue
// component setup context. We cannot hoist the call to module scope — instead,
// each helper that needs the operator namespace calls `translator()` itself
// inside its invocation (which happens during setup or render).

export type CombinedOperator = string | SFilterCustomOperator;

/** Returns the merged list of predefined + custom operators for a field. */
export const getOperators = (field: SFilterField): CombinedOperator[] => {
    const predefined: string[] = field.operators ?? [DEFAULT_OPERATOR_BY_TYPE[field.type]];
    const custom = field.customOperators ?? [];
    return [...predefined, ...custom];
};

/** Returns the id of either a predefined string operator or a custom operator object. */
export const getOperatorId = (operator: CombinedOperator): string =>
    typeof operator === 'string' ? operator : operator.id;

/** Returns the translated/custom label for an operator, or empty string for undefined. */
export const getOperatorLabel = (operator?: CombinedOperator): string => {
    if (operator === undefined) return '';
    if (typeof operator === 'string') return translator('filter.operator').t(operator);
    return operator.label;
};

/** Looks up a custom operator on the field by id. */
export const findCustomOperator = (field: SFilterField, operatorId: string): SFilterCustomOperator | undefined =>
    field.customOperators?.find((c) => c.id === operatorId);

/** How many value inputs to render for the current operator on this field. */
export const getOperatorInputCount = (operatorId: string, field: SFilterField): 0 | 1 | 2 => {
    const custom = findCustomOperator(field, operatorId);
    if (custom) return custom.inputs ?? FIELD_TYPE_INPUT_COUNT[field.type];
    return OPERATOR_INPUT_COUNT[operatorId] ?? FIELD_TYPE_INPUT_COUNT[field.type];
};

/** Normalizes string-or-object choices into a consistent `{id, label}[]` shape. */
export const getChoices = (choices: SFilterChoices) =>
    choices.map((c) => (typeof c === 'object' ? c : { id: c, label: c }));

/** Resolves option-choice ids to their labels (for `options` field badge rendering). */
export const resolveChoiceLabels = (value: any, choices: SFilterChoices): any => {
    if (value === undefined || value === null) return value;
    const resolve = (id: string): string => {
        const found = choices.find((c) => (typeof c === 'string' ? c : c.id) === id);
        if (!found) return id;
        return typeof found === 'string' ? found : found.label;
    };
    return Array.isArray(value) ? value.map(resolve) : resolve(value);
};

/** Reports duplicate operator ids across `operators` and `customOperators` for dev-mode assertions. */
export const getDuplicateOperatorIds = (field: SFilterField): string[] => {
    const seen = new Set<string>(field.operators ?? []);
    const dupes: string[] = [];
    for (const c of field.customOperators ?? []) {
        if (seen.has(c.id)) dupes.push(c.id);
        seen.add(c.id);
    }
    return dupes;
};

/**
 * Renders the badge label "<operator-label> <value>" with proper formatting.
 * Custom operators with a `tag` use that; otherwise we format `value` against the field's
 * choice labels (for `options`) and join arrays with commas.
 */
export const buildLabel = (operatorId: string, value: any, field: SFilterField): string => {
    const custom = findCustomOperator(field, operatorId);

    if (custom) {
        if (typeof custom.tag === 'function') return custom.tag(value);
        if (typeof custom.tag === 'string') return custom.tag;
        if (value === undefined || value === null || value === '') return custom.label;
        if (Array.isArray(value)) return value.join(', ');
        return String(value);
    }

    const label = translator('filter.operator').t(operatorId);
    const inputs = OPERATOR_INPUT_COUNT[operatorId] ?? FIELD_TYPE_INPUT_COUNT[field.type];
    if (inputs === 0 || value === undefined || value === null || value === '') return label;

    const resolved = field.type === 'options' ? resolveChoiceLabels(value, field.choices) : value;
    if (Array.isArray(resolved)) return `${label} ${resolved.join(', ')}`;
    return `${label} ${resolved}`;
};
