export type TDataTableProps = {
    cols: Record<string, string>[];
    pageSizes?: number[];
    data: unknown[];
    sortable?: boolean;
    filtrable?: boolean;
    loading?: boolean;
    containerClass?: string;
};