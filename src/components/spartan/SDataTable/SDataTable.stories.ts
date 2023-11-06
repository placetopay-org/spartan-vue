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
        return { cols: table.cols, rows: table.rows };
    },
    template: `<SDataTable :cols="cols" :rows="rows.map(r => [r.name, r.email, r.title, r.role])">
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
        href: 'Link',
    },
});

export const Base = createVariation({
    components: { SDataTable },
    containerClass: 'w-fit',
    setup: () => {
        return { cols: table.cols.slice(0, 2), rows: table.rows.slice(0, 4) };
    },
    template: `<SDataTable :cols="cols" :rows="rows.map(r => [r.name, r.email, r.title, r.role])" />`,
});

export const Sortable = createVariation({
    components: { SDataTable },
    containerClass: 'w-fit',
    setup: () => {
        return { cols: table.cols.slice(0, 2), rows: table.rows.slice(0, 4) };
    },
    template: `<SDataTable sortable :cols="cols" :rows="rows.map(r => [r.name, r.email, r.title, r.role])" />`,
});
