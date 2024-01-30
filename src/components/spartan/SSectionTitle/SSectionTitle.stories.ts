import SSectionTitle from './SSectionTitle.vue';
import { buildSourceBinding, createDefault } from '@/helpers';

export default {
    component: SSectionTitle,
    title: 'display/SectionTitle',
    parameters: {
        docs: {
            description: {
                component: 'The section title component is used to display a title in a section.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the title.',
        },

        // Props
        as: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            description: 'The tag used for the title.',
            table: { type: { summary: 'string' } },
        },
    },
};

const sourceBinding = buildSourceBinding({
    prop: { as: 'h3' },
});

export const Default = createDefault({
    components: { SSectionTitle },
    template: `<SSectionTitle v-bind="argsWithoutSlots">{{args.default}}</SSectionTitle>`,
    transform: (args) => `<SSectionTitle ${sourceBinding(args)}>${args.default}</SSectionTitle>`,
    args: {
        as: 'h3',
        default: 'Site manager',
    },
});
