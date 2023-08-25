import SFilter from './SFilter.vue';
import { action } from '@storybook/addon-actions';
import { buildDesign, buildSourceBinding } from '../../helpers';
import type { SourceProps } from '@storybook/blocks';
import { Oper, type TFilter } from './types';

export default {
  component: SFilter,
  title: 'new/Filter',
  parameters: {
    docs: {
      description: {
        component: 'DOC',
      },
    },
  },
  argTypes: {
    // Events
    removed: {
      control: { type: 'text' },
      table: { type: { summary: null }, category: 'Events' },
      description: "DOC",
    },

    // Props
    customFilters: {
      description: 'DOC',
      table: { type: { summary: 'boolean' } },
    },
  },
};

const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=5253%3A20873');

const sourceBinding = buildSourceBinding({
  check: ['customFilters'],
});

export const Default = {
  decorators: [() => ({ template: '<div style="padding: 0 4px; padding-bottom: 500px;"><story/></div>' })],
  render: (args: any) => ({
    components: { SFilter },
    setup() {
      return { args };
    },
    template: '<SFilter v-bind="args" />',
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
    customFilters: false,
    data: [
      {
        field: 'Brand',
        type: 'enum',
        options: ['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour'],
        filter: {
          operator: Oper.IN,
          value: ['Nike', 'Adidas'],
        }
      },
      {
        field: 'Description',
        type: 'string',
        // filter: {
        //   operator: Oper.CONTAINS,
        //   value: 'sport',
        // }
      },
      {
        field: 'Seller',
        type: 'enum',
        options: ['Amazon', 'Ebay', 'Walmart', 'Target', 'Best Buy', 'Another 1', 'Another 2', 'Another 3', 'Another 4', 'Another 5', 'Another 6', 'Another 7', 'Another 8', 'Another 9', 'Another 10', 'Another 11', 'Another 12'],
        // filter: {
        //   operator: Oper.IN,
        //   value: ['Amazon'],
        // }
      },
      {
        field: 'Price',
        type: 'number',
        // filter: {
        //   operator: Oper.BETWEEN,
        //   value: [0, 100],
        // }
      },
      {
        field: 'Date',
        type: 'date',
        // filter: {
        //   operator: Oper.BETWEEN,
        //   value: [0, 100],
        // }
      },
      {
        field: 'Another',
        type: 'string',
      },
      {
        field: 'Another 1',
        type: 'string',
      },
      {
        field: 'Another 2',
        type: 'string',
      },
      {
        field: 'Another 3',
        type: 'string',
      },
      {
        field: 'Another 4',
        type: 'string',
      },
      {
        field: 'Another 5',
        type: 'string',
      },
      {
        field: 'Another 6',
        type: 'string',
      },
      {
        field: 'Another 7',
        type: 'string',
      },
      {
        field: 'Another 8',
        type: 'string',
      },
      {
        field: 'Another 9',
        type: 'string',
      },
      {
        field: 'Another 10',
        type: 'string',
      },
      {
        field: 'Another 11',
        type: 'string',
      },
      {
        field: 'Another 12',
        type: 'string',
      },
    ] as TFilter[],
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
