import { ref } from 'vue';
import SInputIncrement from './SInputIncrement.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: SInputIncrement,
    title: 'new/InputIncrement',
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
        modelValue: {
            control: { type: null },
            description: 'The value of the input.',
            table: { type: { summary: 'Ref<string>' } },
        },
        disabled: {
            control: 'boolean',
            description: 'When true, disables user interaction.',
            table: { type: { summary: 'boolean' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SInputIncrement },
    setup: () => {
        const value = ref(0);

        return { value }
    },
    template: `<SInputIncrement v-model="value" v-bind="args">{{args.default}}</SInputIncrement>`,
    transform: (args) => `<SInputIncrement ${sourceBinding(args)}>${args.default}</SInputIncrement>`,
    args: {
        disabled: false,
    },
});

export const Base = createVariation({
    components: { SInputIncrement },
    template: '<SInputIncrement v-model="value" />',
})

export const Disabled = createVariation({
    components: { SInputIncrement },
    template: '<SInputIncrement v-model="value" disabled />',
})
