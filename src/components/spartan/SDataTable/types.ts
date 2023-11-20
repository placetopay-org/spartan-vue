type TClientOptions = true | ('pagination' | 'sorting' | 'filtering')[];

export type TDataTableProps = {
    cols: Record<string, string>[] | string[];
    pageSizes?: number[];
    data: unknown[];
    sortable?: boolean;
    filtrable?: boolean;
    loading?: boolean;
    pagination?: { pageIndex: number; pageSize: number; pageCount?: number };
    containerClass?: string;
    clientSide?: TClientOptions;
};
