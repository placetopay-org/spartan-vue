import SRadio from './SRadio.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: SRadio,
    title: 'inputs/Radio',
    parameters: {
        docs: {
            description: {
                component: 'Radio component for forms.',
            },
        },
    },
    argTypes: {
        // Events
        'update:modelValue': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'The event emitted when the radio is checked.',
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
            description: 'Whether the radio is disabled.',
            table: { type: { summary: 'boolean' } },
        },
        id: {
            control: 'text',
            description: 'The id of the radio.',
            table: { type: { summary: 'string' } },
        },
        inline: {
            control: 'boolean',
            description: 'Whether the radio is inline.',
            table: { type: { summary: 'boolean' } },
        },
        modelValue: {
            control: { type: null },
            description: 'Whether the radio is checked.',
            table: { type: { summary: 'Ref<boolean>' } },
        },
        name: {
            control: 'text',
            description: 'The name of the radio.',
            table: { type: { summary: 'string' } },
        },
        reverse: {
            control: 'boolean',
            description: 'Whether the radio is reversed.',
            table: { type: { summary: 'boolean' } },
        },
    },
};

const sourceBinding = buildSourceBinding({
    check: ['disabled', 'inline', 'reverse'],
    prop: { id: undefined, name: undefined },
});

export const Default = createDefault({
    components: { SRadio },
    template: `<SRadio v-bind="argsWithoutSlots">
  <template #default>
    {{ args.default }}
  </template>

  <template #description>
    {{ args.description }}
  </template>
  </SRadio>`,
    transform: (args) => `<SRadio ${sourceBinding(args)} />`,
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

export const OnlyCheckbox = createVariation({
    components: { SRadio },
    template: '<SRadio />',
});

export const WithLabel = createVariation({
    components: { SRadio },
    template: '<SRadio>Remember me</SRadio>',
});

export const WithDescription = createVariation({
    components: { SRadio },
    template: `<SRadio>
  <template #description>
    Get notified when someones posts a comment on a posting. Send a notification once a day if there are new comments.
  </template>
</SRadio>`,
});

export const WithLabelAndDescription = createVariation({
    components: { SRadio },
    template: `<SRadio>
  <template #default>
    Comments
  </template>

  <template #description>
    Get notified when someones posts a comment on a posting. Send a notification once a day if there are new comments.
  </template>
</SRadio>`,
});

export const WithLabelAndDescriptionInline = createVariation({
    components: { SRadio },
    template: `<SRadio inline>
  <template #default>
    Comments
  </template>

  <template #description>
    get notified when someones posts a comment on a posting. Send a notification once a day if there are new comments.
  </template>
</SRadio>`,
});

export const Reversed = createVariation({
    components: { SRadio },
    containerClass: 'flex flex-col gap-4',
    template: `<SRadio reverse>Remember me</SRadio>

<hr/>

<SRadio reverse>
  <template #description>
    Get notified when someones posts a comment on a posting. Send a notification once a day if there are new comments.
  </template>
</SRadio>

<hr/>

<SRadio reverse>
  <template #default>
    Comments
  </template>

  <template #description>
    Get notified when someones posts a comment on a posting. Send a notification once a day if there are new comments.
  </template>
</SRadio>`,
});
