export enum COND {
  EX = 'exists',
  NEX = 'notExists',
  EQ = 'equal',
  NEQ = 'notEqual',
  GT = 'greaterThan',
  GTE = 'greaterThanOrEqual',
  LT = 'lessThan',
  LTE = 'lessThanOrEqual',
  BETWEEN = 'between',
  NBETWEEN = 'notBetween',
  CONTAINS = 'contains',
  NCONTAINS = 'notContains',
  STARTSWITH = 'startsWith',
  ENDSWITH = 'endsWith',
  IN = 'in',
  NIN = 'not in',
}

type TVoidFilter<C> = {
  condition: C;
};

type TOneFilter<C, V> = {
  condition: C;
  value: V;
};

type TTwoFilter<C, V> = {
  condition: C;
  value: [V, V];
};

type TExistsFilter = TVoidFilter<COND.EX | COND.NEX>;
type TEqualOrNotFilter<T> = TOneFilter<COND.EQ | COND.NEQ, T>;
type TContainsOrNotFilter = TOneFilter<COND.CONTAINS | COND.NCONTAINS, string>;
type TStartsOrEndsFilter = TOneFilter<COND.STARTSWITH | COND.ENDSWITH, string>;
type TGtOrLtFilter<T> = TOneFilter<COND.GT | COND.GTE | COND.LT | COND.LTE, T>;
type TBetweenOrNotFilter<T> = TTwoFilter<COND.BETWEEN | COND.NBETWEEN, T>;
type TInOrNotFilter = TOneFilter<COND.IN | COND.NIN, string[]>;

type TFilterBoolean = TExistsFilter | TOneFilter<COND.EQ, boolean>;
type TFilterString = TExistsFilter | TEqualOrNotFilter<string> | TContainsOrNotFilter | TStartsOrEndsFilter;
type TFilterNumber = TExistsFilter | TEqualOrNotFilter<number> | TGtOrLtFilter<number> | TBetweenOrNotFilter<number>;
type TFilterDate = TExistsFilter | TEqualOrNotFilter<Date> | TGtOrLtFilter<Date> | TBetweenOrNotFilter<Date>;
type TFilterEnum = TExistsFilter | TInOrNotFilter;

export type TFilter = {
  field: string;
  filter: TFilterBoolean | TFilterString | TFilterNumber | TFilterDate | TFilterEnum;
};
