import SCheckbox from './SCheckbox.vue';
import { buildSourceBinding, createDefault, createVariation } from '../../helpers';

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
    // default: 'Label text',
    // description: 'Checkbox description',
    disabled: false,
    id: 'test-id',
    name: 'test-name',
  },
});

export const OnlyCheckbox = createVariation({ components: { SCheckbox }, template: '<SCheckbox />' });

export const WithLabel = createVariation({ components: { SCheckbox }, template: '<SCheckbox>Remember me</SCheckbox>' });

export const WithDescription = createVariation({
  components: { SCheckbox },
  template: `<SCheckbox>
  <template #description>
    Get notified when someones posts a comment on a posting.
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
    Get notified when someones posts a comment on a posting.
  </template>
</SCheckbox>`,
});

export const WithLabelReversed = createVariation({
  components: { SCheckbox },
  template: '<SCheckbox reverse>Remember me</SCheckbox>',
});

export const WithDescriptionReversed = createVariation({
  components: { SCheckbox },
  template: `<SCheckbox reverse>
  <template #description>
    Get notified when someones posts a comment on a posting.
  </template>
</SCheckbox>`,
});

export const WithLabelAndDescriptionReversed = createVariation({
  components: { SCheckbox },
  template: `<SCheckbox reverse>
  <template #default>
    Comments
  </template>

  <template #description>
    Get notified when someones posts a comment on a posting.
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
    Get notified when someones posts a comment on a posting.
  </template>
</SCheckbox>

<hr/>

<SCheckbox reverse>
  <template #default>
    Comments
  </template>

  <template #description>
    Get notified when someones posts a comment on a posting.
  </template>
</SCheckbox>`,
});
