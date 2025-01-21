import type { TPaginatorProps } from "@spartan";

export type TDTableProps = {
    class?: string;
    borderless?: boolean;
    paginator?: TPaginatorProps;
    data: any[];
    rowLink?: (row: any) => string;
    slim?: boolean;
};

export type TDColumnProps = {
    field?: string | symbol;
    header?: string;
    noLink?: boolean;
    sort?: 'asc' | 'des' | boolean;
    unstyled?: boolean;
    expander?: boolean;
};

export type TDTableEmits = {
    (event: 'sort', value: Pick<TDColumnProps, 'field' | 'sort'>): void;
    (event: 'paginatorChange', value: { page?: number; size?: number, dir?: 'prev' | 'next' }): void
};
