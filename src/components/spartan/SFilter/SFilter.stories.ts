import SFilter from './SFilter.vue';
import { StoryPanel } from '@internal';
import { buildDesign, buildSourceBinding } from '@/helpers';
import type { SourceProps } from '@storybook/blocks';
import { Oper, type TField } from './types';

export default {
    component: SFilter,
    title: 'new/Filter',
    parameters: {
        docs: {
            description: {
                component: '-',
            },
        },
    },
    argTypes: {
        // Events
        apply: {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: '-',
        },
        removed: {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: '-',
        },

        // Props
        savedFilters: {
            description: '-',
        },
        fields: {
            description: '-',
        },
    },
};

const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=5253%3A20873');

const sourceBinding = buildSourceBinding({
    check: ['savedFilters'],
});

export const Default = {
    decorators: [
        () => ({
            template: '<div style="padding: 0 4px; padding-bottom: 500px;"><story/></div>',
        }),
    ],
    render: (args: any) => ({
        components: { SFilter, StoryPanel },
        setup() {
            const show = (value: string) => {
                console.log(JSON.parse(JSON.stringify(value)));
            };

            return { args, show };
        },
        template: '<StoryPanel /><SFilter v-bind="args" @apply="show" />',
    }),
    parameters: {
        design,
        docs: {
            source: {
                transform: ((_, storyContext) => `
        <SFilter ${sourceBinding(storyContext.args)} />`) as SourceProps['transform'],
                type: 'dynamic',
                language: 'html',
            },
        },
    },
    args: {
        savedFilters: false,
        fields: [
            {
                name: 'Brand',
                type: 'enum',
                options: ['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour'],
                filter: {
                    operator: Oper.EQ,
                    value: ['Nike', 'Adidas'],
                },
            },
            {
                name: 'Description',
                type: 'string',
                filter: {
                    operator: Oper.CONTAINS,
                    value: 'sport',
                },
            },
            {
                name: 'Seller',
                type: 'enum',
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
                // filter: {
                //   operator: Oper.EQ,
                //   value: ['Amazon'],
                // }
            },
            {
                name: 'Price',
                type: 'number',
                // filter: {
                //   operator: Oper.BETWEEN,
                //   value: [0, 100],
                // }
            },
            {
                name: 'Date',
                type: 'date',
                // required: true,
                filter: {
                    operator: Oper.BETWEEN,
                    value: ['2023-08-01', '2023-08-02'],
                },
            },
            {
                name: 'Gender',
                type: 'enum',
                unique: true,
                options: ['men', 'women', 'kids', 'unisex'],
            },
            {
                name: 'New',
                type: 'boolean',
            },
            {
                name: 'Another',
                type: 'string',
            },
            {
                name: 'Another 1',
                type: 'string',
            },
            {
                name: 'Another 2',
                type: 'string',
            },
            {
                name: 'Another 3',
                type: 'string',
            },
            {
                name: 'Another 4',
                type: 'string',
            },
            {
                name: 'Another 5',
                type: 'string',
            },
            {
                name: 'Another 6',
                type: 'string',
            },
            {
                name: 'Another 7',
                type: 'string',
            },
            {
                name: 'Another 8',
                type: 'string',
            },
            {
                name: 'Another 9',
                type: 'string',
            },
            {
                name: 'Another 10',
                type: 'string',
            },
            {
                name: 'Another 11',
                type: 'string',
            },
            {
                name: 'Another 12',
                type: 'string',
            },
        ] as TField[],
    },
};

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