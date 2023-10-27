import SBreadcrumbs from './SBreadcrumbs.vue';
import SBreadcrumbsItem from './SBreadcrumbsItem.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';
import { HomeIcon, Cog8ToothIcon, BanknotesIcon } from '@heroicons/vue/24/solid';

export default {
    component: SBreadcrumbs,
    title: 'new/Breadcrumbs',
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
        target: {
            control: 'select',
            options: ['_blank', '_parent', '_self', '_top'],
            description: 'The target attribute specifies where to open the linked document.',
            table: { type: { summary: '_blank | _parent | _self | _top' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SBreadcrumbs, SBreadcrumbsItem },
    setup: () => ({ HomeIcon }),
    template: `<SBreadcrumbs v-bind="args">
    <SBreadcrumbsItem :icon="HomeIcon" href="#" first>Projects</SBreadcrumbsItem>
    <SBreadcrumbsItem href="#">Core</SBreadcrumbsItem>
    <SBreadcrumbsItem active>Checkout</SBreadcrumbsItem>  
</SBreadcrumbs>`,
    transform: (args) => `<SBreadcrumbs ${sourceBinding(args)}>${args.default}</SBreadcrumbs>`,
    args: {
        default: 'Link',
        href: '',
        target: undefined,
    },
});

export const Base = createVariation({
    components: { SBreadcrumbs, SBreadcrumbsItem },
    template: `<SBreadcrumbs v-bind="args">
    <SBreadcrumbsItem href="#" first>Projects</SBreadcrumbsItem>
    <SBreadcrumbsItem href="#">Core</SBreadcrumbsItem>
    <SBreadcrumbsItem href="#" active>Checkout</SBreadcrumbsItem>  
</SBreadcrumbs>`,
});

export const WithIcons = createVariation({
    components: { SBreadcrumbs, SBreadcrumbsItem },
    setup: () => ({ HomeIcon, Cog8ToothIcon, BanknotesIcon }),
    containerClass: 'flex flex-col gap-8',
    template: `<SBreadcrumbs v-bind="args">
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
