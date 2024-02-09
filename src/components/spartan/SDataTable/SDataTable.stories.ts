import SDataTable from './SDataTable.vue';
import { SBadge } from '../SBadge';
import { createDefault, createVariation, createHistory } from '@/helpers';
import { table } from '@/data';
import { QrCodeIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { computed, ref } from 'vue';

export default {
    component: SDataTable,
    title: 'tables/DataTable',
    ...createHistory({
        description: 'The DataTable component is used to display data in a table format.',
        slots: [
            {
                name: '`head[${header.column.columnDef.id}]`',
                description: 'Slot to customize the header of a column.',
            },
            {
                name: '`col[${cell.column.columnDef.id}]`',
                description: 'Slot to customize the content of a column.',
            },
        ],
        props: [
            {
                name: 'cols',
                type: 'custom-type: cols',
                default: '[]',
                description: 'Columns to display in the table.',
            },
            {
                name: 'data',
                type: 'unknown[]',
                default: '[]',
                description: 'Data to display in the table.',
            },
            {
                name: 'displayHeaderText',
                type: '(header: string) => string',
                default: 'undefined',
                description: 'Function to transform the header text.',
                control: null,
            },
            {
                name: 'filtrable',
                type: 'Boolean',
                default: 'false',
                description: 'Enable the filter input for the table.',
            },
            {
                name: 'loading',
                type: 'Boolean',
                default: 'false',
                description: 'Show a loading spinner in the table.',
            },
            {
                name: 'pagination',
                type: 'custom-type: pagination',
                default: 'undefined',
                description: 'Enable the pagination for the table. It can be an object with the properties: page, count, size, sizes.',
            },
            {
                name: 'sorting',
                type: 'custom-type: sorting',
                default: 'undefined',
                description: 'Enable the sorting for the table. It can be an object with the properties: id, desc.',
            },
            {
                name: 'containerClass',
                type: 'string',
                default: 'undefined',
                description: 'Class to apply to the container of the table.',
            },
            {
                name: 'numericPaginator',
                type: 'boolean | number',
                default: 'false',
                description: 'Enable the numeric paginator for the table. It can be a boolean or a number.',
            },
            {
                name: 'class',
                description: '[STable](/?path=/docs/tables-table--docs)',
                subcategory: 'Inherited from the STable',
            },
            {
                name: 'borderless',
                description: '[STable](/?path=/docs/tables-table--docs)',
                subcategory: 'Inherited from the STable',
            },
            {
                name: 'highlight',
                description: '[STable](/?path=/docs/tables-table--docs)',
                subcategory: 'Inherited from the STable',
            }
        ],
        events: [
            {
                name: 'paginationChange',
                description: 'Pagination change event.',
                type: '{ page: number; size: number }',
            },
            {
                name: 'sortingChange',
                description: 'Sorting change event.',
                type: '{ id: string; desc: boolean }',
            },
            {
                name: 'change',
                description: 'Change event. (pagination | sorting)',
                type: 'custom-type: change',
            }
        ]
    }),
};

export const Default = createDefault({
    components: { SDataTable, SBadge, QrCodeIcon, DocumentDuplicateIcon, TrashIcon },
    setup: () => {
        const pagination = ref({ page: 1, size: 2, sizes: [1, 2, 3, 5, 10], count: 5 });

        const rows = computed(() => {
            pagination.value = { ...pagination.value, count: Math.ceil(table.rows.length / pagination.value.size) };
            const start = (pagination.value.page - 1) * pagination.value.size;
            const end = start + pagination.value.size;
            return table.rows.slice(start, end);
        });

        return { cols: table.colsData.slice(0, 4), rows, pagination };
    },
    template: `<SDataTable 
    v-bind="args" 
    :cols="cols" 
    :data="rows"
    numericPaginator="1"
    :pagination="pagination" 
    @paginationChange="pagination = {...pagination, ...$event}"
    >  
</SDataTable>`,
    transform: (
        args,
    ) => `<SDataTable class="w-[610px]" :cols="cols" :rows="rows" :pagination="pagination"  @paginationChange="pagination = {...pagination, ...$event}">
    <template #col[role]="{ value }">
        <SBadge :color="value === 'Admin' ? 'yellow' : 'green'">{{ value }}</SBadge>
    </template>    

    <template #col[4]>
        <div class="flex h-full gap-2 [&>*]:h-5 [&>*]:w-5">
            <button><QrCodeIcon /></button>
            <button><DocumentDuplicateIcon /></button>
            <button><TrashIcon class="text-red-500" /></button>
        </div>
    </template>
</SDataTable>`,
    args: {
        filtrable: true,
        loading: false,
        borderless: false,
        pagination: true,
    },
});

export const Base = createVariation({
    components: { SDataTable },
    containerClass: 'w-fit',
    setup: () => {
        return { cols: table.colsData.slice(0, 4), rows: table.rows.slice(0, 4) };
    },
    template: `<SDataTable :cols="cols" :data="rows" />`,
});

export const Sortable = createVariation({
    components: { SDataTable },
    containerClass: 'w-fit',
    setup: () => {
        const sorting = ref({ id: 'email', desc: false });
        const cols = [...table.colsData];
        cols[0].sortable = true;
        cols[1].sortable = true;
        cols[2].sortable = true;

        cols[1].sortDescFirst = true;

        return {
            cols: cols.slice(0, 4),
            rows: table.rows.slice(0, 4),
            sorting,
        };
    },
    template: `<!-- sorting = { id: 'email', desc: false } -->
<SDataTable 
    :cols="cols" 
    :data="rows" 
    :sorting="sorting" 
    @sortingChange="sorting = $event"
    />`,
});

export const Pagination = createVariation({
    components: { SDataTable },
    containerClass: 'w-fit',
    setup: () => {
        const pagination = ref({ page: 1, size: 3, count: -1 });

        const rows = computed(() => {
            pagination.value = { ...pagination.value, count: Math.ceil(table.rows.length / pagination.value.size) };
            const start = (pagination.value.page - 1) * pagination.value.size;
            const end = start + pagination.value.size;
            return table.rows.slice(start, end);
        });

        return { cols: table.colsData.slice(0, 4), rows, pagination };
    },
    template: `<!-- pagination = { size: 3, count: 4 } -->
<SDataTable 
    :cols="cols" 
    :data="rows" 
    :pagination="pagination" 
    @paginationChange="pagination = {...pagination, ...$event}"
/>`,
});

export const NumericPagination = createVariation({
    components: { SDataTable },
    containerClass: 'w-[800px] flex flex-col gap-8',
    setup: () => {
        const pagination = ref({ page: 1, size: 3, count: -1 });

        const rows = computed(() => {
            pagination.value = { ...pagination.value, count: Math.ceil(table.rows.length / pagination.value.size) };
            const start = (pagination.value.page - 1) * pagination.value.size;
            const end = start + pagination.value.size;
            return table.rows.slice(start, end);
        });

        return { cols: table.colsData.slice(0, 4), rows, pagination };
    },
    template: `<!-- pagination = { size: 3, count: 4 } -->
<SDataTable 
    :cols="cols" 
    :data="rows" 
    :pagination="pagination" 
    numericPaginator
    @paginationChange="pagination = {...pagination, ...$event}"
/>

<SDataTable 
    :cols="cols" 
    :data="rows" 
    :pagination="pagination" 
    numericPaginator="1"
    @paginationChange="pagination = {...pagination, ...$event}"
/>

<SDataTable 
    :cols="cols" 
    :data="rows" 
    :pagination="pagination" 
    numericPaginator="2"
    @paginationChange="pagination = {...pagination, ...$event}"
/>`,
});

export const PageSizes = createVariation({
    components: { SDataTable },
    containerClass: 'w-[800px] flex flex-col gap-8',
    setup: () => {
        const pagination = ref({ page: 1, size: 3, sizes: [1, 2, 3, 4], count: -1 });

        const rows = computed(() => {
            pagination.value = { ...pagination.value, count: Math.ceil(table.rows.length / pagination.value.size) };
            const start = (pagination.value.page - 1) * pagination.value.size;
            const end = start + pagination.value.size;
            return table.rows.slice(start, end);
        });

        return { cols: table.colsData.slice(0, 4), rows, pagination };
    },
    template: `<!-- pagination = { size: 3, sizes: [1, 2, 3, 4], count: 4 } -->
<SDataTable 
    :cols="cols" 
    :data="rows" 
    :pagination="pagination" 
    @paginationChange="pagination = {...pagination, ...$event}"
/>

<SDataTable 
    :cols="cols" 
    :data="rows" 
    numericPaginator
    :pagination="pagination" 
    @paginationChange="pagination = {...pagination, ...$event}"
/>`,
});

// export const Filtrable = createVariation({
//     components: { SDataTable },
//     containerClass: 'w-fit',
//     setup: () => {
//         return { cols: table.colsData, rows: table.rows.slice(0, 4) };
//     },
//     template: `<SDataTable filtrable :cols="cols" :data="rows" />`,
// });

export const CustomCells = createVariation({
    components: { SDataTable, SBadge },
    containerClass: 'w-fit',
    setup: () => {
        return { cols: table.colsData.slice(0, 4), rows: table.rows.slice(0, 4) };
    },
    template: `<SDataTable :cols="cols" :data="rows">
    <template #head[email]="{ value }">
        {{ value }}
        <span class="italic text-gray-500">(secret)</span>
    </template>

    <template #head[role]="{ value }">
        {{ value }}:
        <div class="h-4 w-4 rounded-full bg-yellow-400" />
        <div class="h-4 w-4 rounded-full bg-green-400" />
    </template>

    <template #col[email]="{ value }">
        {{ value.slice(0, 3) }}***
    </template>

    <template #col[role]="{ value }">
        <SBadge :color="value === 'Admin' ? 'yellow' : 'green'">{{ value }}</SBadge>
    </template>
</SDataTable>`,
});

export const Loading = createVariation({
    components: { SDataTable },
    containerClass: 'w-fit',
    setup: () => {
        return { cols: table.colsData.slice(0, 4), rows: table.rows.slice(0, 4) };
    },
    template: `<SDataTable loading :cols="cols" :data="rows" />`,
});
