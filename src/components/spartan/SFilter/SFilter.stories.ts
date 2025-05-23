import SFilter from './SFilter.vue';
import { StoryPanel } from '@internal';
import { buildDesign, buildSourceBinding, createDefault, createVariation } from '@/helpers';
import { ref } from 'vue';
import type { TField, TSaveData } from './types';

export default {
    component: SFilter,
    title: 'misc/Filter',
    parameters: {
        docs: {
            description: {
                component:
                    'A filter interface wich can be used to build a filter data structure useful for querying data.',
            },
        },
    },
    argTypes: {
        // Events
        apply: {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'The event is emitted when the apply action is triggered.',
        },

        // Props
        fields: {
            description: 'The fields to be used to build the filter data structure.',
        },
    },
};

const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=5253%3A20873');

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    containerClass: 'h-[500px]',
    components: { SFilter, StoryPanel },
    template: `<StoryPanel /><SFilter v-bind="args" @apply="console.log" />`,
    args: {
        fields: [
            {
                id: 'brand',
                name: 'Brand',
                interfaces: {
                    options: {
                        multiple: true,
                        options: [{ id: '1', label: 'Nike' }, 'Adidas', 'Puma', 'Reebok', 'Under Armour'],
                        operators: [
                            'equal',
                            'notEqual',
                            'contains',
                            { id: 'custom', label: 'customOper', tag: (value: string) => `custom -> ${value}` },
                        ],
                    },
                },
                state: {
                    operator: 'equal',
                    value: ['Adidas'],
                },
            },
            {
                id: 'description',
                name: 'Description',
                interfaces: {
                    oneInput: {
                        operators: [
                            'contains',
                            'notContains',
                            'startsWith',
                            'endsWith',
                            { id: 'custom', label: 'customOper' },
                        ],
                    },
                },
                state: {
                    operator: 'contains',
                    value: 'sport',
                },
            },
            {
                id: 'seller',
                name: 'Seller',
                interfaces: {
                    options: {
                        operators: ['equal', 'notEqual'],
                        options: [
                            'Amazon',
                            'Ebay',
                            'Walmart',
                            'Target',
                            'Best Buy',
                            'Another 1',
                            'Another 2',
                            'Another 3',
                            'Another 4',
                            'Another 5',
                            'Another 6',
                            'Another 7',
                            'Another 8',
                            'Another 9',
                            'Another 10',
                            'Another 11',
                            'Another 12',
                        ],
                    },
                },
            },
            {
                id: 'price',
                name: 'Price',
                interfaces: {
                    oneInput: {
                        type: 'amount',
                        currency: 'EUR',
                        currencies: ['USD', 'EUR', 'GBP'],
                        operators: [
                            'equal',
                            'notEqual',
                            'greaterThan',
                            'lessThan',
                            'greaterThanOrEqual',
                            'lessThanOrEqual',
                        ],
                    },
                    twoInputs: {
                        type: 'amount',
                        currency: 'USD',
                        operators: ['between', 'notBetween'],
                    },
                },
            },
            {
                id: 'date',
                name: 'Date',
                permanent: true,
                interfaces: {
                    twoInputs: {
                        type: 'date',
                        operators: ['between', 'notBetween', { id: 'custom', label: 'customOper' }],
                    },
                },
                state: {
                    operator: 'between',
                    value: ['2023-08-01', '2023-08-02'],
                },
            },
            {
                id: 'gender',
                name: 'Gender',
                interfaces: {
                    options: {
                        operators: ['equal', 'notEqual'],
                        options: ['man', 'woman', 'kid'],
                    },
                    selection: {
                        operators: [{ id: 'in', label: 'Dentro de', tag: (value: string) => `Dentro de -> ${value}` }],
                    },
                },
            },
            {
                id: 'new',
                name: 'New',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
            },
            {
                id: 'another',
                name: 'Another',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
            },
            {
                id: 'another1',
                name: 'Another 1',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
            },
            {
                id: 'another2',
                name: 'Another 2',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
            },
            {
                id: 'another3',
                name: 'Another 3',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
            },
            {
                id: 'another4',
                name: 'Another 4',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
            },
            {
                id: 'another5',
                name: 'Another 5',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
            },
            {
                id: 'another6',
                name: 'Another 6',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
            },
            {
                id: 'another7',
                name: 'Another 7',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
            },
            {
                id: 'another8',
                name: 'Another 8',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
            },
            {
                id: 'another9',
                name: 'Another 9',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
            },
            {
                id: 'another10',
                name: 'Another 10',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
            },
            {
                id: 'another11',
                name: 'Another 11',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
            },
            {
                id: 'another12',
                name: 'Another 12',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
            },
        ],
    },
});

export const Saved = createVariation({
    components: { SFilter },
    containerClass: 'wfull h-[250px]',
    setup: () => {
        const fields = ref([
            {
                id: 'test',
                name: 'Test',
                interfaces: {
                    none: {
                        operators: ['exist', 'notExist'],
                    },
                },
                state: {
                    operator: 'exist',
                    value: null,
                },
            },
        ]);
        const saved = ref<TSaveData[]>([]);

        const save = (data: TSaveData[]) => {
            console.log('Saved:', data);
            saved.value = data;
        };

        const load = (data: TSaveData[]) => {
            console.log('Loaded:', data);
        };

        return { fields, saved, save, load };
    },
    template: `<SFilter :fields="fields" :saved="saved" :responsive="false" @apply="console.log" @save="save" @load="load"/>`,
});
