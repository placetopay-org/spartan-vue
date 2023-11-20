<script setup lang="ts">
import { computed, ref } from 'vue';
import { Loader } from '@internal';
import {
    FlexRender,
    getCoreRowModel,
    getSortedRowModel,
    useVueTable,
    createColumnHelper,
    type SortingState,
    getFilteredRowModel,
    getPaginationRowModel,
    type PaginationState,
} from '@tanstack/vue-table';
import { STable, STableHead, STableBody, STableRow, STableCell, STableHeadCell, type TTableProps } from '../STable';
import {
    ChevronUpIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronDoubleLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { BORDER_STYLE } from '../STable/styles';
import { SInput, SSelect } from '..';
import type { TDataTableProps } from './types';
import { translator } from '@/helpers';

const emits = defineEmits<{
    (event: 'paginationChange', value: PaginationState): void;
}>();
const props = defineProps<TDataTableProps & Partial<TTableProps>>();

const tableProps = computed<Partial<TTableProps>>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { borderless, cols, rows, highlight, ...rest } = props;

    return { ...rest };
});

const clientSideOptions = computed(() => {
    if (typeof props.clientSide === 'boolean') {
        return {
            manualPagination: !props.clientSide,
            manualSorting: !props.clientSide,
            manualFiltering: !props.clientSide,
        };
    } else {
        return {
            manualPagination: !props.clientSide?.includes('pagination'),
            manualSorting: !props.clientSide?.includes('sorting'),
            manualFiltering: !props.clientSide?.includes('filtering'),
        };
    }
});

const { t } = translator('dataTable');

const columnHelper = createColumnHelper<any>();
const columns = props.cols.map((col) => {
    if (typeof col === 'string') {
        return columnHelper.accessor(col, {
            id: col,
            header: col,
        });
    } else {
        const key = Object.keys(col)[0];
        return columnHelper.accessor(key, {
            id: key,
            header: col[key],
        });
    }
});

const data = computed(() => props.data);

const globalFilter = ref('');
const sorting = ref<SortingState>([]);
const pagination = computed<PaginationState>(() => ({
    pageSize: props.pagination?.pageSize || 10,
    pageIndex: props.pagination?.pageIndex || 0,
}));

