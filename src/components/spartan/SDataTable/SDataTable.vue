<script setup lang="ts">
import { ref } from 'vue';
import { Loader } from '@internal';
import {
    FlexRender,
    getCoreRowModel,
    getSortedRowModel,
    useVueTable,
    createColumnHelper,
    type SortingState,
} from '@tanstack/vue-table';
import { STable, STableHead, STableBody, STableRow, STableCell, STableHeadCell } from '../STable';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';

const props = defineProps<{
    cols: Record<string, string>[];
    data: unknown[];
    sortable?: boolean;
    loading?: boolean;
}>();

const columnHelper = createColumnHelper<any>();
const columns = props.cols.map((col) => {
    console.log(col);
    const key = Object.keys(col)[0];
    return columnHelper.accessor(key, {
        id: key,
        header: col[key],
    });
});

const sorting = ref<SortingState>([]);

const table = useVueTable({
    get data() {
        return props.data;
    },
    get enableSorting() {
        return props.sortable;
    },
    state: {
        get sorting() {
            return sorting.value;
        },
    },
    onSortingChange: (updaterOrValue) => {
        sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
});
</script>

<template>
    <STable>
        <STableHead>
            <STableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                <STableHeadCell
                    v-for="header in headerGroup.headers"
                    :key="header.id"
                    :colSpan="header.colSpan"
                >
                    <component
                        v-if="!header.isPlaceholder"
                        :is="header.column.getCanSort() ? 'button' : 'div'"
                        @click="header.column.getToggleSortingHandler()?.($event)"
                        :class="twMerge('flex gap-2 items-center', header.column.getCanSort() && 'select-none', header.column.getCanSort() && header.column.getIsSorted() && 'text-primary-600')"
                    >
                        <slot :name="`head[${header.column.columnDef.id}]`" :value="header.column.columnDef.header">
                            <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                        </slot>

                        <component
                            v-if="header.column.getCanSort()"
                            :is="{ asc: ChevronUpIcon, desc: ChevronDownIcon }[header.column.getIsSorted() as string]"
                            class="h-5 w-5 rounded bg-primary-100"
                        />
                    </component>
                </STableHeadCell>
            </STableRow>
        </STableHead>

        <STableBody>
            <STableRow v-if="!loading" v-for="row in table.getRowModel().rows" :key="row.id">
                <STableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                    <slot
                    :name="`col[${cell.column.columnDef.id}]`"
                        :value="(cell.column.columnDef.cell as any)?.(cell.getContext())"
                    >
                        <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                    </slot>
                </STableCell>
            </STableRow>
            <STableRow v-else>
                <STableCell :colspan="cols.length">
                    <div class="flex justify-center w-full">
                        <Loader :size="50" />
                    </div>
                </STableCell>
            </STableRow>
        </STableBody>
    </STable>
</template>
