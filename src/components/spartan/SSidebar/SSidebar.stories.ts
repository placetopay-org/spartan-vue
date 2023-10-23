import SSidebar from './SSidebar.vue';
import SSidebarItem from './SSidebarItem.vue';
import SSidebarItemGroup from './SSidebarItemGroup.vue';
import { SModalLeft } from '../SModalLeft';
import { SPlacetopayLogo } from '../SPlacetopayLogo';
import { SAccordion } from '../SAccordion';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';
import { HomeIcon, PaperAirplaneIcon, KeyIcon, LockClosedIcon, CommandLineIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import { Bars4Icon } from '@heroicons/vue/24/solid';

export default {
    component: SSidebar,
    title: 'new/Sidebar',
    parameters: {
        docs: {
            description: {
                component: 'A sidebar component that can be used to navigate through the application.',
            },
        },
    },
    argTypes: {
        // Events
        'update:modelValue': {
            control: { type: null },
            description: 'When the sidebar changes the current path.',
            table: { type: { summary: 'string' } },
        },

        // Slots
        default: {
            control: { type: null },
            table: { type: { summary: 'VNode | VNode Array' }, category: 'Slots' },
            description: 'Slot for the sidebar items.',
        },
        header: {
            control: { type: null },
            table: { type: { summary: 'VNode | VNode Array' }, category: 'Slots' },
            description: 'Slot for the sidebar header.',
        },
        footer: {
            control: { type: null },
            table: { type: { summary: 'VNode | VNode Array' }, category: 'Slots' },
            description: 'Slot for the sidebar footer.',
        },

        // Props
        class: {
            control: { type: null },
            description: 'The style class of the sidebar.',
            table: { type: { summary: 'string' } },
        },
        modelValue: {
            control: 'text',
            description: 'The current path of the sidebar.',
            table: { type: { summary: 'string' } },
        },
        placetopayHeader: {
            description: 'If the header of the sidebar is the placetopay logo.',
            table: { type: { summary: 'boolean' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SSidebar, SSidebarItem, SSidebarItemGroup, SPlacetopayLogo },
    containerClass: 'flex justify-center py-5 h-[500px] w-[900px] bg-gray-100',
    setup: () => {
        return { HomeIcon, PaperAirplaneIcon, KeyIcon, LockClosedIcon, CommandLineIcon };
    },
    template: `<SSidebar class="w-60 pb-8" v-bind="args" v-model="args.modelValue">
    <SSidebarItem :icon="HomeIcon">Dashboard</SSidebarItem>
    <SSidebarItem :icon="PaperAirplaneIcon">Transactions</SSidebarItem>
    <SSidebarItem :icon="CommandLineIcon">System</SSidebarItem>

    <SSidebarItemGroup :icon="KeyIcon" verticalAccordion="h-[108px]">
        <template #title>Administration</template>

        <SSidebarItem>Merchants</SSidebarItem>
        <SSidebarItem>Sites</SSidebarItem>
        <SSidebarItem>Users</SSidebarItem>
    </SSidebarItemGroup>

    <SSidebarItemGroup :icon="LockClosedIcon" verticalAccordion="h-[108px]">
        <template #title>Security</template>

        <SSidebarItem>Roles</SSidebarItem>
        <SSidebarItem>Permissions</SSidebarItem>
        <SSidebarItem>Logs</SSidebarItem>
    </SSidebarItemGroup>
</SSidebar>`,
    transform: (args) => `<SSidebar ${sourceBinding(args)}>${args.default}</SSidebar>`,
    args: {
        modelValue: 'Dashboard',
        placetopayHeader: true,
    },
});

export const Base = createVariation({
    components: { SSidebar, SSidebarItem, SSidebarItemGroup, SPlacetopayLogo },
    setup: () => {
        const value = ref('Administration/Merchants');
        return { value, HomeIcon, PaperAirplaneIcon, KeyIcon, LockClosedIcon, CommandLineIcon };
    },
    containerClass: 'flex gap-5 h-[550px]',
    template: `<SSidebar class="w-60 pb-8" placetopayHeader v-model="value">
    <SSidebarItem :icon="HomeIcon">Dashboard</SSidebarItem>
    <SSidebarItem :icon="PaperAirplaneIcon">Transactions</SSidebarItem>
    <SSidebarItem :icon="CommandLineIcon">System</SSidebarItem>

    <SSidebarItemGroup :icon="KeyIcon" verticalAccordion="h-[108px]">
        <template #title>Administration</template>

        <SSidebarItem>Merchants</SSidebarItem>
        <SSidebarItem>Sites</SSidebarItem>
        <SSidebarItem>Users</SSidebarItem>
    </SSidebarItemGroup>

    <SSidebarItemGroup :icon="LockClosedIcon" verticalAccordion="h-[108px]">
        <template #title>Security</template>

        <SSidebarItem>Roles</SSidebarItem>
        <SSidebarItem>Permissions</SSidebarItem>
        <SSidebarItem>Logs</SSidebarItem>
    </SSidebarItemGroup>
</SSidebar>

<!-- Example of view -->
<main class="p-4 flex-1 bg-primary-50 text-primary-700 font-bold border-4 border-dashed border-primary-700">
    <h1>{{ value }}</h1>

    <button @click="value = 'Security/Logs'" class="bg-primary-700 text-white px-4 py-1 rounded shadow mt-4 mr-4">Go to Logs</button>
    <button @click="value = 'Dashboard'" class="bg-primary-700 text-white px-4 py-1 rounded shadow mt-4">Back to Dashboard</button>
</main>`,
});

export const AccordionWrapper = createVariation({
    components: { SSidebar, SSidebarItem, SSidebarItemGroup, SPlacetopayLogo, SAccordion, Bars4Icon },
    setup: () => {
        const value = ref('Administration/Merchants');
        const open = ref(false);
        return { value, open, HomeIcon, PaperAirplaneIcon, KeyIcon, LockClosedIcon, CommandLineIcon };
    },
    containerClass: 'flex h-[550px]',
    template: `<SAccordion class="w-60" :open="open">
    <SSidebar class="w-60 pb-8" placetopayHeader v-model="value">
        <SSidebarItem :icon="HomeIcon">Dashboard</SSidebarItem>
        <SSidebarItem :icon="PaperAirplaneIcon">Transactions</SSidebarItem>
        <SSidebarItem :icon="CommandLineIcon">System</SSidebarItem>

        <SSidebarItemGroup :icon="KeyIcon" verticalAccordion="h-[108px]">
            <template #title>Administration</template>

            <SSidebarItem>Merchants</SSidebarItem>
            <SSidebarItem>Sites</SSidebarItem>
            <SSidebarItem>Users</SSidebarItem>
        </SSidebarItemGroup>

        <SSidebarItemGroup :icon="LockClosedIcon" verticalAccordion="h-[108px]">
            <template #title>Security</template>

            <SSidebarItem>Roles</SSidebarItem>
            <SSidebarItem>Permissions</SSidebarItem>
            <SSidebarItem>Logs</SSidebarItem>
        </SSidebarItemGroup>
    </SSidebar>
</SAccordion>

<!-- Example of view -->
<main class="p-4 flex-1 flex items-start gap-4 bg-primary-50 text-primary-700 font-bold border-4 border-dashed border-primary-700">
    <button @click="open = !open"><Bars4Icon class="h-7 w-7"/></button>
    <h1>{{ value }}</h1>
</main>`,
});

export const ModalLeftWrapper = createVariation({
    components: { SSidebar, SSidebarItem, SSidebarItemGroup, SPlacetopayLogo, SModalLeft, Bars4Icon },
    setup: () => {
        const value = ref('Administration/Merchants');
        const state = ref(false);
        return { value, state, HomeIcon, PaperAirplaneIcon, KeyIcon, LockClosedIcon, CommandLineIcon };
    },
    template: `<SModalLeft :open="state" @close="() => state = false">
    <SSidebar class="w-60 pb-8" placetopayHeader v-model="value">
        <SSidebarItem :icon="HomeIcon">Dashboard</SSidebarItem>
        <SSidebarItem :icon="PaperAirplaneIcon">Transactions</SSidebarItem>
        <SSidebarItem :icon="CommandLineIcon">System</SSidebarItem>

        <SSidebarItemGroup :icon="KeyIcon" verticalAccordion="h-[108px]">
            <template #title>Administration</template>

            <SSidebarItem>Merchants</SSidebarItem>
            <SSidebarItem>Sites</SSidebarItem>
            <SSidebarItem>Users</SSidebarItem>
        </SSidebarItemGroup>

        <SSidebarItemGroup :icon="LockClosedIcon" verticalAccordion="h-[108px]">
            <template #title>Security</template>

            <SSidebarItem>Roles</SSidebarItem>
            <SSidebarItem>Permissions</SSidebarItem>
            <SSidebarItem>Logs</SSidebarItem>
        </SSidebarItemGroup>
    </SSidebar>
</SModalLeft>

<!-- Example of view -->
<main class="p-4 flex items-start gap-4 bg-primary-50 text-primary-700 font-bold border-4 border-dashed border-primary-700">
    <button @click="() => state = true"><Bars4Icon class="h-7 w-7"/></button>
    <h1>{{ value }}</h1>
</main>`,
});
