import SSidebar from './SSidebar.vue';
import SSidebarItem from './SSidebarItem.vue';
import SSidebarItemGroup from './SSidebarItemGroup.vue';
import { SPlacetopayLogo } from '../SPlacetopayLogo';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';
import { HomeIcon, PaperAirplaneIcon, KeyIcon, LockClosedIcon, CommandLineIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

export default {
    component: SSidebar,
    title: 'new/Sidebar',
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
        placetopayHeader: {
            description: 'If the header of the sidebar is the placetopay logo.',
            table: { type: { summary: 'boolean' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SSidebar, SSidebarItem, SSidebarItemGroup, SPlacetopayLogo },
    containerClass: 'p-40 bg-gray-100',
    template: `<SSidebar v-model="value" v-bind="args">
    <SSidebarItem>Sidebar Item</SSidebarItem>
    <SSidebarItemGroup>
        <template #title>Sub grops</template>

        <SSidebarItem>Item 1</SSidebarItem>
        <SSidebarItem>Item 2</SSidebarItem>
    </SSidebarItemGroup>
</SSidebar>`,
    transform: (args) => `<SSidebar ${sourceBinding(args)}>${args.default}</SSidebar>`,
    args: {
        placetopayHeader: true,
    },
});

export const Base = createVariation({
    components: { SSidebar, SSidebarItem, SSidebarItemGroup, SPlacetopayLogo },
    setup: () => {
        const value = ref('Dashboard');
        return { value, HomeIcon, PaperAirplaneIcon, KeyIcon, LockClosedIcon, CommandLineIcon };
    },
    containerClass: 'flex gap-5 h-[550px]',
    template: `<SSidebar class="w-60" placetopayHeader v-model="value">
    <SSidebarItem :icon="HomeIcon">Dashboard</SSidebarItem>
    <SSidebarItem :icon="PaperAirplaneIcon">Transactions</SSidebarItem>
    <SSidebarItem :icon="CommandLineIcon">System</SSidebarItem>

    <SSidebarItemGroup :icon="KeyIcon">
        <template #title>Administration</template>

        <SSidebarItem>Merchants</SSidebarItem>
        <SSidebarItem>Sites</SSidebarItem>
        <SSidebarItem>Users</SSidebarItem>
    </SSidebarItemGroup>

    <SSidebarItemGroup :icon="LockClosedIcon">
        <template #title>Security</template>

        <SSidebarItem>Roles</SSidebarItem>
        <SSidebarItem>Permissions</SSidebarItem>
        <SSidebarItem>Logs</SSidebarItem>
    </SSidebarItemGroup>
</SSidebar>

<!-- Example of view -->
<main class="p-4 flex-1 bg-primary-50 text-primary-700 font-bold border-4 border-dashed border-primary-700">
    <h1>{{ value }}</h1>

    <button @click="value = 'Logs'" class="bg-primary-700 text-white px-4 py-1 rounded shadow mt-4 mr-4">Go to Logs</button>
    <button @click="value = 'Dashboard'" class="bg-primary-700 text-white px-4 py-1 rounded shadow mt-4">Back to Dashboard</button>
</main>`,
});
