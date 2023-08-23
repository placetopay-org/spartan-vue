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
  IN = 'in',
  NIN = 'notIn',
}

type TVoidFilter<C> = {
  operator: C;
};

type TOneFilter<C, V> = {
  operator: C;
  value: V;
};

type TTwoFilter<C, V> = {
  operator: C;
  value: [V, V];
};

type TExistsFilter = TVoidFilter<Oper.EX | Oper.NEX>;
type TEqualOrNotFilter<T> = TOneFilter<Oper.EQ | Oper.NEQ, T>;
type TContainsOrNotFilter = TOneFilter<Oper.CONTAINS | Oper.NCONTAINS, string>;
type TStartsOrEndsFilter = TOneFilter<Oper.STARTSWITH | Oper.ENDSWITH, string>;
type TGtOrLtFilter<T> = TOneFilter<Oper.GT | Oper.GTE | Oper.LT | Oper.LTE, T>;
type TBetweenOrNotFilter<T> = TTwoFilter<Oper.BETWEEN | Oper.NBETWEEN, T>;
type TInOrNotFilter = TOneFilter<Oper.IN | Oper.NIN, string[]>;

type TFilterLayout<T, F> = {
  field: string;
  type: T;
  options?: string[];
  filter?: F;
}

export enum FieldType {
  BOOLEAN = 'boolean',
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date',
  ENUM = 'enum',
}

type TFilterBoolean = TFilterLayout<FieldType.BOOLEAN, TExistsFilter | TOneFilter<Oper.EQ, boolean>>
type TFilterString = TFilterLayout<FieldType.STRING, TExistsFilter | TEqualOrNotFilter<string> | TContainsOrNotFilter | TStartsOrEndsFilter>;
type TFilterNumber = TFilterLayout<FieldType.NUMBER, TExistsFilter | TEqualOrNotFilter<number> | TGtOrLtFilter<number> | TBetweenOrNotFilter<number>>;
type TFilterDate = TFilterLayout<FieldType.DATE, TExistsFilter | TEqualOrNotFilter<Date> | TGtOrLtFilter<Date> | TBetweenOrNotFilter<Date>>;
type TFilterEnum = TFilterLayout<FieldType.ENUM, TExistsFilter | TInOrNotFilter>;

export type TFilter = TFilterBoolean | TFilterString | TFilterNumber | TFilterDate | TFilterEnum;
