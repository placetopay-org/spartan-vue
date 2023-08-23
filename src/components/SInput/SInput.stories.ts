import SInput from './SInput.vue';
import { SDropdown, SDropdownItem } from '../SDropdown';
import type { SourceProps } from '@storybook/blocks';
import { buildDesign, buildSourceBinding } from '../../helpers';
import { ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline';

export default {
  component: SInput,
  title: 'new/Input',
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
      description: "DOC",
    },

    // Props
    disabled: {
      description: 'DOC',
      table: { type: { summary: 'boolean' } },
    },
    id: {
      control: 'text',
      description: 'DOC',
      table: { type: { summary: 'string' } },
    },
    label: {
      control: 'text',
      description: 'DOC',
      table: { type: { summary: 'string' } },
    },
    modelValue: {
      control: { type: 'text' },
      description: "DOC",
      table: { type: { summary: 'Ref<string>' } },
    },
    name: {
      control: 'text',
      description: 'DOC',
      table: { type: { summary: 'string' } },
    },
    placeholder: {
      control: 'text',
      description: 'DOC',
      table: { type: { summary: 'string' } },
    },
    type: {
      control: 'text',
      description: 'DOC',
      table: { type: { summary: 'string' } },
    },
  },
};

const design = buildDesign('');

const sourceBinding = buildSourceBinding({});

export const Default = {
  render: (args: any) => ({
    components: { SInput },
    setup() {
      return { args };
    },
    template: '<SInput v-bind="args" v-model="args.modelValue" />',
  }),
  parameters: {
    design,
    docs: {
      canvas: { layout: 'centered' },
      source: {
        transform: ((_, storyContext) => `
        <SInput ${sourceBinding(storyContext.args)} />
        `) as SourceProps['transform'],
        type: 'dynamic',
        language: 'html',
      },
    },
  },
  args: {
    disabled: false,
    type: 'text',
  },
};

const createVariation = (
  template: string,
  options?: {
    focusVisible?: boolean;
    decorators?: (() => {
      template: string;
    })[];
  }
) => ({
  decorators: options?.decorators ?? [
    () => ({ template: '<div style="gap: 20px; display: flex; align-items: end;"><story/></div>' }),
  ],
  render: () => ({
    components: { SInput, SDropdown, SDropdownItem, ArrowLeftOnRectangleIcon },
    setup() {
      return { ArrowLeftOnRectangleIcon };
    },
    template,
  }),
  parameters: {
    design,
    pseudo: { focusVisible: options?.focusVisible },
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

export const Size = createVariation(`
<SInput name="John Doe" size="xs" />
<SInput name="John Doe" size="sm" />
<SInput name="John Doe" size="md" />
<SInput name="John Doe" size="lg" />
<SInput name="John Doe" size="xl" />
<SInput name="John Doe" size="2xl" />
`);
