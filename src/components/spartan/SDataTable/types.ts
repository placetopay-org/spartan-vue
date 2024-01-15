import type { ColumnSort } from "@tanstack/table-core";

export type TDataTableProps = {
    cols: Record<string, string>[] | string[];
    displayHeaderText?: (header: string) => string;
    data: unknown[];
    filtrable?: boolean;
    loading?: boolean;
    pagination?: { page?: number; count: number; size?: number, sizes?: number[] };
    sorting?: { availableColumns: string[]; currentSort?: ColumnSort, descFirst?: boolean };
    containerClass?: string;
};

export type TDataTableEmits = {
    (event: 'paginationChange', value: Pick<Exclude<TDataTableProps['pagination'], undefined>, 'page' | 'size'>): void;
    (event: 'sortingChange', value: ColumnSort): void;
};
