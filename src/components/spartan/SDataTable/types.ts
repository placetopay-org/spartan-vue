export type TDataTableProps = {
    cols: Record<string, string>[] | string[];
    data: unknown[];
    sortable?: boolean;
    filtrable?: boolean;
    loading?: boolean;
    pagination?: { page?: number; size?: number; count: number; sizes?: number[] };
    sorting?: Record<string, 'asc' | 'desc' | false>;
    containerClass?: string;
};

export type TDataTableEmits = {
    (event: 'paginationChange', value: Pick<Exclude<TDataTableProps['pagination'], undefined>, 'page' | 'size'>): void;
    (event: 'sortingChange', value: Exclude<TDataTableProps['sorting'], undefined>): void;
};
