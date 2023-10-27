import SRadioGroup from './SRadioGroup.vue';
import SRadioGroupItem from './SRadioGroupItem.vue';
import { createDefault, createVariation } from '@/helpers';
import { ref } from 'vue';

export default {
    component: SRadioGroup,
    title: 'new/RadioGroup',
    parameters: {
        docs: {
            description: {
                component: 'The RadioGroup component is used to group a collection of radio buttons together.',
            },
        },
    },
    argTypes: {
        // Events
        'update:modelValue': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'Emitted when the selection changes',
        },

        // Slots
        default: {
            control: { type: null },
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The items of the radio group',
        },

        // Slots - Item
        'default (item)': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Slots - Item' },
            description: 'The content of the radio item',
        },
        title: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots - Item' },
            description: 'The title of the radio item',
        },
        description: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots - Item' },
            description: 'The description of the radio item',
        },
        footer: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots - Item' },
            description: 'The footer of the radio item',
        },

        // Props
        modelValue: {
            control: { type: null },
            table: { type: { summary: 'string' } },
            description: 'The value of the selected radio item',
        },
    },
};

export const Default = createDefault({
    components: { SRadioGroup, SRadioGroupItem },
    args: {
        title: 'Radio Title',
        description: 'Radio Description',
        footer: 'Radio Footer',
    },
    setup: () => {
        const value = ref('');
        return { value };
    },
    template: `<SRadioGroup v-bind="args" v-model="value">
  <SRadioGroupItem value="test-value">
      <template #title v-if="args.title">
        <span>{{args.title}}</span>
      </template>

      <template #description v-if="args.description">
        <span>{{args.description}}</span>
      </template>

      <template #footer v-if="args.footer">
        <span>{{args.footer}}</span>
      </template>
  </SRadioGroupItem>
</SRadioGroup>`,
    transform: (args) => `<SRadioGroup v-model="value">
    <SRadioGroupItem value="test-value">
        <template #title>
          <span>${args.title}</span>
        </template>
  
        <template #description>
          <span>${args.description}</span>
        </template>
  
        <template #footer>
          <span>${args.footer}</span>
        </template>
    </SRadioGroupItem>
  </SRadioGroup>`,
});

export const Base = createVariation({
    components: { SRadioGroup, SRadioGroupItem },
    setup: () => {
        const value = ref('startup');
        return { value };
    },
    template: `<SRadioGroup v-model="value" class="grid grid-cols-3 gap-4">
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
});
