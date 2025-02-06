import SInputPasswordBlock from './SInputPasswordBlock.vue';
import { ref } from 'vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: SInputPasswordBlock,
    title: 'inputBlocks/InputPasswordBlock',
    parameters: {
        docs: {
            description: {
                component: 'The input date component wrapped in a form block.',
            },
        },
    },
    argTypes: {
        // Events
        'update:modelValue': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'The event emitted when the input value changes.',
        },

        // Props
        errorText: {
            control: 'text',
            description: 'The error message to be displayed when the input has an error.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
        helpText: {
            control: 'text',
            description: 'The help message to be displayed below the input.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
        label: {
            control: 'text',
            description: 'The label of the input.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
    },
};

const sourceBinding = buildSourceBinding({
    prop: {
        label: undefined,
        errorText: undefined,
        helpText: undefined,
    },
});

export const Default = createDefault({
    design: '',
    components: { SInputPasswordBlock },
    containerClass: 'h-[500px]',
    setup: () => {
        const value = ref(0);

        return { value };
    },
    template: '<SInputPasswordBlock v-bind="args" v-model="value" />',
    transform: (args) => ` <SInputPasswordBlock ${sourceBinding(args)} /> `,
    args: {
        label: 'Custom label',
        errorText: '',
        helpText: '',
    },
});

export const Base = createVariation({
    components: { SInputPasswordBlock },
    setup: () => {
        const value = ref(0);

        return { value };
    },
    template: '<SInputPasswordBlock v-model="value" label="Custom label" />',
});

export const ErrorText = createVariation({
    components: { SInputPasswordBlock },
    setup: () => {
        const value = ref(0);

        return { value };
    },
    template: '<SInputPasswordBlock v-model="value" label="Custom label" errorText="Error message" />',
});

export const HelpText = createVariation({
    components: { SInputPasswordBlock },
    setup: () => {
        const value = ref(0);

        return { value };
    },
    template: '<SInputPasswordBlock v-model="value" label="Custom label" helpText="Help message" />',
});
