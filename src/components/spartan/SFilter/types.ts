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
    name: string;
    type: T;
    options?: string[];
    filter?: F;
    unique?: boolean;
    required?: boolean;
};

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
