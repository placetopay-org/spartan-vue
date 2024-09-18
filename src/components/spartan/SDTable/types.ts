export type TDTableProps = {
    class?: string;
    borderless?: boolean;
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
};
