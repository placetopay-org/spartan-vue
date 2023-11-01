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

const cols = ['Name', 'Title', 'Email', 'Role', ''];
const rows = [
    {
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        email: 'lindsay.walton@example.com',
        role: 'Member',
    },
    {
        name: 'Jhon Connor',
        title: 'Back-end Developer',
        email: 'jhon.connor@example.com',
        role: 'Member',
    },
    {
        name: 'Jane Doe',
        title: 'Full Stack Developer',
        email: 'jane.doe@example.com',
        role: 'Admin',
    },
    {
        name: 'John Smith',
        title: 'Data Scientist',
        email: 'john.smith@example.com',
        role: 'Member',
    },
    {
        name: 'Emma Jones',
        title: 'UX Designer',
        email: 'emma.jones@example.com',
        role: 'Member',
    },
    {
        name: 'Robert Brown',
        title: 'Product Manager',
        email: 'robert.brown@example.com',
        role: 'Admin',
    },
    {
        name: 'Sophia Davis',
        title: 'QA Engineer',
        email: 'sophia.davis@example.com',
        role: 'Member',
    },
    {
        name: 'Michael Miller',
        title: 'DevOps Engineer',
        email: 'michael.miller@example.com',
        role: 'Member',
    },
    {
        name: 'Olivia Wilson',
        title: 'Mobile Developer',
        email: 'olivia.wilson@example.com',
        role: 'Member',
    },
    {
        name: 'James Moore',
        title: 'Security Engineer',
        email: 'james.moore@example.com',
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
    setup: () => {
        const getRoleColor = (role: string) => {
            return role === 'Admin' ? 'yellow' : 'green';
        }

        return { cols, rows, getRoleColor };
    },
    template: `<STable borderless>
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
