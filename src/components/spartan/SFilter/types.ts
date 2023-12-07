export enum Oper {
    EX = 'ex',
    NEX = 'nex',
    EQ = 'eq',
    NEQ = 'neq',
    GT = 'gt',
    GTE = 'gte',
    LT = 'lt',
    LTE = 'lte',
    BETWEEN = 'between',
    NBETWEEN = 'notBetween',
    CONTAINS = 'contains',
    NCONTAINS = 'notContains',
    STARTSWITH = 'startsWith',
    ENDSWITH = 'endsWith',
}

type TFilter<O, V> = {
    operator: O;
    value: V;
};

type TExistsFilter = TFilter<Oper.EX | Oper.NEX, null>;
type TEqualOrNotFilter<T> = TFilter<Oper.EQ | Oper.NEQ, T>;
type TContainsOrNotFilter = TFilter<Oper.CONTAINS | Oper.NCONTAINS, string>;
type TStartsOrEndsFilter = TFilter<Oper.STARTSWITH | Oper.ENDSWITH, string>;
type TGtOrLtFilter<T> = TFilter<Oper.GT | Oper.GTE | Oper.LT | Oper.LTE, T>;
type TBetweenOrNotFilter<T> = TFilter<Oper.BETWEEN | Oper.NBETWEEN, [T, T]>;

type TFieldLayout<T, F> = {
    id: string;
    name: string;
    type: T;
    options?: string[];
    filter?: F;
    unique?: boolean;
    required?: boolean;
};

export type FieldTypes = 'boolean' | 'string' | 'number' | 'date' | 'enum';

export enum FieldType {
    BOOLEAN = 'boolean',
    STRING = 'string',
    NUMBER = 'number',
    DATE = 'date',
    ENUM = 'enum',
}

type TFieldBoolean = TFieldLayout<FieldType.BOOLEAN, TExistsFilter | TFilter<Oper.EQ, boolean>>;
type TFieldString = TFieldLayout<
    FieldType.STRING,
    TExistsFilter | TEqualOrNotFilter<string> | TContainsOrNotFilter | TStartsOrEndsFilter
>;
type TFieldNumber = TFieldLayout<
    FieldType.NUMBER,
    TExistsFilter | TEqualOrNotFilter<number> | TGtOrLtFilter<number> | TBetweenOrNotFilter<number>
>;
type TFieldDate = TFieldLayout<
    FieldType.DATE,
    TExistsFilter | TEqualOrNotFilter<Date> | TGtOrLtFilter<Date> | TBetweenOrNotFilter<Date>
>;
type TFieldEnum = TFieldLayout<FieldType.ENUM, TExistsFilter | TEqualOrNotFilter<string[]>>;

export type TField = TFieldBoolean | TFieldString | TFieldNumber | TFieldDate | TFieldEnum;

export type Option = {
    label: string;
    value: string;
};

type StringOperator = 'eq' | 'notEq' | 'contains' | 'notContains' | 'startsWith' | 'endsWith';
type EnumOperator = 'in' | 'notIn';

type EnumConfig = {
    type: 'enum';
    config: {
        operator?: Record<string, string>[];
        include?: EnumOperator[];
        options: string[];
        multiple?: boolean;
    };
    state?: {
        operator: string;
        value: string | string[];
    };
};

type BooleanConfig = {
    type: 'boolean';
    config?: {
        true?: string;
        false?: string;
    };
    state?: boolean;
};

type StringConfig = {
    type: 'string';
    config: {
        operators?: Record<string, { name: string; description: string }>[];
        inlcude?: StringOperator[];
    };
    state?: {
        operator: string;
        value: string;
    };
};

type NumberConfig = {
    type: 'number';
    config: {
        operators: Record<string, string>[];
        range?: boolean;
    };
    state?: {
        operator: string;
        value: number | number[];
    };
};

type DateConfig = {
    type: 'date';
    config: {
        operators: Record<string, string>[];
        range?: boolean;
    };
    state?: {
        operator: string;
        value: Date | Date[];
    };
};

// export type Field<T = 'any'> = {
//     id: string;
//     name: string;
//     permanent?: boolean;
// } & (T extends 'enum'
//     ? EnumConfig
//     : T extends 'boolean'
//     ? BooleanConfig
//     : T extends 'string'
//     ? StringConfig
//     : T extends 'number'
//     ? NumberConfig
//     : T extends 'date'
//     ? DateConfig
//     : EnumConfig | BooleanConfig | StringConfig | NumberConfig | DateConfig);

export type Field = {
    id: string;
    name: string;
    permanent?: boolean;
} & (EnumConfig | BooleanConfig | StringConfig | NumberConfig | DateConfig);

const a: Field = {
    id: 'hola',
    name: 'hola',
    type: 'enum',
    config: {
        options: ['hola'],
    },
};
