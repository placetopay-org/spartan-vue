import STab from './STab.vue';
import STabItem from './STabItem.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';
import { BuildingOfficeIcon, CreditCardIcon, UserIcon, UsersIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';

export default {
    component: STab,
    title: 'navigation/Tab',
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
            control: { type: null },
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the tab container.',
        },

        // Props
        variant: {
            control: 'select',
            options: ['underline', 'pills', 'vetches'],
            table: { type: { summary: 'underline | pills | vetches' }, category: 'Props' },
            description: 'The variant of the tab container.',
        },
    },
};

const tabs = [
    { name: 'My Account', href: '#', icon: UserIcon },
    { name: 'Company', href: '#', icon: BuildingOfficeIcon },
    { name: 'Team Members', href: '#', icon: UsersIcon },
    { name: 'Billing', href: '#', icon: CreditCardIcon },
];

const sourceBinding = buildSourceBinding({
    prop: { variant: 'underline' },
});

export const Default = createDefault({
    components: { STab, STabItem },
    args: {
        variant: 'underline',
    },
    setup: () => {
        const value = ref('Tab 1');

        return { value };
    },
    template: `<STab v-model="value" v-bind="args">
    <STabItem>Tab 1</STabItem>
    <STabItem>Tab 2</STabItem>
    <STabItem>Tab 3</STabItem>
</STab>`,
    transform: (args) => `<STab v-model="value" ${sourceBinding(args)}>
    <STabItem>Tab 1</STabItem>
    <STabItem>Tab 2</STabItem>
    <STabItem>Tab 3</STabItem>  
</STab>`,
});

export const Base = createVariation({
    components: { STab, STabItem },
    containerClass: 'bg-white -m-4 p-8',
    setup: () => {
        const value = ref('Tab 1');

        return { value };
    },
    template: `<STab v-model="value">
    <STabItem>Tab 1</STabItem>
    <STabItem>Tab 2</STabItem>
    <STabItem>Tab 3</STabItem>  
</STab>`,
});

export const WithIcons = createVariation({
    components: { STab, STabItem },
    containerClass: 'bg-white -m-4 p-8',
    setup: () => {
        const value = ref('Company');

        return { value, BuildingOfficeIcon, CreditCardIcon, UserIcon, UsersIcon };
    },
    template: `<STab v-model="value">
    <STabItem :icon="UserIcon">My Account</STabItem> 
    <STabItem :icon="BuildingOfficeIcon">Company</STabItem>
    <STabItem :icon="UsersIcon">Team Members</STabItem>
    <STabItem :icon="CreditCardIcon">Billing</STabItem>
</STab>`,
});

export const UsingPaths = createVariation({
    components: { STab, STabItem },
    containerClass: 'bg-white -m-4 p-8',
    setup: () => {
        const value = ref('third');

        return { value, BuildingOfficeIcon, CreditCardIcon, UserIcon, UsersIcon };
    },
    template: `<!-- value: "third" instead of "Team Members" -->
<STab v-model="value">
    <STabItem path="first" :icon="UserIcon">My Account</STabItem> 
    <STabItem path="second" :icon="BuildingOfficeIcon">Company</STabItem>
    <STabItem path="third" :icon="UsersIcon">Team Members</STabItem>
    <STabItem path="fourth" :icon="CreditCardIcon">Billing</STabItem>
</STab>`,
});

export const PillsVariant = createVariation({
    components: { STab, STabItem },
    containerClass: 'bg-white -m-4 p-8',
    setup: () => {
        const value = ref('Billing');

        return { value, BuildingOfficeIcon, CreditCardIcon, UserIcon, UsersIcon };
    },
    template: `<STab v-model="value" variant="pills">
    <STabItem :icon="UserIcon">My Account</STabItem> 
    <STabItem :icon="BuildingOfficeIcon">Company</STabItem>
    <STabItem :icon="UsersIcon">Team Members</STabItem>
    <STabItem :icon="CreditCardIcon">Billing</STabItem>
</STab>`,
});

export const VetchesVariant = createVariation({
    components: { STab, STabItem },
    containerClass: 'bg-white -m-4 p-8',
    setup: () => {
        const value = ref('Billing');

        return { value, BuildingOfficeIcon, CreditCardIcon, UserIcon, UsersIcon };
    },
    template: `<STab v-model="value" variant="vetches">
    <STabItem :icon="UserIcon">My Account</STabItem> 
    <STabItem :icon="BuildingOfficeIcon">Company</STabItem>
    <STabItem :icon="UsersIcon">Team Members</STabItem>
    <STabItem :icon="CreditCardIcon">Billing</STabItem>
</STab>`,
});
