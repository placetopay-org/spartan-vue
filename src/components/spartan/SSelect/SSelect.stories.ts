import SSelect from './SSelect.vue';
import type { SourceProps } from '@storybook/blocks';
import { buildDesign, buildSourceBinding } from '@/helpers';
import { ref } from 'vue';

export default {
    component: SSelect,
    title: 'inputs/Select',
    parameters: {
        docs: {
            description: {
                component: 'The select component is used to create a dropdown list of options.',
            },
        },
    },
    argTypes: {
        // Events
        'update:modelValue': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'The event emitted when the input value changes.',
        },

        // Slots
        default: {
            control: { type: null },
            description: 'The content to be rendered inside the select.',
            table: { type: { summary: 'VNode | VNode Array' } },
        },

        // Props
        disabled: {
            description: 'Whether the select is disabled.',
            table: { type: { summary: 'boolean' } },
        },
        error: {
            description: 'Whether the select has an error.',
            table: { type: { summary: 'boolean' } },
        },
        id: {
            control: { type: 'text' },
            description: 'The id of the select.',
            table: { type: { summary: 'string' } },
        },
        modelValue: {
            control: { type: null },
            description: 'The value of the select.',
            table: { type: { summary: 'Ref<string>' } },
        },
        name: {
            control: { type: 'text' },
            description: 'The name of the select.',
            table: { type: { summary: 'string' } },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'The placeholder of the select.',
            table: { type: { summary: 'string' } },
        },
        rounded: {
            control: 'inline-radio',
            options: ['left', 'right', 'both', 'none'],
            description: `Specifies which corners should be rounded.`,
            table: { type: { summary: 'left | right | both | none | full' } },
        },
    },
};

const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=184-3842');

const sourceBinding = buildSourceBinding({});

export const Default = {
    decorators: [
        () => ({
            template: '<div style="gap: 20px; display: flex;"><story/></div>',
        }),
    ],
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
        modelValue: undefined,
        name: 'payment_method',
        placeholder: 'Select an option',
        rounded: 'both',
    },
};

const createVariation = (template: string, placeholder?: boolean) => ({
    decorators: [
        () => ({
            template: '<div style="gap: 20px; display: flex; max-width: 200px"><story/></div>',
        }),
    ],
    render: () => ({
        components: { SSelect },
        template,
        setup() {
            const value = ref(placeholder ? undefined : 'option');
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
    true,
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
`,
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
`,
);
