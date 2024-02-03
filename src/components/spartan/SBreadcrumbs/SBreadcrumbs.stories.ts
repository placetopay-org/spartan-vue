import SBreadcrumbs from './SBreadcrumbs.vue';
import SBreadcrumbsItem from './SBreadcrumbsItem.vue';
import { buildSourceBinding, createDefault, createVariation, createHistory } from '@/helpers';
import { HomeIcon, Cog8ToothIcon, BanknotesIcon } from '@heroicons/vue/24/solid';

export default {
    component: SBreadcrumbs,
    title: 'navigation/Breadcrumbs',
    ...createHistory({
        description: 'The breadcrumbs component is used to indicate the current page location within a navigational hierarchy.',
        slots: [
            {
                name: 'default',
                description: 'Where BreadcrumbsItem components are placed.',
            },
            {
                subcategory: 'SBreadcrumbsItem',
                name: 'default_',
                description: 'The content to display.',
            }
        ],
        props: [
            {
                subcategory: 'SBreadcrumbsItem',
                name: 'first',
                control: null,
                default: 'false',
                description: 'If `true`, the chevron separator will not be displayed.',
                type: 'boolean',
            },
            {
                subcategory: 'SBreadcrumbsItem',
                name: 'href',
                control: null,
                default: '',
                description: 'The URL to link to when the breadcrumb item is clicked.',
                type: 'string',
            },
            {
                subcategory: 'SBreadcrumbsItem',
                name: 'active',
                control: null,
                default: 'false',
                description: 'If `true`, the item will be displayed as the active item.',
                type: 'boolean',
            },
            {
                subcategory: 'SBreadcrumbsItem',
                name: 'icon',
                control: null,
                description: 'The icon to display.',
                type: 'FunctionalComponent',
            },
        ]
    }),
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SBreadcrumbs, SBreadcrumbsItem },
    setup: () => ({ HomeIcon }),
    template: `
<SBreadcrumbs v-bind="args">
    <SBreadcrumbsItem :icon="HomeIcon" href="#" first>Projects</SBreadcrumbsItem>
    <SBreadcrumbsItem href="#">Core</SBreadcrumbsItem>
    <SBreadcrumbsItem active>Checkout</SBreadcrumbsItem>  
</SBreadcrumbs>`,
    transform: (args) => `<SBreadcrumbs ${sourceBinding(args)}>${args.default}</SBreadcrumbs>`,
    args: {},
});

export const Base = createVariation({
    components: { SBreadcrumbs, SBreadcrumbsItem },
    template: `
<SBreadcrumbs v-bind="args">
    <SBreadcrumbsItem href="#" first>Projects</SBreadcrumbsItem>
    <SBreadcrumbsItem href="#">Core</SBreadcrumbsItem>
    <SBreadcrumbsItem href="#" active>Checkout</SBreadcrumbsItem>  
</SBreadcrumbs>`,
});

export const WithIcons = createVariation({
    components: { SBreadcrumbs, SBreadcrumbsItem },
    setup: () => ({ HomeIcon, Cog8ToothIcon, BanknotesIcon }),
    containerClass: 'flex flex-col gap-8',
    template: `
<SBreadcrumbs v-bind="args">
    <SBreadcrumbsItem href="#" first :icon="HomeIcon">Projects</SBreadcrumbsItem>
    <SBreadcrumbsItem href="#" :icon="Cog8ToothIcon">Core</SBreadcrumbsItem>
    <SBreadcrumbsItem href="#" :icon="BanknotesIcon" active>Checkout</SBreadcrumbsItem>  
</SBreadcrumbs>

<SBreadcrumbs v-bind="args">
    <SBreadcrumbsItem href="#" first :icon="HomeIcon" />
    <SBreadcrumbsItem href="#" :icon="Cog8ToothIcon" />
    <SBreadcrumbsItem href="#" :icon="BanknotesIcon" active>Checkout</SBreadcrumbsItem>  
</SBreadcrumbs>

<SBreadcrumbs v-bind="args">
    <SBreadcrumbsItem href="#" first :icon="HomeIcon" />
    <SBreadcrumbsItem href="#">Core</SBreadcrumbsItem>
    <SBreadcrumbsItem href="#" active>Checkout</SBreadcrumbsItem>  
</SBreadcrumbs>

<SBreadcrumbs v-bind="args">
    <SBreadcrumbsItem href="#" first>Projects</SBreadcrumbsItem>
    <SBreadcrumbsItem href="#">Core</SBreadcrumbsItem>
    <SBreadcrumbsItem href="#" :icon="BanknotesIcon" active>Checkout</SBreadcrumbsItem>  
</SBreadcrumbs>`,
});
