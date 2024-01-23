<script setup lang="ts">
import { computed, ref } from 'vue';
import { Loader } from '@internal';
import SimplePaginator from './paginators/SimplePaginator.vue';
import NumericPaginator from './paginators/NumericPaginator.vue';
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
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { BORDER_STYLE } from '../STable/styles';
import { SInput } from '..';
import type { TDataTableProps, TDataTableEmits } from './types';
import { translator } from '@/helpers';
import { adaptFromPagination, adaptToPagination, adaptToSorting } from './helpers';

const emits = defineEmits<TDataTableEmits>();
const props = withDefaults(defineProps<TDataTableProps & Partial<Omit<TTableProps, 'cols' | 'rows'>>>(), {
    displayHeaderText: (header: string) => header,
});

const tableProps = computed<Partial<TTableProps>>(() => {
    // @typescript-eslint/no-unused-vars
    const { borderless, cols, highlight, ...rest } = props;

    return { ...rest };
});

const { t } = translator('dataTable');

const columnHelper = createColumnHelper<unknown>();
const columns = props.cols.map((col) => {
    if (typeof col === 'string') {
        return columnHelper.accessor(col, {
            id: col,
            header: col,
        });
    } else {
        return columnHelper.accessor(col.id, {
            id: col.id,
            header: col.header ?? col.id,
            enableSorting: Boolean(col.sortable),
            sortDescFirst: Boolean(col.sortDescFirst),
        });
    }
});

const data = computed(() => props.data);

const globalFilter = ref('');

const table = useVueTable({
    get data() {
        return data.value;
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
        const value = adaptFromPagination(
            typeof updaterOrValue === 'function' ? updaterOrValue(table.getState().pagination) : updaterOrValue,
        );

        emits('paginationChange', value);
        emits('change', { type: 'pagination', value });
    },
    onSortingChange: (updaterOrValue) => {
        const value = typeof updaterOrValue === 'function' ? updaterOrValue(table.getState().sorting) : updaterOrValue;
        emits('sortingChange', value[0]);
        emits('change', { type: 'sorting', value: value[0] });
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
                                <FlexRender
                                    :render="displayHeaderText(header.column.columnDef.header as string)"
                                    :props="header.getContext()"
                                />
                            </slot>

                            <component
                                v-if="header.column.getCanSort() && !header.column.getIsSorted()"
                                :is="header.column.getFirstSortDir() === 'desc' ? ChevronDownIcon : ChevronUpIcon"
                                class="invisible h-5 w-5 rounded text-gray-400 group-hover:visible group-focus-visible:visible"
                            />

                            <component
                                v-if="header.column.getCanSort() && header.column.getIsSorted()"
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
            class="border-t border-gray-300 bg-gray-50 px-5 py-3"
            v-if="pagination && table.getState().pagination.pageIndex >= 0 && table.getPageCount() !== -1"
        >
            <NumericPaginator v-if="numericPaginator" :table="table" :pagination="pagination" />
            <SimplePaginator v-else :table="table" :pagination="pagination" />
        </div>
    </div>
</template>
