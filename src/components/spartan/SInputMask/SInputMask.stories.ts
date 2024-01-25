import { ref } from 'vue';
import SInputMask from './SInputMask.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: SInputMask,
    title: 'new/InputMask',
    parameters: {
        docs: {
            description: {
                component: 'A masked input component useful for currency, phone numbers, dates, etc.',
            },
        },
    },
    argTypes: {
        // Props
        mask: {
            control: 'text',
            description: 'The mask to be applied to the input.',
            table: { type: { summary: 'string' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SInputMask },
    setup: () => {
        const value = ref();

        return { value };
    },
    template: `<SInputMask v-bind="args" v-model="value" />`,
    transform: (args) => `<SInputMask ${sourceBinding(args)}>${args.default}</SInputMask>`,
    args: {
        mask: '000',
    },
});

export const ImaskjsSupport = createVariation({
    components: { SInputMask },
    setup: () => {
        const value = ref(92);

        return { value };
    },
    template: `<!-- https://imask.js.org/ -->
<SInputMask 
    v-model="value" 
    :mask="[{
        mask: Number,
        min: 0,
        max: 100
    }]" 
/>`,
});

export const SpartanInputSupport = createVariation({
    components: { SInputMask },
    setup: () => {
        const value = ref(29000);

        return { value };
    },
    template: `<SInputMask mask="00.000" prefix="$" v-model="value" />`,
});


