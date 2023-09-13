import SLabel from './SLabel.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: SLabel,
    title: 'new/Label',
    parameters: {
        docs: {
            description: {
                component: 'A label for form elements.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: 'text',
            description: 'Default slot for badge content.',
            table: { type: { summary: 'VNode | VNode Array' } },
        },

        // Props
        for: {
            control: 'text',
            description: 'The id of the form element the label is for.',
            table: { type: { summary: 'string' } },
        },
        srOnly: {
            control: 'boolean',
            description: 'Whether the label should be visually hidden.',
            table: { type: { summary: 'boolean' } },
        },
    },
};

const sourceBinding = buildSourceBinding({
    check: ['srOnly'],
    prop: { for: undefined },
});

export const Default = createDefault({
    components: { SLabel },
    template: '<SLabel v-bind="argsWithoutSlots"> {{ args.default }} </SLabel>',
    transform: (args) => `<SLabel ${sourceBinding(args)}> ${args.default} </SLabel>`,
    args: {
        default: 'Label text',
        for: 'test-id',
        srOnly: false,
    },
});

export const Example = createVariation({
    components: { SLabel },
    template: '<SLabel>Label text</SLabel>',
});
