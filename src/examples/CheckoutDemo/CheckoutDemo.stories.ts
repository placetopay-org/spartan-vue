import CheckoutDemo from './CheckoutDemo.vue';
import type { SourceProps } from '@storybook/blocks';
import { buildDesign, buildSourceBinding } from '../../helpers';
import { ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline';

export default {
  component: CheckoutDemo,
  title: 'examples/CheckoutDemo',
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
    components: { CheckoutDemo },
    setup() {
      return { args };
    },
    template: `<CheckoutDemo v-bind="args" v-model="args.modelValue"/>`,
  }),
  parameters: {
    design,
    docs: {
      canvas: { layout: 'centered' },
      source: {
        transform: ((_, storyContext) => `
        <CheckoutDemo ${sourceBinding(storyContext.args)} />
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
    components: { CheckoutDemo, ArrowLeftOnRectangleIcon },
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
