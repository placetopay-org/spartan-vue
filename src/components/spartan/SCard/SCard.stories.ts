import SCard from './SCard.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: SCard,
    title: 'new/Card',
    parameters: {
        docs: {
            description: {
                component:
                    'A card is a flexible and extensible content container. It includes options for headers and footers, and powerful display options.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the card.',
        },
        header: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the card header.',
        },
        footer: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the card footer.',
        },

        // Props
        href: {
            control: 'text',
            description: 'The type of the input element.',
            table: { type: { summary: 'string' } },
        },
        size: {
            control: 'inline-radio',
            options: ['sm', 'md'],
            description: 'The size of the card. Inlfuences the padding and the rounded corners.',
            table: { type: { summary: 'sm | md' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SCard },
    template: `<SCard v-bind="args">
    <template v-if="args.header" #header>
        {{ args.header }}
    </template>

    {{args.default}}

    <template v-if="args.footer" #footer>
        {{ args.footer }}
    </template>
    </SCard>`,
    transform: (args) => `<SCard ${sourceBinding(args)}>${args.default}</SCard>`,
    args: {
        default: 'Card content',
        header: '',
        footer: 'footer',
        href: '',
        size: 'md',
    },
});

export const AccentParts = createVariation({
    components: { SCard },
    containerClass: 'flex flex-wrap gap-4',
    template: `<SCard footer-accent size='sm'>
    <p class="w-60">This is a free plan. It has limited features.</p>
    
    <template #footer>
        <span class="text-gray-500 italic">Promotion valid until 31/12/2023</span>
    </template>
    </SCard>
    
    <SCard header-accent size='sm'>
    <template #header>
        <span class="text-gray-500 font-semibold">💰 Free Plan</span>
    </template>

    <p class="w-60">This is a free plan. It has limited features.</p>
    </SCard>

    <SCard size='sm'>
    <template #header>
        <span class="text-gray-500 font-semibold">💰 Free Plan</span>
    </template>

    <p class="w-60">This is a free plan. It has limited features.</p>

    <template #footer>
        <span class="text-gray-500 italic">Promotion valid until 31/12/2023</span>
    </template>
    </SCard>

    <SCard body-accent size='sm'>
    <template #header>
        <span class="text-gray-500 font-semibold">💰 Free Plan</span>
    </template>

    <p class="w-60">This is a free plan. It has limited features.</p>
    </SCard>

    <SCard body-accent size='sm'>
    <template #header>
        <span class="text-gray-500 font-semibold">💰 Free Plan</span>
    </template>

    <p class="w-60">This is a free plan. It has limited features.</p>

    <template #footer>
        <span class="text-gray-500 italic">Promotion valid until 31/12/2023</span>
    </template>
    </SCard>

    <SCard header-accent footer-accent size='sm'>
    <template #header>
        <span class="text-gray-500 font-semibold">💰 Free Plan</span>
    </template>

    <p class="w-60">This is a free plan. It has limited features.</p>

    <template #footer>
        <span class="text-gray-500 italic">Promotion valid until 31/12/2023</span>
    </template>
    </SCard>
    `,
});
