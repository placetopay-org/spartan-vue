import SSelect from './SSelect.vue';
import type { SourceProps } from '@storybook/blocks';
import { action } from '@storybook/addon-actions';
import { buildDesign, buildSourceBinding } from '../../helpers';
import { ref } from 'vue';

export default {
  component: SSelect,
  title: 'new/Select',
  parameters: {
    docs: {
      description: {
        component: 'DOC',
      },
    },
  },
  argTypes: {
    // Events
    'update:modelValue': {
      control: { type: null },
      table: { type: { summary: null }, category: 'Events' },
      description: 'DOC',
    },

    // Slots
    default: {
      control: { type: null },
      description: 'DOC',
      table: { type: { summary: 'VNode | VNode Array' } },
    },

    // Props
    disabled: {
      description: 'DOC',
      table: { type: { summary: 'boolean' } },
    },
    error: {
      description: 'DOC',
      table: { type: { summary: 'boolean' } },
    },
    id: {
      control: { type: 'text' },
      description: 'DOC',
      table: { type: { summary: 'string' } },
    },
    modelValue: {
      control: { type: 'text' },
      description: 'DOC',
      table: { type: { summary: 'Ref<string>' } },
    },
    name: {
      control: { type: 'text' },
      description: 'DOC',
      table: { type: { summary: 'string' } },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'DOC',
      table: { type: { summary: 'string' } },
    },
  },
};

const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=184-3842');

const sourceBinding = buildSourceBinding({});

export const Default = {
  decorators: [() => ({ template: '<div style="gap: 20px; display: flex;"><story/></div>' })],
  render: (args: any) => ({
    components: { SSelect },
    setup() {
      return { args };
    },
    template: `
<SSelect v-bind="args" v-model="args.modelValue">
  <option value="visa">visa</option> 
  <option value="mastercard">mastercard</option> 
  <option value="american express">american express</option>
</SSelect>
`,
  }),
  parameters: {
    design,
    docs: {
      canvas: { layout: 'centered' },
      source: {
        transform: ((_, storyContext) => `<SSelect ${sourceBinding(storyContext.args)}>
  <option value="visa">visa</option> 
  <option value="mastercard">mastercard</option> 
  <option value="american express">american express</option>
</SSelect>`) as SourceProps['transform'],
        type: 'dynamic',
        language: 'html',
      },
    },
  },
  args: {
    disabled: false,
    error: false,
    id: 'test-id',
    modelValue: '',
    name: 'payment_method',
    placeholder: 'Select an option',
  },
};

const createVariation = (template: string, placeholder?: boolean) => ({
  decorators: [() => ({ template: '<div style="gap: 20px; display: flex; max-width: 200px"><story/></div>' })],
  render: () => ({
    components: { SSelect },
    template,
    setup() {
      const value = ref(placeholder ? '' : 'option');
      return { value };
    },
  }),
  parameters: {
    design,
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      source: {
        code: template,
        language: 'html',
      },
    },
  },
});

export const Placeholder = createVariation(
  `
<SSelect v-model="value" placeholder="Select an option">
  <option value="option">option</option>
  <option value="option2">option2</option>
  <option value="option3">option3</option>
  <option value="option4">option4</option>
  <option value="option5">option5</option>
</SSelect>
`,
  true
);

export const Disabled = createVariation(
  `
<SSelect v-model="value" disabled>
  <option value="option">option</option>
  <option value="option2">option2</option>
  <option value="option3">option3</option>
  <option value="option4">option4</option>
  <option value="option5">option5</option>
</SSelect>
`
);

export const Error = createVariation(
  `
<SSelect v-model="value" error>
  <option value="option">option</option>
  <option value="option2">option2</option>
  <option value="option3">option3</option>
  <option value="option4">option4</option>
  <option value="option5">option5</option>
</SSelect>
`
);
