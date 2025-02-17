import type { TPaginatorProps } from "@spartan";
import type { ClassNameValue } from 'tailwind-merge';

export type TDTableProps = {
    class?: ClassNameValue;
    borderless?: boolean;
    paginator?: TPaginatorProps;
    data: Record<string, any>[];
    rowLink?: (row: Record<string, any>) => string;
    slim?: boolean;
    loading?: boolean;
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
