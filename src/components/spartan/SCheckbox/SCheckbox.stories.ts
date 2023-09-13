import SCheckbox from './SCheckbox.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
  component: SCheckbox,
  title: 'new/Checkbox',
  parameters: {
    docs: {
      description: {
        component: 'Checkbox component for forms.',
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

    // Slots
    default: {
      control: 'text',
      description: 'Default slot for checkbox label content.',
      table: { type: { summary: 'VNode | VNode Array' } },
    },
    description: {
      control: 'text',
      description: 'Slot for checkbox description.',
      table: { type: { summary: 'VNode | VNode Array' } },
    },

    // Props
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled.',
      table: { type: { summary: 'boolean' } },
    },
    id: {
      control: 'text',
      description: 'The id of the checkbox.',
      table: { type: { summary: 'string' } },
    },
    inline: {
      control: 'boolean',
      description: 'Whether the checkbox is inline.',
      table: { type: { summary: 'boolean' } },
    },
    modelValue: {
      control: { type: null },
      description: 'Whether the checkbox is checked.',
      table: { type: { summary: 'Ref<boolean>' } },
    },
    name: {
      control: 'text',
      description: 'The name of the checkbox.',
      table: { type: { summary: 'string' } },
    },
    reverse: {
      control: 'boolean',
      description: 'Whether the checkbox is reversed.',
      table: { type: { summary: 'boolean' } },
    },
  },
};

const sourceBinding = buildSourceBinding({
  check: ['disabled'],
  prop: { id: undefined, name: undefined },
});

export const Default = createDefault({
  components: { SCheckbox },
  template: `<SCheckbox v-bind="argsWithoutSlots">
  <template #default>
    {{ args.default }}
  </template>

  <template #description>
    {{ args.description }}
  </template>
  </SCheckbox>`,
  transform: (args) => `<SCheckbox ${sourceBinding(args)} />`,
  args: {
    default: '',
    description: '',
    disabled: false,
    id: 'test-id',
    inline: false,
    name: 'test-name',
    reverse: false,
    value: 'test-value',
  },
});

export const OnlyCheckbox = createVariation({ components: { SCheckbox }, template: '<SCheckbox />' });

export const WithLabel = createVariation({ components: { SCheckbox }, template: '<SCheckbox>Remember me</SCheckbox>' });

export const WithDescription = createVariation({
  components: { SCheckbox },
  template: `<SCheckbox>
  <template #description>
    Get notified when someones posts a comment on a posting. Send a notification once a day if there are new comments.
  </template>
</SCheckbox>`,
});

export const WithLabelAndDescription = createVariation({
  components: { SCheckbox },
  template: `<SCheckbox>
  <template #default>
    Comments
  </template>

  <template #description>
    Get notified when someones posts a comment on a posting. Send a notification once a day if there are new comments.
  </template>
</SCheckbox>`,
});

export const WithLabelAndDescriptionInline = createVariation({
  components: { SCheckbox },
  template: `<SCheckbox inline>
  <template #default>
    Comments
  </template>

  <template #description>
    get notified when someones posts a comment on a posting. Send a notification once a day if there are new comments.
  </template>
</SCheckbox>`,
});

export const Reversed = createVariation({
  components: { SCheckbox },
  containerClass: 'flex flex-col gap-4',
  template: `<SCheckbox reverse>Remember me</SCheckbox>

<hr/>

<SCheckbox reverse>
  <template #description>
    Get notified when someones posts a comment on a posting. Send a notification once a day if there are new comments.
  </template>
</SCheckbox>

<hr/>

<SCheckbox reverse>
  <template #default>
    Comments
  </template>

  <template #description>
    Get notified when someones posts a comment on a posting. Send a notification once a day if there are new comments.
  </template>
</SCheckbox>`,
});
