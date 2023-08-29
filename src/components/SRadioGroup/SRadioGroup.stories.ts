import SRadioGroup from './SRadioGroup.vue';
import SRadioGroupItem from './SRadioGroupItem.vue';
import { SDropdown, SDropdownItem } from '../SDropdown';
import type { SourceProps } from '@storybook/blocks';
import { buildDesign, buildSourceBinding } from '../../helpers';
import { ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline';

export default {
  component: SRadioGroup,
  title: 'new/RadioGroup',
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
  },
};

const design = buildDesign('');

const sourceBinding = buildSourceBinding({});

export const Default = {
  render: (args: any) => ({
    components: { SRadioGroup, SRadioGroupItem },
    setup() {
      return { args };
    },
    template: `<SRadioGroup v-bind="args" v-model="args.modelValue" class="grid grid-cols-3 gap-4">
    <SRadioGroupItem value="startup">
      <template #title>
        <span>Startup</span>
      </template>

      <template #description>
        <span>A new business or company</span>
      </template>

      <template #footer>
        <span>high risk</span>
      </template>
    </SRadioGroupItem>

    <SRadioGroupItem value="business">
      <template #title>
        <span>Business</span>
      </template>

      <template #description>
        <span>A business with up to 50 employees or turnover of up to £5m</span>
      </template>

      <template #footer>
        <span>Medium risk</span>
      </template>
    </SRadioGroupItem>

    <SRadioGroupItem value="corporate">
      <template #title>
        <span>Corporate</span>
      </template>

      <template #description>
        <span>A business with more than 50 employees or turnover of more than £5m</span>
      </template>

      <template #footer>
        <span>Low risk</span>
      </template>
    </SRadioGroupItem>
    </SRadioGroup>`,
  }),
  parameters: {
    design,
    docs: {
      canvas: { layout: 'centered' },
      source: {
        transform: ((_, storyContext) => `
        <SRadioGroup ${sourceBinding(storyContext.args)} />
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
    components: { SRadioGroup, SDropdown, SDropdownItem, ArrowLeftOnRectangleIcon },
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
// <SRadioGroup name="John Doe" size="xs" />
// <SRadioGroup name="John Doe" size="sm" />
// <SRadioGroup name="John Doe" size="md" />
// <SRadioGroup name="John Doe" size="lg" />
// <SRadioGroup name="John Doe" size="xl" />
// <SRadioGroup name="John Doe" size="2xl" />
// `);
