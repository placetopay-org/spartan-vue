import SInputDate from './SInputDate.vue';
import { buildSourceBinding, createDefault, createHistory } from '@/helpers';
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
                control: null
            }
        ],
        events: [
            {
                name: 'update:modelValue',
                description: 'Emitted when the value of the input changes.',
                type: 'string | null'
            }
        ]
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
    template: `<SInputDate v-model="value" v-bind="args">{{args.default}}</SInputDate>`,
    transform: (args) => `<SInputDate ${sourceBinding(args)}>${args.default}</SInputDate>`,
    args: {},
});
