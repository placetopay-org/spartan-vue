import SSwitch from './SSwitch.vue';
import type { SourceProps } from '@storybook/blocks';
import { buildDesign, buildSourceBinding } from '@/helpers';

export default {
    component: SSwitch,
    title: 'new/Switch',
    parameters: {
        docs: {
            description: {
                component: '-',
            },
        },
    },
    argTypes: {
        // Events
        'update:modelValue': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: '-',
        },

        // Slots
        default: {
            control: { type: null },
            table: { type: { summary: null }, category: 'Slots' },
            description: '-',
        },

        // Props
        modelValue: {
            control: { type: null },
            table: { type: { summary: 'string' } },
            description: '-',
        },
    },
};

const design = buildDesign('');

const sourceBinding = buildSourceBinding({});

export const Default = {
    render: (args: any) => ({
        components: { SSwitch },
        setup() {
            return { args };
        },
        template: `<SSwitch v-bind="args" v-model="args.modelValue"/>`,
    }),
    parameters: {
        design,
        docs: {
            canvas: { layout: 'centered' },
            source: {
                transform: ((_, storyContext) => `
        <SSwitch ${sourceBinding(storyContext.args)} />
        `) as SourceProps['transform'],
                type: 'dynamic',
                language: 'html',
            },
        },
    },
    args: {
        modelValue: true,
    },
};
