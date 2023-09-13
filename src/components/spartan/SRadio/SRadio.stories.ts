import SRadio from './SRadio.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';
import { ref } from 'vue';

export default {
    component: SRadio,
    title: 'new/Radio',
    parameters: {
        docs: {
            description: {
                component: 'Radio component for forms.',
            },
        },
    },
    argTypes: {
        // Events
        'update:modelValue': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'The event emitted when the radio is checked.',
        },

        // Props
        disabled: {
            control: 'boolean',
            description: 'Whether the radio is disabled.',
            table: { type: { summary: 'boolean' } },
        },
        id: {
            control: 'string',
            description: 'The id of the radio.',
            table: { type: { summary: 'string' } },
        },
        modelValue: {
            control: { type: null },
            description: 'Whether the radio is checked.',
            table: { type: { summary: 'Ref<boolean>' } },
        },
        name: {
            control: 'string',
            description: 'The name of the radio.',
            table: { type: { summary: 'string' } },
        },
    },
};

const sourceBinding = buildSourceBinding({
    check: ['disabled'],
    prop: { id: undefined, name: undefined },
});

export const Default = createDefault({
    components: { SRadio },
    transform: (args) => `<SRadio ${sourceBinding(args)} />`,
    template: '<SRadio v-bind="argsWithoutSlots" />',
    args: {
        disabled: false,
        id: 'test-id',
        name: 'test-name',
    },
});

export const Example = createVariation({
    components: { SRadio },
    setup: () => {
        const value = ref('male');

        return { value };
    },
    template: `<div>
  <h1>Selection: {{ value }}</h1>
  <div><SRadio v-model="value" value="male" /> <span>Male</span></div>
  <div><SRadio v-model="value" value="female" /> <span>Female</span></div>
  <div><SRadio v-model="value" value="other" /> <span>Other</span></div>
</div>`,
});
