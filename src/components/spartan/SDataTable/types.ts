export type TDataTableProps = {
    cols: Record<string, string>[] | string[];
    pageSizes?: number[];
    initialPageSize?: number;
    data: unknown[];
    sortable?: boolean;
    filtrable?: boolean;
    loading?: boolean;
    pagination?: boolean;
    containerClass?: string;
};
