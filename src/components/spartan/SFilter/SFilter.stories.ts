import SFilter from './SFilter.vue';
import { StoryPanel } from '@internal';
import { buildDesign, buildSourceBinding, createDefault } from '@/helpers';
import { type TField } from './types';

export default {
    component: SFilter,
    title: 'new/Filter',
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
    template: `<StoryPanel /><SFilter v-bind="args" @apply="show" />`,
    setup: () => {
        const show = (value: string) => {
            console.log(JSON.parse(JSON.stringify(value)));
        };

        return { show };
    },
    args: {
        fields: [
            {
                id: 'brand',
                name: 'Brand',
                interfaces: {
                    options: {
                        multiple: true,
                        operators: ['equal', 'notEqual', 'contains'],
                        options: ['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour'],
                        customOperators: [{ id: 'custom', label: 'customOper' }],
                    },
                },
                state: {
                    operator: 'equal',
                    value: ['Nike', 'Adidas'],
                },
            },
            {
                id: 'description',
                name: 'Description',
                interfaces: {
                    oneInput: {
                        operators: ['contains', 'notContains', 'startsWith', 'endsWith'],
                        customOperators: [{ id: 'custom', label: () => 'customOper' }],
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
                    option: {
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
                        operators: ['between', 'notBetween'],
                        customOperators: [{ id: 'custom', label: 'customOper' }],
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
                    option: {
                        operators: ['equal', 'notEqual'],
                        options: ['man', 'woman', 'kid'],
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
            },
            {
                id: 'another1',
                name: 'Another 1',
            },
            {
                id: 'another2',
                name: 'Another 2',
            },
            {
                id: 'another3',
                name: 'Another 3',
            },
            {
                id: 'another4',
                name: 'Another 4',
            },
            {
                id: 'another5',
                name: 'Another 5',
            },
            {
                id: 'another6',
                name: 'Another 6',
            },
            {
                id: 'another7',
                name: 'Another 7',
            },
            {
                id: 'another8',
                name: 'Another 8',
            },
            {
                id: 'another9',
                name: 'Another 9',
            },
            {
                id: 'another10',
                name: 'Another 10',
            },
            {
                id: 'another11',
                name: 'Another 11',
            },
            {
                id: 'another12',
                name: 'Another 12',
            },
        ] as TField[],
    },
});

// const createVariation = (template: string) => ({
//   decorators: [() => ({ template: '<div style="gap: 20px; display: flex; align-items: end;"><story/></div>' })],
//   render: () => ({
//     components: { SFilter },
//     template,
//   }),
//   parameters: {
//     design,
//     controls: { disable: true },
//     actions: { disable: true },
//     docs: {
//       source: {
//         code: template,
//         language: 'html',
//       },
//     },
//   },
// });

// export const Size = createVariation(
//   `
// <SFilter color="blue" size="sm"> Small </SFilter>
// <SFilter color="blue" size="md"> Medium </SFilter>
// <SFilter color="blue" size="lg"> Large </SFilter>
// `
// );
