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
        options: ['Amazon', 'Ebay', 'Walmart', 'Target', 'Best Buy'],
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
