import STab from './STab.vue';
import STabItem from './STabItem.vue';
import { SDropdown, SDropdownItem } from '../SDropdown';
import { buildSourceBinding, createDefault, createVariation, createHistory } from '@/helpers';
import { BuildingOfficeIcon, CreditCardIcon, UserIcon, UsersIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import STabDropdownItem from './STabDropdownItem.vue';

export default {
    component: STab,
    title: 'navigation/Tab',
    ...createHistory({
        description: 'The tab component is used to navigate between pages.',
        slots: [
            {
                name: 'default',
                description: 'The content of the tab container.',
            },
        ],
        props: [
            {
                name: 'modelValue',
                description: 'The value of the tab container (variant).',
                type: 'underline | pills | vetches',
                default: 'undefined',
                control: null,
            },
            {
                name: 'full',
                description: 'The full width mode of the tab container.',
                type: 'boolean',
                default: 'false',
            },
            {
                name: 'variant',
                description: 'The variant of the tab container.',
                options: ['underline', 'pills', 'vetches'],
                type: 'underline | pills | vetches',
                default: 'underline',
            },
            {
                name: 'path',
                description: 'The path of the tab item.',
                type: 'innerText',
                default: 'undefined',
                subcategory: 'STabItem',
            },
            {
                name: 'as',
                description: 'The element type of the tab item.',
                type: 'string',
                default: 'button',
                subcategory: 'STabItem',
            },
            {
                name: 'icon',
                description: 'The icon of the tab item.',
                type: 'FunctionalComponent',
                default: 'undefined',
                subcategory: 'STabItem',
            },
        ],
        events: [
            {
                name: 'update:modelValue',
                description: 'The event emitted when the tab container value changes.',
                type: 'underline | pills | vetches',
            },
        ],
    }),
};

const tabs = [
    { name: 'My Account', href: '#', icon: UserIcon },
    { name: 'Company', href: '#', icon: BuildingOfficeIcon },
    { name: 'Team Members', href: '#', icon: UsersIcon },
    { name: 'Billing', href: '#', icon: CreditCardIcon },
];

const sourceBinding = buildSourceBinding({
    prop: { variant: 'underline' },
    check: ['full'],
});

export const Default = createDefault({
    components: { STab, STabItem },
    containerClass: 'w-[400px]',
    args: {
        variant: 'underline',
        full: false,
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

export const Full = createVariation({
    components: { STab, STabItem },
    containerClass: 'bg-white -m-4 p-8',
    setup: () => {
        const value = ref('Tab 1');

        return { value };
    },
    template: `<STab v-model="value" full>
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

export const WithDropdown = createVariation({
    components: { STab, STabItem, SDropdown, STabDropdownItem },
    containerClass: 'bg-white -m-4 p-8 h-[300px]',
    setup: () => {
        const value = ref('tab3/item1');

        return { value };
    },
    template: `<STab v-model="value">
    <STabItem>Tab 1</STabItem>
    <STabItem>Tab 2</STabItem>
    <STabItem dropdown>
        Tab 3
        
        <template #items>
            <STabDropdownItem path="tab3/item1">Item 1</STabDropdownItem>
            <STabDropdownItem path="tab3/item2">Item 2</STabDropdownItem>
            <STabDropdownItem path="tab3/item3">Item 3</STabDropdownItem>
        </template>
    </STabItem>  
</STab>

<pre>{{value}}</pre>`,
});
