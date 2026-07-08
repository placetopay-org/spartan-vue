import { Currencies } from '@/constants';

// ── Per-type operator unions ───────────────────────────────────────────────

export type SFilterTextOperator =
    | 'contains'
    | 'notContains'
    | 'startsWith'
    | 'endsWith'
    | 'equal'
    | 'notEqual'
    | 'exist'
    | 'notExist';

export type SFilterNumberOperator =
    | 'equal'
    | 'notEqual'
    | 'greaterThan'
    | 'greaterThanOrEqual'
    | 'lessThan'
    | 'lessThanOrEqual'
    | 'between'
    | 'notBetween'
    | 'exist'
    | 'notExist';

export type SFilterAmountOperator = SFilterNumberOperator;

export type SFilterDateOperator =
    | 'equal'
    | 'before'
    | 'after'
    | 'today'
    | 'yesterday'
    | 'lastWeek'
    | 'lastMonth'
    | 'lastYear'
    | 'exist'
    | 'notExist';

export type SFilterDateRangeOperator =
    | 'between'
    | 'notBetween'
    | 'lastWeek'
    | 'lastMonth'
    | 'lastYear'
    | 'exist'
    | 'notExist';

export type SFilterOptionsOperator = 'equal' | 'notEqual' | 'exist' | 'notExist';

export type SFilterSelectionOperator = 'equal' | 'notEqual' | 'exist' | 'notExist';

// Operators with no value input.
export type SFilterExistenceOperator = 'exist' | 'notExist';

// Union of every predefined operator id (used by SFilterValue.operator).
export type SFilterOperatorId =
    | SFilterTextOperator
    | SFilterNumberOperator
    | SFilterDateOperator
    | SFilterDateRangeOperator
    | SFilterOptionsOperator
    | SFilterSelectionOperator;

// ── Custom operator ────────────────────────────────────────────────────────

export type SFilterCustomOperator = {
    id: string;
    label: string;
    /**
     * Number of value inputs to render when this operator is active.
     * Defaults to the field type's natural count (`0` for existence operators,
     * `1` for text/number/amount/date/options/selection, `2` for dateRange).
     */
    inputs?: 0 | 1 | 2;
    /** Badge tag — literal string, function of the value, or absent (uses the raw value). */
    tag?: string | ((value: unknown) => string);
};

// ── Field type id and choice helper ────────────────────────────────────────

export type SFilterFieldType = 'text' | 'number' | 'amount' | 'date' | 'dateRange' | 'options' | 'selection';

export type SFilterChoice = string | { id: string; label: string };
export type SFilterChoices = SFilterChoice[];

// ── Shared field shape ─────────────────────────────────────────────────────

type SFilterBase = {
    label: string;
    permanent?: boolean;
    customOperators?: SFilterCustomOperator[];
    validate?: (value: any, operator: string) => string | null | Promise<string | null>;
};

// ── Per-type field shapes ──────────────────────────────────────────────────

export type SFilterTextField = SFilterBase & {
    type: 'text';
    operators?: SFilterTextOperator[];
};

export type SFilterNumberField = SFilterBase & {
    type: 'number';
    operators?: SFilterNumberOperator[];
};

export type SFilterAmountField = SFilterBase & {
    type: 'amount';
    operators?: SFilterAmountOperator[];
    currency?: keyof typeof Currencies;
    currencies?: (keyof typeof Currencies)[];
    minorUnitMode?: boolean;
};

export type SFilterDateField = SFilterBase & {
    type: 'date';
    operators?: SFilterDateOperator[];
};

export type SFilterDateRangeField = SFilterBase & {
    type: 'dateRange';
    operators?: SFilterDateRangeOperator[];
};

export type SFilterOptionsField = SFilterBase & {
    type: 'options';
    choices: SFilterChoices;
    multiple?: boolean;
    operators?: SFilterOptionsOperator[];
};

export type SFilterSelectionField = SFilterBase & {
    type: 'selection';
    operators?: SFilterSelectionOperator[];
};

export type SFilterField =
    | SFilterTextField
    | SFilterNumberField
    | SFilterAmountField
    | SFilterDateField
    | SFilterDateRangeField
    | SFilterOptionsField
    | SFilterSelectionField;

// ── Applied value (v-model shape) ──────────────────────────────────────────

export type SFilterEntry = {
    operator: string;
    value: any;
};

export type SFilterValue = Record<string, SFilterEntry>;

// ── Saved filters ──────────────────────────────────────────────────────────

export type SFilterSaved = {
    name: string;
    snapshot: SFilterValue;
};

// ── Props and emits ────────────────────────────────────────────────────────

export type SFilterProps = {
    filters: Record<string, SFilterField>;
    modelValue?: SFilterValue;
    saved?: SFilterSaved[];
    hideApplyButton?: boolean;
    hideClearButton?: boolean;
    applyWhenClear?: boolean;
    immediateApply?: boolean;
    responsive?: boolean;
};

export type SFilterEmits = {
    (event: 'update:modelValue', value: SFilterValue): void;
    (event: 'apply', value: SFilterValue): void;
    (event: 'clear', value: SFilterValue): void;
    (event: 'save', name: string, snapshot: SFilterValue): void;
    (event: 'load', snapshot: SFilterValue): void;
    (event: 'delete', name: string): void;
};
