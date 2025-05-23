import SInputDate from './SInputDate.vue';
import { buildSourceBinding, createDefault, createHistory, createVariation } from '@/helpers';
import { ref } from 'vue';

export default {
    component: SInputDate,
    title: 'inputs/InputDate',
    ...createHistory({
        description: 'The input date component is used to select a date.',
        props: [
            {
                name: 'modelValue',
                type: 'string | null',
                description: 'The value of the input.',
                default: 'null',
                control: null,
            },
            {
                name: 'hideInputIcon',
                type: 'boolean',
                description: 'Hide the input icon.',
                default: 'false',
            },
            {
                name: 'error',
                type: 'boolean',
                description: 'Show the input as an error.',
                default: 'false',
            },
            {
                name: 'class',
                type: 'string',
                description: 'The class to apply to the input.',
                default: '',
                control: null,
            },
            {
                name: 'placeholder',
                type: 'string',
                description: 'The placeholder to display in the input.',
                default: '',
                control: 'text',
            },
        ],
        events: [
            {
                name: 'update:modelValue',
                description: 'Emitted when the value of the input changes.',
                type: 'string | null',
            },
        ],
    }),
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SInputDate },
    containerClass: 'h-[500px]',
    setup: () => {
        const value = ref(null);
        return { value };
    },
    template: `<SInputDate v-model="value" v-bind="args" model-type="dd-MM-yyyy" /><pre>{{value}}</pre>`,
    transform: (args) => `<SInputDate ${sourceBinding(args)} />`,
    args: {
        hideInputIcon: false,
        error: false,
        placeholder: 'Select a date',
    },
});

export const Base = createVariation({
    components: { SInputDate },
    setup: () => {
        // const value = ref(null);
        const value = ref('29-01-2000 14:30');
        return { value };
    },
    containerClass: 'h-[500px] w-[300px]',
    template: `<SInputDate v-model="value" v-bind="args" model-type="dd-MM-yyyy HH:mm" />
<pre>{{value}}</pre>`,
});
