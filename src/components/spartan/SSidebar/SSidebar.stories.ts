import SSidebar from './SSidebar.vue';
import SSidebarItem from './SSidebarItem.vue';
import SSidebarItemGroup from './SSidebarItemGroup.vue';
import { SPlacetopayLogo } from '../SPlacetopayLogo';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';
import { HomeIcon, PaperAirplaneIcon, KeyIcon, LockClosedIcon, CommandLineIcon } from '@heroicons/vue/24/outline';

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
    template: `<SSidebar v-bind="args">
    <SSidebarItem>Sidebar Item</SSidebarItem>
    <SSidebarItemGroup>
        <template #title>Sub grops</template>

        <SSidebarItem>Item 1</SSidebarItem>
        <SSidebarItem>Item 2</SSidebarItem>
    </SSidebarItemGroup>

    <template #footer>
        Footer!
    </template>
</SSidebar>`,
    transform: (args) => `<SSidebar ${sourceBinding(args)}>${args.default}</SSidebar>`,
    args: {
        placetopayHeader: true,
    },
});

export const Base = createVariation({
    components: { SSidebar, SSidebarItem, SSidebarItemGroup, SPlacetopayLogo },
    setup: () => {
        return { HomeIcon, PaperAirplaneIcon, KeyIcon, LockClosedIcon, CommandLineIcon };
    },
    template: `<SSidebar placetopayHeader>
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
</SSidebar>`,
});
