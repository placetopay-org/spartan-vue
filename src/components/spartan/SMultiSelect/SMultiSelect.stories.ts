import SMultiSelect from './SMultiSelect.vue';
import { buildSourceBinding, createDefault, createHistory } from '@/helpers';

export default {
    component: SMultiSelect,
    title: 'inputs/MultiSelect',
    ...createHistory({
        description: 'The link component is used to navigate between pages.',
        props: [
            { name: 'href', type: 'string', default: 'undefined', description: 'The type of the input element.' },
            {
                name: 'target',
                type: '_blank | _parent | _self | _top',
                default: 'undefined',
                description: 'The target attribute specifies where to open the linked document.',
            },
        ],
        slots: [{ name: 'default', description: 'The content of the link.' }],
    }),
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SMultiSelect },
    template: `<SMultiSelect v-bind="args">{{args.default}}</SMultiSelect>`,
    transform: (args) => `<SMultiSelect ${sourceBinding(args)}>${args.default}</SMultiSelect>`,
    args: {
        class: 'Link',
    },
});
