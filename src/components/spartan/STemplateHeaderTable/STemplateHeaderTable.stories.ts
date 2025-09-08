import STableWithSearch from './STableWithSearch.vue';
import { buildSourceBinding, createDefault, createHistory } from '@/helpers';

export default {
    component: STableWithSearch,
    title: 'tables/STableWithSearch',
    ...createHistory({
        description: 'The table with search component is used to search in a table.',
        props: [
            { name: 'href', type: 'string', default: 'undefined', description: 'The type of the input element.' },
            {
                name: 'data',
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
    components: { STableWithSearch },
    template: `<STableWithSearch v-bind="args">{{args.default}}</STableWithSearch>`,
    transform: (args) => `<STableWithSearch ${sourceBinding(args)}>${args.default}</STableWithSearch>`,
    args: {
        default: 'Table with Search',
        data: [],
        search: '',
    },
});
