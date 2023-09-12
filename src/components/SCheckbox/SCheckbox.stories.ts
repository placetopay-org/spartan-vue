import SCheckbox from './SCheckbox.vue';
import { buildSourceBinding, createDefault, createVariation } from '../../helpers';

export default {
  component: SCheckbox,
  title: 'new/Checkbox',
  parameters: {
    docs: {
      description: {
        component: 'Checkbox component for forms.'
      },
    },
  },
  argTypes: {
    // Events
    'update:modelValue': {
      control: { type: null },
      table: { type: { summary: null }, category: 'Events' },
      description: 'The event emitted when the checkbox is checked.',
    },

    // Props
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled.',
      table: { type: { summary: 'boolean' } },
    },
    id: {
      control: 'string',
      description: 'The id of the checkbox.',
      table: { type: { summary: 'string' } },
    },
    modelValue: {
      control: { type: null },
      description: 'Whether the checkbox is checked.',
      table: { type: { summary: 'Ref<boolean>' } },
    },
    name: {
      control: 'string',
      description: 'The name of the checkbox.',
      table: { type: { summary: 'string' } },
    }
  },
};

const sourceBinding = buildSourceBinding({
  check: ['disabled'],
  prop: { id: undefined, name: undefined },
});

export const Default = createDefault({
  components: { SCheckbox },
  transform: (args) => `<SCheckbox ${sourceBinding(args)} />`,
  template: '<SCheckbox v-bind="argsWithoutSlots" />',
  args: {
    disabled: false,
    id: 'test-id',
    name: 'test-name',
  },
});

export const Example = createVariation({ components: { SCheckbox }, template: '<SCheckbox>Label text</SCheckbox>' });
