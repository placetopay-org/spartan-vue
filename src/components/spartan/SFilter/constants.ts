import type { Component } from 'vue';
import type {
    SFilterField,
    SFilterFieldType,
    SFilterTextOperator,
    SFilterNumberOperator,
    SFilterAmountOperator,
    SFilterDateOperator,
    SFilterDateRangeOperator,
    SFilterOptionsOperator,
    SFilterSelectionOperator,
} from './types';
import { IOneInput, ITwoInputs, IOptions, ISelection } from './interfaces';

/**
 * Predefined operators allowed for each field type.
 * Exported publicly so consumers can build their own UIs against the same set.
 */
export const OPERATORS_BY_TYPE = {
    text: [
        'contains',
        'notContains',
        'startsWith',
        'endsWith',
        'equal',
        'notEqual',
        'exist',
        'notExist',
    ] as SFilterTextOperator[],
    number: [
        'equal',
        'notEqual',
        'greaterThan',
        'greaterThanOrEqual',
        'lessThan',
        'lessThanOrEqual',
        'between',
        'notBetween',
        'exist',
        'notExist',
    ] as SFilterNumberOperator[],
    amount: [
        'equal',
        'notEqual',
        'greaterThan',
        'greaterThanOrEqual',
        'lessThan',
        'lessThanOrEqual',
        'between',
        'notBetween',
        'exist',
        'notExist',
    ] as SFilterAmountOperator[],
    date: [
        'equal',
        'before',
        'after',
        'today',
        'yesterday',
        'lastWeek',
        'lastMonth',
        'lastYear',
        'exist',
        'notExist',
    ] as SFilterDateOperator[],
    dateRange: [
        'between',
        'notBetween',
        'lastWeek',
        'lastMonth',
        'lastYear',
        'exist',
        'notExist',
    ] as SFilterDateRangeOperator[],
    options: ['equal', 'notEqual', 'exist', 'notExist'] as SFilterOptionsOperator[],
    selection: ['equal', 'notEqual', 'exist', 'notExist'] as SFilterSelectionOperator[],
} as const;

/**
 * Default operator that is rendered when a field declares no `operators` array.
 */
export const DEFAULT_OPERATOR_BY_TYPE: Record<SFilterFieldType, string> = {
    text: 'contains',
    number: 'equal',
    amount: 'equal',
    date: 'equal',
    dateRange: 'between',
    options: 'equal',
    selection: 'equal',
};

/**
 * Number of value inputs an operator renders.
 *
 * - `0` → no value input (existence-style operators and predefined date shortcuts).
 * - `1` → one value input (the default for almost everything).
 * - `2` → two value inputs (range operators).
 */
export type InputCount = 0 | 1 | 2;

/**
 * Default value-input count per predefined operator id.
 * Custom operators may override via `inputs: InputCount`.
 */
export const OPERATOR_INPUT_COUNT: Record<string, InputCount> = {
    // existence
    exist: 0,
    notExist: 0,
    // date shortcuts → no input
    today: 0,
    yesterday: 0,
    lastWeek: 0,
    lastMonth: 0,
    lastYear: 0,
    // ranges → two inputs
    between: 2,
    notBetween: 2,
    // explicit single-input ids (kept for clarity even though `1` is the fallback)
    equal: 1,
    notEqual: 1,
    contains: 1,
    notContains: 1,
    startsWith: 1,
    endsWith: 1,
    greaterThan: 1,
    greaterThanOrEqual: 1,
    lessThan: 1,
    lessThanOrEqual: 1,
    before: 1,
    after: 1,
};

/**
 * Natural input count for a field type (used as the default when a custom
 * operator does not specify `inputs`).
 */
export const FIELD_TYPE_INPUT_COUNT: Record<SFilterFieldType, InputCount> = {
    text: 1,
    number: 1,
    amount: 1,
    date: 1,
    dateRange: 2,
    options: 1,
    selection: 1,
};

/**
 * Resolves which interface component should render the value input for a given
 * field/operator pair. Returns `null` when the operator takes no value
 * (`exist`, `notExist`, date shortcuts, or a custom operator with `inputs: 0`).
 *
 * - `options` / `selection` always map to their dedicated components.
 * - `dateRange` always renders the two-input variant.
 * - `text` / `number` / `amount` / `date` use the one-input variant by default,
 *   but switch to two-input when the active operator has `inputs: 2`
 *   (e.g. `between` on a `number` field).
 */
export const resolveInputComponent = (field: SFilterField, operatorInputCount: InputCount): Component | null => {
    if (operatorInputCount === 0) return null;
    if (field.type === 'options') return IOptions;
    if (field.type === 'selection') return ISelection;
    if (field.type === 'dateRange') return ITwoInputs;
    return operatorInputCount === 2 ? ITwoInputs : IOneInput;
};

/**
 * @deprecated internal mapping — kept for reference. Use {@link resolveInputComponent}.
 */
export const INPUT_COMPONENTS = {
    text: IOneInput,
    number: IOneInput,
    amount: IOneInput,
    date: IOneInput,
    dateRange: ITwoInputs,
    options: IOptions,
    selection: ISelection,
} satisfies Record<SFilterFieldType, Component>;
