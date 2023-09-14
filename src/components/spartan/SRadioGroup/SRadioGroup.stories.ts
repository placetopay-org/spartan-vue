import SRadioGroup from './SRadioGroup.vue';
import SRadioGroupItem from './SRadioGroupItem.vue';
import type { SourceProps } from '@storybook/blocks';
import { buildDesign, buildSourceBinding } from '@/helpers';

export default {
    component: SRadioGroup,
    title: 'new/RadioGroup',
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
        modelValue: 'startup',
    },
};
