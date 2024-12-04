import type { TPaginatorProps, TPaginatorEmits } from "@spartan";

export type TDTableProps = {
    class?: string;
    borderless?: boolean;
    paginator?: TPaginatorProps;
    data: any[];
    rowLink?: (row: any) => string;
};

export type TDColumnProps = {
    field: string;
    header?: string;
    noLink?: boolean;
    sort?: 'asc' | 'des';
    unstyled?: boolean;
};

export type TDTableEmits = {
    (event: 'sort', value: Pick<TDColumnProps, 'field' | 'sort'>): void;
    (event: 'paginatorChange', value: { page?: number; size?: number, dir?: 'prev' | 'next' }): void
};
