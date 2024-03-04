import STextAreaBlock from './STextAreaBlock.vue';
import { ref } from 'vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: STextAreaBlock,
    title: 'inputBlocks/TextAreaBlock',
    parameters: {
        docs: {
            description: {
                component: 'A input with increment and decrement buttons.',
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
    design: 'https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4820%3A18077&mode=dev',
    components: { STextAreaBlock },
    setup: () => {
        const value = ref(0);

        return { value };
    },
    template: '<STextAreaBlock v-bind="args" v-model="value" />',
    transform: (args) => ` <STextAreaBlock ${sourceBinding(args)} /> `,
    args: {
        label: 'Custom label',
        errorText: '',
        helpText: '',
    },
});

export const Base = createVariation({
    components: { STextAreaBlock },
    setup: () => {
        const value = ref(0);

        return { value };
    },
    template: '<STextAreaBlock v-model="value" label="Custom label" />',
});

export const ErrorText = createVariation({
    components: { STextAreaBlock },
    setup: () => {
        const value = ref(0);

        return { value };
    },
    template: '<STextAreaBlock v-model="value" label="Custom label" errorText="Error message" />',
});

export const HelpText = createVariation({
    components: { STextAreaBlock },
    setup: () => {
        const value = ref(0);

        return { value };
    },
    template: '<STextAreaBlock v-model="value" label="Custom label" helpText="Help message" />',
});
