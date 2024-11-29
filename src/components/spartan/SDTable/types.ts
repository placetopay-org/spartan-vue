import type { TPaginatorProps } from "@spartan";

export type TDTableProps = {
    class?: string;
    borderless?: boolean;
    paginator?: TPaginatorProps;
    data: any[];
    rowLink?: (row: any) => string;
};

export type TDColumnProps = {
    field: string;
    slots?: any;
    header?: string;
    noLink?: boolean;
    sort?: 'asc' | 'des';
};

export type TDTableEmits = {
    (event: 'sort', value: Pick<TDColumnProps, 'field' | 'sort'>): void;
    (event: 'paginatorChange', value: { page?: number; size?: number; count?: number}): void
    (event: 'paginationPrev'): void;
    (event: 'paginationNext'): void;
};
