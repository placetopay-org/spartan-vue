import { ref } from 'vue';
import STextArea from './STextArea.vue';
import { SLabel } from '../SLabel';
import { buildSourceBinding, createDefault, createHistory, createVariation } from '@/helpers';

export default {
    component: STextArea,
    title: 'inputs/TextArea',
    ...createHistory({
        description: 'The text area component is used to collect text from the user.',
        props: [
            {
                name: 'error',
                type: 'boolean',
                default: 'false',
                description: 'If true, the component will be styled as an error.',
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'If true, the component will be disabled.',
            },
            {
                name: 'class',
                type: 'string',
                default: 'undefined',
                description: 'The class to apply to the component.',
                control: null,
            },
        ],
    }),
};

const sourceBinding = buildSourceBinding({
    check: ['error', 'disabled'],
});

export const Default = createDefault({
    components: { STextArea },
    template: `<STextArea v-bind="args" v-model="value" />`,
    transform: (args) => `<STextArea v-model="value" ${sourceBinding(args)} />`,
    args: {
        error: false,
        disabled: false,
    },
});

export const Base = createVariation({
    components: { STextArea },
    containerClass: 'grid grid-cols-2 gap-4',
    template: `<STextArea />`,
});

export const Error = createVariation({
    components: { STextArea },
    containerClass: 'grid grid-cols-2 gap-4',
    template: `<STextArea v-model="value" error />`,
});

export const Disabled = createVariation({
    components: { STextArea },
    containerClass: 'grid grid-cols-2 gap-4',
    template: `<STextArea v-model="value" disabled />`,
});

export const InitialValue = createVariation({
    components: { STextArea },
    setup: () => {
        const value = ref('initial value');
        return { value };
    },
    containerClass: 'grid grid-cols-2 gap-4 h-[100px]',
    template: `
<!-- value = 'initial value' -->
<STextArea v-model="value" /> 
<SLabel>
    <span class="font-bold">v-model: </span>
    {{value}}
</SLabel>
`,
});

export const MultiLine = createVariation({
    components: { STextArea },
    containerClass: 'grid grid-cols-2 gap-4 h-[100px]',
    template: `
<STextArea v-model="value" /> 
<SLabel class="whitespace-pre-line">
    <span class="font-bold">v-model: </span>
    {{value}}
</SLabel>
`,
});
