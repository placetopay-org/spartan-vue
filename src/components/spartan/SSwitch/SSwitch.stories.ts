import SSwitch from './SSwitch.vue';
import { SDropdown, SDropdownItem } from '@spartan';
import type { SourceProps } from '@storybook/blocks';
import { buildDesign, buildSourceBinding } from '@/helpers';
import { ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline';

export default {
  component: SSwitch,
  title: 'new/Switch',
  parameters: {
    docs: {
      description: {
        component: '-',
      },
    },
  },
  argTypes: {
    // Events
    'update:modelValue': {
      control: { type: null },
      table: { type: { summary: null }, category: 'Events' },
      description: '-',
    },

    // Slots
    default: {
      control: { type: null },
      table: { type: { summary: null }, category: 'Slots' },
      description: '-',
    },

    // Props
    modelValue: {
      control: { type: null },
      table: { type: { summary: 'string' } },
      description: '-',
    },
  },
};

const design = buildDesign('');

const sourceBinding = buildSourceBinding({});

export const Default = {
  render: (args: any) => ({
    components: { SSwitch },
    setup() {
      return { args };
    },
    template: `<SSwitch v-bind="args" v-model="args.modelValue"/>`,
  }),
  parameters: {
    design,
    docs: {
      canvas: { layout: 'centered' },
      source: {
        transform: ((_, storyContext) => `
        <SSwitch ${sourceBinding(storyContext.args)} />
        `) as SourceProps['transform'],
        type: 'dynamic',
        language: 'html',
      },
    },
  },
  args: {
    modelValue: true,
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
    components: { SSwitch, SDropdown, SDropdownItem, ArrowLeftOnRectangleIcon },
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

// export const Size = createVariation(`
// <SSwitch name="John Doe" size="xs" />
// <SSwitch name="John Doe" size="sm" />
// <SSwitch name="John Doe" size="md" />
// <SSwitch name="John Doe" size="lg" />
// <SSwitch name="John Doe" size="xl" />
// <SSwitch name="John Doe" size="2xl" />
// `);
