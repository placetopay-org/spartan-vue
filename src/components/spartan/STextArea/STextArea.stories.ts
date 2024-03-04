import STextArea from './STextArea.vue';
import { buildSourceBinding, createDefault, createHistory } from '@/helpers';

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
                control: null
            }
        ]
    }),
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { STextArea },
    template: `<STextArea v-bind="args">{{args.default}}</STextArea>`,
    transform: (args) => `<STextArea ${sourceBinding(args)}>${args.default}</STextArea>`,
    args: {
        error: false,
        disabled: false,
    },
});
