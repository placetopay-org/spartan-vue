import type { ColumnSort } from '@tanstack/table-core';

export type TDataTableProps = {
    cols:
        | {
              id: string;
              sortable?: boolean;
              header?: string;
              sortDescFirst?: boolean;
          }[]
        | string[];
    displayHeaderText?: (header: string) => string;
    data: unknown[];
    filter?: string | number;
    loading?: boolean;
    pagination?: { page?: number; count: number; size?: number; sizes?: number[] };
    sorting?: ColumnSort;
    containerClass?: string;
    numericPaginator?: boolean | string;
};

export type TDataTableEmits = {
    (event: 'paginationChange', value: Pick<Exclude<TDataTableProps['pagination'], undefined>, 'page' | 'size'>): void;
    (event: 'sortingChange', value: ColumnSort): void;
    (event: 'filterChange', value: string): void;
    (
        event: 'change',
        value:
            | {
                  type: 'pagination';
                  value: Pick<Exclude<TDataTableProps['pagination'], undefined>, 'page' | 'size'>;
              }
            | {
                  type: 'sorting';
                  value: ColumnSort;
              }
            | {
                  type: 'filter';
                  value: string;
              },
    ): void;
};
