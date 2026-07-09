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
    /**
     * @en Unique identifier of the custom operator.
     * @es Identificador único del operador personalizado.
     */
    id: string;

    /**
     * @en Label displayed in the operator dropdown.
     * @es Etiqueta mostrada en el dropdown de operadores.
     */
    label: string;

    /**
     * @en Number of value inputs to render when this operator is active. Defaults to the field type's natural count
     * (`0` for existence operators, `1` for text/number/amount/date/options/selection, `2` for dateRange).
     * @es Número de inputs de valor a renderizar cuando este operador está activo. Por defecto usa el conteo natural
     * del tipo de campo (`0` para operadores de existencia, `1` para text/number/amount/date/options/selection, `2` para dateRange).
     */
    inputs?: 0 | 1 | 2;

    /**
     * @en Badge tag — literal string, function of the value, or absent (uses the raw value).
     * @es Etiqueta del badge — string literal, función del valor, o ausente (usa el valor crudo).
     */
    tag?: string | ((value: unknown) => string);
};

// ── Field type id and choice helper ────────────────────────────────────────

export type SFilterFieldType = 'text' | 'number' | 'amount' | 'date' | 'dateRange' | 'options' | 'selection';

export type SFilterChoice = string | { id: string; label: string };
export type SFilterChoices = SFilterChoice[];

// ── Shared field shape ─────────────────────────────────────────────────────

type SFilterBase = {
    /**
     * @en Label displayed for the field in the filter menu and badges.
     * @es Etiqueta mostrada para el campo en el menú de filtros y los badges.
     */
    label: string;

    /**
     * @en Prevents the filter from being removed: its badge is not removable and its entry survives the clear action.
     * @es Evita que el filtro sea eliminado: su badge no es removible y su entrada sobrevive a la acción de limpiar.
     */
    permanent?: boolean;

    /**
     * @en Custom operators that replace or extend the predefined ones for this field.
     * @es Operadores personalizados que reemplazan o extienden los predefinidos para este campo.
     */
    customOperators?: SFilterCustomOperator[];

    /**
     * @en Validation callback for the field value. Return an error message to block applying, or `null` when valid.
     * @es Callback de validación para el valor del campo. Retorna un mensaje de error para bloquear la aplicación, o `null` cuando es válido.
     */
    validate?: (value: any, operator: string) => string | null | Promise<string | null>;
};

// ── Per-type field shapes ──────────────────────────────────────────────────

export type SFilterTextField = SFilterBase & {
    /**
     * @en Discriminates the field as a text filter.
     * @es Discrimina el campo como un filtro de texto.
     */
    type: 'text';

    /**
     * @en Subset of text operators available for this field.
     * @es Subconjunto de operadores de texto disponibles para este campo.
     */
    operators?: SFilterTextOperator[];
};

export type SFilterNumberField = SFilterBase & {
    /**
     * @en Discriminates the field as a number filter.
     * @es Discrimina el campo como un filtro numérico.
     */
    type: 'number';

    /**
     * @en Subset of number operators available for this field.
     * @es Subconjunto de operadores numéricos disponibles para este campo.
     */
    operators?: SFilterNumberOperator[];
};

export type SFilterAmountField = SFilterBase & {
    /**
     * @en Discriminates the field as an amount (money) filter.
     * @es Discrimina el campo como un filtro de monto (dinero).
     */
    type: 'amount';

    /**
     * @en Subset of amount operators available for this field.
     * @es Subconjunto de operadores de monto disponibles para este campo.
     */
    operators?: SFilterAmountOperator[];

    /**
     * @en Fixed currency code for the amount input.
     * @es Código de moneda fijo para el input de monto.
     */
    currency?: keyof typeof Currencies;

    /**
     * @en Currency codes selectable in the amount input. The first one is used as the default.
     * @es Códigos de moneda seleccionables en el input de monto. El primero se usa como predeterminado.
     */
    currencies?: (keyof typeof Currencies)[];

    /**
     * @en Treats the amount value as minor units (e.g. cents).
     * @es Trata el valor del monto como unidades menores (ej. centavos).
     */
    minorUnitMode?: boolean;
};

export type SFilterDateField = SFilterBase & {
    /**
     * @en Discriminates the field as a date filter.
     * @es Discrimina el campo como un filtro de fecha.
     */
    type: 'date';

    /**
     * @en Subset of date operators available for this field.
     * @es Subconjunto de operadores de fecha disponibles para este campo.
     */
    operators?: SFilterDateOperator[];
};

export type SFilterDateRangeField = SFilterBase & {
    /**
     * @en Discriminates the field as a date range filter.
     * @es Discrimina el campo como un filtro de rango de fechas.
     */
    type: 'dateRange';

    /**
     * @en Subset of date range operators available for this field.
     * @es Subconjunto de operadores de rango de fechas disponibles para este campo.
     */
    operators?: SFilterDateRangeOperator[];
};

