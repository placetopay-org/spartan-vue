import SSectionDescription from './SSectionDescription.vue';
import { buildSourceBinding, createDefault } from '@/helpers';

export default {
    component: SSectionDescription,
    title: 'display/SectionDescription',
    parameters: {
        docs: {
            description: {
                component: 'The section description component is used to display a description in a section.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the description.',
        },

        // Props
        as: {
            control: 'text',
            description: 'The tag used for the description.',
            table: { type: { summary: 'string' } },
        },
    },
};

const sourceBinding = buildSourceBinding({
    prop: { as: 'p' },
});

export const Default = createDefault({
    components: { SSectionDescription },
    template: `<SSectionDescription v-bind="argsWithoutSlots">{{args.default}}</SSectionDescription>`,
    transform: (args) => `<SSectionDescription ${sourceBinding(args)}>${args.default}</SSectionDescription>`,
    args: {
        as: 'p',
        default: 'You have access to all the functionalities of the assigned sites',
    },
});
