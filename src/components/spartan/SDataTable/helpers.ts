import type { TDataTableProps } from './types';
import type { PaginationState, SortingState } from '@tanstack/vue-table';

export const adaptFromPagination = (pagination: PaginationState) => ({
    page: pagination.pageIndex + 1,
    size: pagination.pageSize,
});

export const adaptToPagination = (pagination: TDataTableProps['pagination']): PaginationState | undefined => {
    if (!pagination) return undefined;

    const paginationData = { pageIndex: 0, pageSize: 10 };
    if (pagination?.page) paginationData.pageIndex = pagination.page - 1;
    if (pagination?.size) paginationData.pageSize = pagination.size;

    return paginationData;
};

export const adaptFromSorting = (sort: SortingState, sorting: NonNullable<TDataTableProps['sorting']>) => {
    const data = Object.keys(sorting).reduce(
        (acc, key) => {
            acc[key] = false;
            return acc;
        },
        {} as NonNullable<TDataTableProps['sorting']>,
    );

    if (sort[0]?.id) data[sort[0].id] = sort[0].desc ? 'desc' : 'asc'; 
    
    return data;
};

export const adaptToSorting = (sorting: TDataTableProps['sorting']): SortingState | undefined => {
    if (!sorting) return undefined;

    const sort = Object.keys(sorting).reduce(
        (acc, key) => {
            if (sorting[key] === 'asc') acc.push({ id: key, desc: false });
            if (sorting[key] === 'desc') acc.push({ id: key, desc: true });
            return acc;
        },
        [] as SortingState,
    );

    return sort;
};
