<script setup lang="ts">
import { computed, ref } from 'vue';
import { Loader } from '@internal';
import {
    FlexRender,
    getCoreRowModel,
    getSortedRowModel,
    useVueTable,
    createColumnHelper,
    getFilteredRowModel,
    getPaginationRowModel,
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
import type { TDataTableProps, TDataTableEmits } from './types';
import { translator } from '@/helpers';
import { adaptFromPagination, adaptToPagination, adaptToSorting } from './helpers';

const emits = defineEmits<TDataTableEmits>();
const props = defineProps<TDataTableProps & Partial<TTableProps>>();

const tableProps = computed<Partial<TTableProps>>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { borderless, cols, rows, highlight, ...rest } = props;

    return { ...rest };
});

const { t } = translator('dataTable');

const columnHelper = createColumnHelper<any>();
const columns = props.cols.map((col) => {
    if (typeof col === 'string') {
        return columnHelper.accessor(col, {
            id: col,
            header: col,
            enableSorting: props.sorting?.availableColumns.includes(col),
            sortDescFirst: false,
        });
    } else {
        const key = Object.keys(col)[0];
        return columnHelper.accessor(key, {
            id: key,
            header: col[key],
            enableSorting: props.sorting?.availableColumns.includes(key),
            sortDescFirst: false,
        });
    }
});

const data = computed(() => props.data);

const globalFilter = ref('');

const table = useVueTable({
    get data() {
        return data.value;
    },
    get enableSorting() {
        return Boolean(props.sorting);
    },
    get enableGlobalFilter() {
        return props.filtrable;
    },
    get pageCount() {
        return props.pagination?.count;
    },
    state: {
        get pagination() {
            return computed(() => adaptToPagination(props.pagination)).value;
        },
        get sorting() {
            return computed(() => adaptToSorting(props.sorting)).value;
        },
        get globalFilter() {
            return globalFilter.value;
        },
    },
    onPaginationChange: (updaterOrValue) => {
        emits(
            'paginationChange',
            adaptFromPagination(
                typeof updaterOrValue === 'function' ? updaterOrValue(table.getState().pagination) : updaterOrValue,
            ),
        );
    },
    onSortingChange: (updaterOrValue) => {
        const value = typeof updaterOrValue === 'function' ? updaterOrValue(table.getState().sorting) : updaterOrValue;
        emits('sortingChange', value[0]);
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
});
</script>

<template>
    <div :class="twMerge(!props.borderless && BORDER_STYLE, props.containerClass)">
        <div v-if="filtrable" class="flex justify-end bg-white px-5 py-3">
            <SInput
                v-if="filtrable"
                class="w-1/2 rounded-md"
                inputClass="text-sm py-1"
                v-model="globalFilter"
                :placeholder="`${t('searchPlaceholder')}...`"
            />
        </div>
        <STable v-bind="tableProps" :borderless="Boolean(filtrable || pagination)">
            <STableHead>
                <STableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <STableHeadCell v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan">
                        <component
                            v-if="!header.isPlaceholder"
                            :is="header.column.getCanSort() ? 'button' : 'div'"
                            @click="header.column.getToggleSortingHandler()?.($event)"
                            :class="
                                twMerge(
                                    'group flex items-center gap-2',
                                    header.column.getCanSort() && 'select-none focus-visible:outline-none',
                                )
                            "
                        >
                            <slot :name="`head[${header.column.columnDef.id}]`" :value="header.column.columnDef.header">
                                <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                            </slot>

                            <ChevronUpIcon
                                v-if="header.column.getCanSort() && !header.column.getIsSorted()"
                                class="invisible h-5 w-5 rounded text-gray-400 group-hover:visible group-focus-visible:visible"
                            />

                            <component
                                v-if="header.column.getCanSort()"
                                :is="
                                    { asc: ChevronUpIcon, desc: ChevronDownIcon }[header.column.getIsSorted() as string]
                                "
                                class="h-5 w-5 rounded bg-gray-200 duration-100 group-hover:bg-gray-300"
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
        <div
            v-if="pagination && table.getState().pagination.pageIndex >= 0 && table.getPageCount() !== -1"
            class="flex items-center gap-4 border-t border-gray-300 bg-gray-50 px-5 py-3"
        >
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

            <SSelect
                class="ml-auto py-1 text-sm"
                v-if="pagination?.sizes"
                :modelValue="table.getState().pagination.pageSize"
                @update:model-value="
                    (value) => {
                        table.setPageSize(Number(value));
                    }
                "
            >
                <option v-for="pageSize in $props.pagination?.sizes" :key="pageSize" :value="pageSize">
                    {{ `${t('pageSizePrefix')} ${pageSize}` }}
                </option>
            </SSelect>
        </div>
    </div>
</template>