const table = useVueTable({
    get data() {
        return data.value;
    },
    get enableSorting() {
        return props.sortable;
    },
    get enableGlobalFilter() {
        return props.filtrable;
    },
    get pageCount() {
        return props.pagination?.pageCount ?? -1;
    },
    state: {
        get pagination() {
            return pagination.value;
        },
        get sorting() {
            return sorting.value;
        },
        get globalFilter() {
            return globalFilter.value;
        },
    },
    onPaginationChange: (updaterOrValue) => {
        emits(
            'paginationChange',
            typeof updaterOrValue === 'function' ? updaterOrValue(table.getState().pagination) : updaterOrValue,
        );
    },
    onSortingChange: (updaterOrValue) => {
        sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: 'includesString',
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...clientSideOptions.value,
});
</script>

<template>
    <div :class="twMerge(!props.borderless && BORDER_STYLE, props.containerClass)">
        <div
            v-if="filtrable || pageSizes"
            :class="twMerge('flex justify-end bg-white px-5 py-3', filtrable && pageSizes && 'justify-between')"
        >
            <SSelect
                class="py-1 text-sm"
                v-if="props.pageSizes"
                :modelValue="table.getState().pagination.pageSize"
                @update:model-value="
                    (value) => {
                        table.setPageSize(Number(value));
                    }
                "
            >
                <option v-for="pageSize in $props.pageSizes" :key="pageSize" :value="pageSize">
                    {{ `${t('pageSizePrefix')} ${pageSize}` }}
                </option>
            </SSelect>

            <SInput
                v-if="filtrable"
                class="w-1/2 rounded-md"
                inputClass="text-sm py-1"
                v-model="globalFilter"
                :placeholder="`${t('searchPlaceholder')}...`"
            />
        </div>
        <STable v-bind="tableProps" :borderless="Boolean(filtrable || sortable || pagination)">
            <STableHead>
                <STableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <STableHeadCell v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan">
                        <component
                            v-if="!header.isPlaceholder"
                            :is="header.column.getCanSort() ? 'button' : 'div'"
                            @click="header.column.getToggleSortingHandler()?.($event)"
                            :class="
                                twMerge(
                                    'flex items-center gap-2',
                                    header.column.getCanSort() && 'select-none',
                                    header.column.getCanSort() && header.column.getIsSorted() && 'text-primary-600',
                                )
                            "
                        >
                            <slot :name="`head[${header.column.columnDef.id}]`" :value="header.column.columnDef.header">
                                <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                            </slot>

                            <component
                                v-if="header.column.getCanSort()"
                                :is="
                                    { asc: ChevronUpIcon, desc: ChevronDownIcon }[header.column.getIsSorted() as string]
                                "
                                class="h-5 w-5 rounded bg-primary-100"
                            />
                        </component>
                    </STableHeadCell>
                </STableRow>
            </STableHead>

            <STableBody>
                <STableRow v-if="!loading" v-for="row in table.getRowModel().rows" :key="row.id">
                    <STableCell
                        v-for="(cell, index) in row.getVisibleCells()"
                        :key="cell.id"
                        :highlight="props.highlight?.includes(index)"
                    >
                        <slot
                            :name="`col[${cell.column.columnDef.id}]`"
                            :record="cell.row.original"
                            :value="(cell.column.columnDef.cell as any)?.(cell.getContext())"
                        >
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                        </slot>
                    </STableCell>
                </STableRow>
                <STableRow v-else>
                    <STableCell :colspan="cols.length">
                        <div class="flex w-full justify-center">
                            <Loader :size="50" />
                        </div>
                    </STableCell>
                </STableRow>
            </STableBody>
        </STable>
        <div v-if="pagination && table.getState().pagination.pageIndex >= 0 && table.getPageCount() !== -1" class="flex items-center gap-4 border-t border-gray-300 bg-gray-50 px-5 py-3">
            <div class="flex items-center gap-1">
                <button
                    class="group rounded border bg-gray-100 p-1 disabled:pointer-events-none disabled:opacity-50"
                    @click="() => table.setPageIndex(0)"
                    :disabled="!table.getCanPreviousPage()"
                >
                    <ChevronDoubleLeftIcon class="h-5 w-5 text-gray-500 duration-100 group-hover:text-gray-800" />
                </button>
                <button
                    class="group rounded border bg-gray-100 p-1 disabled:pointer-events-none disabled:opacity-50"
                    @click="() => table.previousPage()"
                    :disabled="!table.getCanPreviousPage()"
                >
                    <ChevronLeftIcon class="h-5 w-5 text-gray-500 duration-100 group-hover:text-gray-800" />
                </button>
                <button
                    class="group rounded border bg-gray-100 p-1 disabled:pointer-events-none disabled:opacity-50"
                    @click="() => table.nextPage()"
                    :disabled="!table.getCanNextPage()"
                >
                    <ChevronRightIcon class="h-5 w-5 text-gray-500 duration-100 group-hover:text-gray-800" />
                </button>
                <button
                    class="group rounded border bg-gray-100 p-1 disabled:pointer-events-none disabled:opacity-50"
                    @click="() => table.setPageIndex(table.getPageCount() - 1)"
                    :disabled="!table.getCanNextPage()"
                >
                    <ChevronDoubleRightIcon class="h-5 w-5 text-gray-500 duration-100 group-hover:text-gray-800" />
                </button>
            </div>

            <div class="flex items-center gap-2">
                <span>{{ t('page') }}</span>
                <div class="flex items-center gap-2 font-bold">
                    {{ table.getState().pagination.pageIndex + 1 }}
                    <span class="font-normal">{{ t('of') }}</span>
                    {{ table.getPageCount() }}
                </div>
            </div>
        </div>
    </div>
</template>
