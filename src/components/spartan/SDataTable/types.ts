import type { ColumnSort } from "@tanstack/table-core";

export type TDataTableProps = {
    cols: Record<string, string>[] | string[];
    data: unknown[];
    sortable?: boolean;
    filtrable?: boolean;
    loading?: boolean;
    initialSizes: number[];
    pagination?: { page?: number; size?: number; count: number; sizes?: number[] };
    sorting?: { sortable: string[]; sort: ColumnSort };
    containerClass?: string;
};

export type TDataTableEmits = {
    (event: 'paginationChange', value: Pick<Exclude<TDataTableProps['pagination'], undefined>, 'page' | 'size'>): void;
    (event: 'sortingChange', value: ColumnSort): void;
};
