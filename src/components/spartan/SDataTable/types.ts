export type TDataTableProps = {
    cols: Record<string, string>[];
    data: unknown[];
    sortable?: boolean;
    filtrable?: boolean;
    loading?: boolean;
    containerClass?: string;
};