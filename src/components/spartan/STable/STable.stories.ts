import STable from './STable.vue';
import STableHead from './STableHead.vue';
import STableBody from './STableBody.vue';
import STableHeadCell from './STableHeadCell.vue';
import STableRow from './STableRow.vue';
import STableCell from './STableCell.vue';
import { SBadge } from '../SBadge';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';
import { QrCodeIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/vue/24/outline';

export default {
    component: STable,
    title: 'new/Table',
    parameters: {
        docs: {
            description: {
                component: 'A table displays rows of data.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the table.',
        },

        // Props
        borderless: {
            description: 'The type of the input element.',
            table: { type: { summary: 'boolean' } },
        },
    },
};

const cols = ['Name', 'Email', 'Title', 'Role', ''];
const rows = [
    {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        title: 'Front-end Developer',
        role: 'Member',
    },
    {
        name: 'Jhon Connor',
        email: 'jhon.connor@example.com',
        title: 'Back-end Developer',
        role: 'Member',
    },
    {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        title: 'Full Stack Developer',
        role: 'Admin',
    },
    {
        name: 'John Smith',
        email: 'john.smith@example.com',
        title: 'Data Scientist',
        role: 'Member',
    },
    {
        name: 'Emma Jones',
        email: 'emma.jones@example.com',
        title: 'UX Designer',
        role: 'Member',
    },
    {
        name: 'Robert Brown',
        email: 'robert.brown@example.com',
        title: 'Product Manager',
        role: 'Admin',
    },
    {
        name: 'Sophia Davis',
        email: 'sophia.davis@example.com',
        title: 'QA Engineer',
        role: 'Member',
    },
    {
        name: 'Michael Miller',
        email: 'michael.miller@example.com',
        title: 'DevOps Engineer',
        role: 'Member',
    },
    {
        name: 'Olivia Wilson',
        email: 'olivia.wilson@example.com',
        title: 'Mobile Developer',
        role: 'Member',
    },
    {
        name: 'James Moore',
        email: 'james.moore@example.com',
        title: 'Security Engineer',
        role: 'Admin',
    },
];

const sourceBinding = buildSourceBinding({
    check: ['borderless']
});

export const Default = createDefault({
    components: {
        STable,
        STableHead,
        STableBody,
        STableHeadCell,
        STableRow,
        STableCell,
        SBadge,
        QrCodeIcon,
        DocumentDuplicateIcon,
        TrashIcon,
    },
    args: {
        borderless: false,
    },
    setup: () => {
        return { cols, rows };
    },
    template: `<STable v-bind="args">
    <STableHead>
        <STableHeadCell v-for="col in cols" :key="col">{{ col }}</STableHeadCell>
    </STableHead>

    <STableBody>
        <STableRow v-for="row in rows">
            <STableCell highlight>
                {{ row.name }}
            </STableCell>
            <STableCell>
                {{ row.email }}
            </STableCell>
            <STableCell>
                {{ row.title }}
            </STableCell>
            <STableCell>
                <SBadge :color="row.role === 'Admin' ? 'yellow' : 'green'">{{ row.role }}</SBadge>
            </STableCell>
            <STableCell class="w-[1%]">
                <div class="flex h-full gap-2 [&>*]:h-5 [&>*]:w-5">
                    <button><QrCodeIcon /></button>
                    <button><DocumentDuplicateIcon /></button>
                    <button><TrashIcon class="text-red-500" /></button>
                </div>
            </STableCell>
        </STableRow>
    </STableBody>
</STable>`,
    transform: (args) => `<STable ${sourceBinding(args)}>
    <STableHead>
        <STableHeadCell v-for="col in cols" :key="col">{{ col }}</STableHeadCell>
    </STableHead>

    <STableBody>
        <STableRow v-for="row in rows">
            <STableCell highlight>
                {{ row.name }}
            </STableCell>
            <STableCell>
                {{ row.title }}
            </STableCell>
            <STableCell>
                {{ row.email }}
            </STableCell>
            <STableCell>
                <SBadge :color="row.role === 'Admin' ? 'yellow' : 'green'">{{ row.role }}</SBadge>
            </STableCell>
            <STableCell class="w-[1%]">
                <div class="flex h-full gap-2 [&>*]:h-5 [&>*]:w-5">
                    <button><QrCodeIcon /></button>
                    <button><DocumentDuplicateIcon /></button>
                    <button><TrashIcon class="text-red-500" /></button>
                </div>
            </STableCell>
        </STableRow>
    </STableBody>
</STable>`,
});

export const Base = createVariation({
    components: {
        STable,
        STableHead,
        STableBody,
        STableHeadCell,
        STableRow,
        STableCell,
        SBadge,
        QrCodeIcon,
        DocumentDuplicateIcon,
        TrashIcon,
    },
    containerClass: 'w-fit',
    setup: () => {
        const getRoleColor = (role: string) => {
            return role === 'Admin' ? 'yellow' : 'green';
        }

        return { cols: cols.slice(0, 2), rows: rows.slice(0, 4), getRoleColor };
    },
    template: `<STable>
    <STableHead>
        <STableHeadCell v-for="col in cols" :key="col">{{ col }}</STableHeadCell>
    </STableHead>
    <STableBody>
        <STableRow v-for="row in rows" :key="row.email">
            <STableCell>
                {{ row.name }}
            </STableCell>
            <STableCell>
                {{ row.email }}
            </STableCell>
        </STableRow>
    </STableBody>
</STable>`,
});

export const InlineAutoGeneration = createVariation({
    components: {
        STable,
        STableHead,
        STableBody,
        STableHeadCell,
        STableRow,
        STableCell,
        SBadge,
        QrCodeIcon,
        DocumentDuplicateIcon,
        TrashIcon,
    },
    containerClass: 'w-fit',
    setup: () => {
        const getRoleColor = (role: string) => {
            return role === 'Admin' ? 'yellow' : 'green';
        }

        return { cols: cols.slice(0, 2), rows: rows.slice(0, 4), getRoleColor };
    },
    template: `<STable :cols="cols" :rows="rows.map(r => [r.name, r.email])" />`,
});

export const Borderless = createVariation({
    components: {
        STable,
        STableHead,
        STableBody,
        STableHeadCell,
        STableRow,
        STableCell,
        SBadge,
        QrCodeIcon,
        DocumentDuplicateIcon,
        TrashIcon,
    },
    containerClass: 'w-fit',
    setup: () => {
        const getRoleColor = (role: string) => {
            return role === 'Admin' ? 'yellow' : 'green';
        }

        return { cols: cols.slice(0, 2), rows: rows.slice(0, 4), getRoleColor };
    },
    template: `<STable borderless :cols="cols" :rows="rows.map(r => [r.name, r.email])" />`,
});

export const HighlightColumn = createVariation({
    components: {
        STable,
        STableHead,
        STableBody,
        STableHeadCell,
        STableRow,
        STableCell,
        SBadge,
        QrCodeIcon,
        DocumentDuplicateIcon,
        TrashIcon,
    },
    containerClass: 'w-fit',
    setup: () => {
        const getRoleColor = (role: string) => {
            return role === 'Admin' ? 'yellow' : 'green';
        }

        return { cols: cols.slice(0, 3), rows: rows.slice(0, 4), getRoleColor };
    },
    template: `<STable :cols="cols">
    <STableBody>
        <STableRow v-for="row in rows" :key="row.email">
            <STableCell highlight>
                {{ row.name }}
            </STableCell>
            <STableCell>
                {{ row.email }}
            </STableCell>
            <STableCell highlight>
                {{ row.title }}
            </STableCell>
        </STableRow>
    </STableBody>
</STable>`,
});

export const HighlightColumnForInlineAutoGenerationMode = createVariation({
    components: {
        STable,
        STableHead,
        STableBody,
        STableHeadCell,
        STableRow,
        STableCell,
        SBadge,
        QrCodeIcon,
        DocumentDuplicateIcon,
        TrashIcon,
    },
    containerClass: 'w-fit',
    setup: () => {
        const getRoleColor = (role: string) => {
            return role === 'Admin' ? 'yellow' : 'green';
        }

        return { cols: cols.slice(0, 3), rows: rows.slice(0, 4), getRoleColor };
    },
    template: `<STable highlight="[0, 2]" :cols="cols" :rows="rows.map(r => [r.name, r.email, r.title])" />`,
});

export const Customize = createVariation({
    components: {
        STable,
        STableHead,
        STableBody,
        STableHeadCell,
        STableRow,
        STableCell,
        SBadge,
        QrCodeIcon,
        DocumentDuplicateIcon,
        TrashIcon,
    },
    setup: () => {
        const getRoleColor = (role: string) => {
            return role === 'Admin' ? 'yellow' : 'green';
        }

        return { cols, rows, getRoleColor };
    },
    template: `<STable>
    <STableHead>
        <STableHeadCell v-for="col in cols" :key="col">{{ col }}</STableHeadCell>
    </STableHead>

    <STableBody>
        <STableRow v-for="row in rows" :key="row.email">
            <STableCell highlight>
                {{ row.name }}
            </STableCell>
            <STableCell>
                {{ row.title }}
            </STableCell>
            <STableCell>
                {{ row.email }}
            </STableCell>
            <STableCell>
                <SBadge :color="getRoleColor(row.role)">{{ row.role }}</SBadge>
            </STableCell>
            <STableCell class="w-[1%]">
                <div class="flex h-full gap-2 [&>*]:h-5 [&>*]:w-5">
                    <button><QrCodeIcon /></button>
                    <button><DocumentDuplicateIcon /></button>
                    <button><TrashIcon class="text-red-500" /></button>
                </div>
            </STableCell>
        </STableRow>
    </STableBody>
</STable>`,
});