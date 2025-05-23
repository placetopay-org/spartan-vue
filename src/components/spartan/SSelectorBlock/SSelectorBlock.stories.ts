import SSelectorBlock from './SSelectorBlock.vue';
import { buildSourceBinding, createDefault } from '@/helpers';

export default {
    component: SSelectorBlock,
    title: 'inputBlocks/SelectorBlock',
    parameters: {
        docs: {
            description: { component: 'The select component is used to create a dropdown list of options.' },
        },
    },
    argTypes: {
        // Events
        'update:modelValue': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'The event emitted when the select value changes.',
        },

        // Slots
        default: {
            control: { type: null },
            description: 'The content to be rendered inside the select.',
            table: { type: { summary: 'VNode | VNode Array' } },
        },

        // Props
        errorText: {
            control: 'text',
            description: 'The error message to be displayed when the select has an error.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
        helpText: {
            control: 'text',
            description: 'The help message to be displayed below the select.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
        label: {
            control: 'text',
            description: 'The label of the select.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },

        // Props - Select
        disabled: {
            description: 'Whether the select is disabled.',
            table: { type: { summary: 'boolean' }, category: 'Props', subcategory: 'Select' },
        },
        error: {
            control: { type: 'boolean' },
            description: 'Whether the select has an error.',
            table: { type: { summary: 'boolean' }, category: 'Props', subcategory: 'Select' },
        },
        id: {
            control: { type: 'text' },
            description: 'The id of the select.',
            table: { type: { summary: 'string' }, category: 'Props', subcategory: 'Select' },
        },
        modelValue: {
            control: { type: null },
            description: 'The value of the select.',
            table: { type: { summary: 'Ref<string>' }, category: 'Props', subcategory: 'Select' },
        },
        name: {
            control: { type: 'text' },
            description: 'The name of the select.',
            table: { type: { summary: 'string' }, category: 'Props', subcategory: 'Select' },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'The placeholder of the select.',
            table: { type: { summary: 'string' }, category: 'Props', subcategory: 'Select' },
        },
        rounded: {
            control: 'inline-radio',
            options: ['left', 'right', 'both', 'none'],
            description: `Specifies which corners should be rounded.`,
            table: { type: { summary: 'left | right | both | none | full' }, category: 'Props', subcategory: 'Select' },
        },
    },
};

const sourceBinding = buildSourceBinding({
    check: ['disabled', 'error'],
    prop: {
        rounded: 'both',
        id: undefined,
        modelValue: undefined,
        placeholder: undefined,
        name: undefined,
        label: undefined,
        errorText: undefined,
        helpText: undefined,
    },
});

export const Default = createDefault({
    design: 'https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=184-3842',
    components: { SSelectorBlock },
    template: `
    <SSelectorBlock v-bind="args" v-model="args.modelValue" />
    `,
    transform: (args) => `<SSelectorBlock ${sourceBinding(args)} />`,
    args: {
        disabled: false,
        error: undefined,
        id: 'test-id',
        modelValue: undefined,
        name: 'test-name',
        placeholder: 'Select an option',
        rounded: 'both',
        label: 'Payment method',
        errorText: '',
        helpText: '',
        class: 'w-80',
        optionLabel: 'name',
        options: [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' },
        ],
    },
});
