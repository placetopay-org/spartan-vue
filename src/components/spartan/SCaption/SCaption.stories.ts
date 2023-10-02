import SCaption from './SCaption.vue';
import { buildSourceBinding, createDefault } from '@/helpers';

export default {
    component: SCaption,
    title: 'new/Caption',
    parameters: {
        docs: {
            description: {
                component: 'The Caption component is used to display a short message below a form field.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: { type: null },
            description: 'The default slot, which allows you to customize the content of the caption.',
            table: { type: { summary: null } },
        },

        // Props
        text: {
            description: 'The text to display in the caption.',
            table: { type: { summary: 'string' } },
        },
        variant: {
            control: 'inline-radio',
            options: ['info', 'error'],
            description: 'Sets the variant of the caption.',
            table: {
                type: { summary: 'info | error' },
            },
        },
    },
};

const sourceBinding = buildSourceBinding({
    prop: {
        variant: 'info',
        text: undefined,
    },
});

export const Default = createDefault({
    design: '',
    components: { SCaption },
    template: `<SCaption v-bind="args" />`,
    args: {
        text: 'The field is required',
        variant: 'info',
    },
    transform: (args) => `<SCaption ${sourceBinding(args)} />`,
});
