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

export const adaptToSorting = (sorting: TDataTableProps['sorting']): SortingState | undefined => {
    if (!sorting) return undefined;

    return [sorting.sort];
};