export type SFilterOptionsField = SFilterBase & {
    /**
     * @en Discriminates the field as an options (choice list) filter.
     * @es Discrimina el campo como un filtro de opciones (lista de elecciones).
     */
    type: 'options';

    /**
     * @en Available choices, as plain strings or `{ id, label }` objects.
     * @es Opciones disponibles, como strings simples u objetos `{ id, label }`.
     */
    choices: SFilterChoices;

    /**
     * @en Allows selecting multiple choices at once.
     * @es Permite seleccionar múltiples opciones a la vez.
     */
    multiple?: boolean;

    /**
     * @en Subset of options operators available for this field.
     * @es Subconjunto de operadores de opciones disponibles para este campo.
     */
    operators?: SFilterOptionsOperator[];
};

export type SFilterSelectionField = SFilterBase & {
    /**
     * @en Discriminates the field as a free tag selection filter.
     * @es Discrimina el campo como un filtro de selección libre de etiquetas.
     */
    type: 'selection';

    /**
     * @en Subset of selection operators available for this field.
     * @es Subconjunto de operadores de selección disponibles para este campo.
     */
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
    /**
     * @en Identifier of the applied operator (predefined or custom).
     * @es Identificador del operador aplicado (predefinido o personalizado).
     */
    operator: string;

    /**
     * @en The applied value. Its shape depends on the field type and operator (string, number, array, etc.).
     * @es El valor aplicado. Su forma depende del tipo de campo y el operador (string, number, arreglo, etc.).
     */
    value: any;
};

export type SFilterValue = Record<string, SFilterEntry>;

// ── Saved filters ──────────────────────────────────────────────────────────

export type SFilterSaved = {
    /**
     * @en Display name of the saved filter.
     * @es Nombre visible del filtro guardado.
     */
    name: string;

    /**
     * @en Snapshot of the filter value captured when the filter was saved.
     * @es Instantánea del valor del filtro capturada cuando se guardó el filtro.
     */
    snapshot: SFilterValue;
};

// ── Props and emits ────────────────────────────────────────────────────────

export type SFilterProps = {
    /**
     * @en Available filter fields, keyed by the field id used in the v-model value.
     * @es Campos de filtro disponibles, indexados por el id de campo usado en el valor del v-model.
     */
    filters: Record<string, SFilterField>;

    /**
     * @en The applied filters (v-model binding), keyed by field id.
     * @es Los filtros aplicados (enlace v-model), indexados por id de campo.
     */
    modelValue?: SFilterValue;

    /**
     * @en Saved filters shown in the saved filters menu.
     * @es Filtros guardados mostrados en el menú de filtros guardados.
     */
    saved?: SFilterSaved[];

    /**
     * @en Hides the apply button.
     * @es Oculta el botón de aplicar.
     */
    hideApplyButton?: boolean;

    /**
     * @en Hides the clear button.
     * @es Oculta el botón de limpiar.
     */
    hideClearButton?: boolean;

    /**
     * @en Emits `apply` immediately when the filters are cleared.
     * @es Emite `apply` inmediatamente cuando se limpian los filtros.
     */
    applyWhenClear?: boolean;

    /**
     * @en Emits `apply` on mount with the initial filter value.
     * @es Emite `apply` al montar con el valor inicial de los filtros.
     */
    immediateApply?: boolean;

    /**
     * @en Adapts the filter layout for small screens.
     * @es Adapta el diseño del filtro para pantallas pequeñas.
     */
    responsive?: boolean;
};

export type SFilterEmits = {
    /**
     * @en Emitted when the applied filters change.
     * @es Se emite cuando los filtros aplicados cambian.
     */
    (event: 'update:modelValue', value: SFilterValue): void;

    /**
     * @en Emitted when the filters are applied.
     * @es Se emite cuando se aplican los filtros.
     */
    (event: 'apply', value: SFilterValue): void;

    /**
     * @en Emitted when the filters are cleared.
     * @es Se emite cuando se limpian los filtros.
     */
    (event: 'clear', value: SFilterValue): void;

    /**
     * @en Emitted when the user saves the current filters under a name.
     * @es Se emite cuando el usuario guarda los filtros actuales bajo un nombre.
     */
    (event: 'save', name: string, snapshot: SFilterValue): void;

    /**
     * @en Emitted when the user loads a saved filter snapshot.
     * @es Se emite cuando el usuario carga una instantánea de filtro guardada.
     */
    (event: 'load', snapshot: SFilterValue): void;

    /**
     * @en Emitted when the user deletes a saved filter.
     * @es Se emite cuando el usuario elimina un filtro guardado.
     */
    (event: 'delete', name: string): void;
};
