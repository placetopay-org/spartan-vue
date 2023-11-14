import SDataTable from './SDataTable.vue';
import { SBadge } from '../SBadge';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';
import { table } from '@/data';
import { QrCodeIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/vue/24/outline';

export default {
    component: SDataTable,
    title: 'new/DataTable',
    parameters: {
        docs: {
            description: {
                component: 'The link component is used to navigate between pages.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the link.',
        },

        // Props
        href: {
            control: 'text',
            description: 'The type of the input element.',
            table: { type: { summary: 'string' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SDataTable, SBadge, QrCodeIcon, DocumentDuplicateIcon, TrashIcon },
    setup: () => {
        return { cols: table.colsData, rows: table.rows };
    },
    template: `<SDataTable v-bind="args" :pageSizes="[1, 2, 3, 5, 10]" :cols="cols" :data="rows" />`,
    transform: (args) => `<SDataTable :cols="cols" :rows="rows.map(r => [r.name, r.email, r.title, r.role])">
    <template #col[3]="{ value }">
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
        sortable: false,
        filtrable: true,
        loading: false,
        borderless: false,
    },
});

export const Base = createVariation({
    components: { SDataTable },
    containerClass: 'w-fit',
    setup: () => {
        return { cols: table.colsData, rows: table.rows.slice(0, 4) };
    },
    template: `<SDataTable :cols="cols" :data="rows" />`,
});

export const Sortable = createVariation({
    components: { SDataTable },
    containerClass: 'w-fit',
    setup: () => {
        return { cols: table.colsData, rows: table.rows.slice(0, 4) };
    },
    template: `<!-- Click on the header to sort the table -->
<SDataTable sortable :cols="cols" :data="rows" />`,
});

export const Loading = createVariation({
    components: { SDataTable },
    containerClass: 'w-fit',
    setup: () => {
        return { cols: table.colsData, rows: table.rows.slice(0, 4) };
    },
    template: `<SDataTable loading :cols="cols" :data="rows" />`,
});

export const PageSizes = createVariation({
    components: { SDataTable },
    containerClass: 'w-fit',
    setup: () => {
        return { cols: table.colsData, rows: table.rows.slice(0, 4) };
    },
    template: `<SDataTable :pageSizes="[1, 2, 3, 5, 10]" :cols="cols" :data="rows" />`,
});

export const Filtrable = createVariation({
    components: { SDataTable },
    containerClass: 'w-fit',
    setup: () => {
        return { cols: table.colsData, rows: table.rows.slice(0, 4) };
    },
    template: `<SDataTable filtrable :cols="cols" :data="rows" />`,
});

export const CustomCells = createVariation({
    components: { SDataTable, SBadge },
    containerClass: 'w-fit',
    setup: () => {
        return { cols: table.colsData, rows: table.rows.slice(0, 4) };
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
