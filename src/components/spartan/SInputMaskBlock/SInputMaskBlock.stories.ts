import SInputMaskBlock from './SInputMaskBlock.vue';
import { ref } from 'vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: SInputMaskBlock,
    title: 'inputBlocks/InputMaskBlock',
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
    components: { SInputMaskBlock },
    setup: () => {
        const value = ref(0);

        return { value };
    },
    template: '<SInputMaskBlock v-bind="args" v-model="value" />',
    transform: (args) => ` <SInputMaskBlock ${sourceBinding(args)} /> `,
    args: {
        label: 'Custom label',
        errorText: '',
        helpText: '',
        mask: '0.0.0',
    },
});

export const Base = createVariation({
    components: { SInputMaskBlock },
    setup: () => {
        const value = ref(0);

        return { value };
    },
    template: '<SInputMaskBlock v-model="value" mask="0.0.0" label="Custom label" />',
});

export const ErrorText = createVariation({
    components: { SInputMaskBlock },
    setup: () => {
        const value = ref(0);

        return { value };
    },
    template: '<SInputMaskBlock v-model="value" mask="0.0.0" label="Custom label" errorText="Error message" />',
});

export const HelpText = createVariation({
    components: { SInputMaskBlock },
    setup: () => {
        const value = ref(0);

        return { value };
    },
    template: '<SInputMaskBlock v-model="value" mask="0.0.0" label="Custom label" helpText="Help message" />',
});
