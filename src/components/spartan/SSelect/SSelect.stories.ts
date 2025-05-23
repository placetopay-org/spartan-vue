import SSelect from './SSelect.vue';
import { SButton } from '@spartan';
import { createDefault, createVariation } from '@/helpers';
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

// const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    design: 'https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=184-3842',
    components: { SSelect },
    template: `
<SSelect v-bind="args" v-model="args.modelValue">
  <option value="visa">visa</option> 
  <option value="mastercard">mastercard</option> 
  <option value="american express">american express</option>
</SSelect>`,
    args: {
        disabled: false,
        error: false,
        id: 'test-id',
        modelValue: undefined,
        name: 'payment_method',
        placeholder: 'Select an option',
        rounded: 'both',
    },
});

export const Placeholder = createVariation({
    components: { SSelect, SButton },
    setup: () => {
        const value = ref();
        const reset = () => {
            value.value = '';
        };
        return { value, reset };
    },
    template: `<!-- { value: undefined } -->
<SSelect v-model="value" placeholder="Select an option">
    <option value="1">option 1</option>
    <option value="2">option 2</option>
    <option value="3">option 3</option>
</SSelect>

<SSelect v-model="value" placeholder="Select an option" pt:placeholder="text-red-500">
    <option value="1">option 1</option>
    <option value="2">option 2</option>
    <option value="3">option 3</option>
</SSelect>

<SButton @click="reset">Reset</SButton>`,
});

export const Error = createVariation({
    components: { SSelect, SButton },
    setup: () => {
        const value = ref();
        const reset = () => {
            value.value = '';
        };
        return { value, reset };
    },
    template: `<!-- { value: undefined } -->
<SSelect v-model="value" error placeholder="Select an option">
    <option value="1">option 1</option>
    <option value="2">option 2</option>
    <option value="3">option 3</option>
</SSelect>`,
});

export const Disabled = createVariation({
    components: { SSelect, SButton },
    setup: () => {
        const value = ref();
        const reset = () => {
            value.value = '';
        };
        return { value, reset };
    },
    template: `<!-- { value: undefined } -->
<SSelect v-model="value" disabled placeholder="Select an option">
    <option value="1">option 1</option>
    <option value="2">option 2</option>
    <option value="3">option 3</option>
</SSelect>`,
});

// const createVariation = (template: string, placeholder?: boolean) => ({
//     decorators: [
//         () => ({
//             template: '<div style="gap: 20px; display: flex; max-width: 200px"><story/></div>',
//         }),
//     ],
//     render: () => ({
//         components: { SSelect },
//         template,
//         setup() {
//             const value = ref(placeholder ? undefined : 'option');
//             const value1 = ref(placeholder ? undefined : 'option');
//             const value2 = ref(placeholder ? undefined : 'option');
//             const value3 = ref('');
//             return { value, value1, value2, value3 };
//         },
//     }),
//     parameters: {
//         design,
//         controls: { disable: true },
//         actions: { disable: true },
//         docs: {
//             source: {
//                 code: template,
//                 language: 'html',
//             },
//         },
//     },
// });

// export const Disabled = createVariation(
//     `
// <SSelect v-model="value" disabled>
//   <option value="option">option</option>
//   <option value="option2">option2</option>
//   <option value="option3">option3</option>
//   <option value="option4">option4</option>
//   <option value="option5">option5</option>
// </SSelect>
// `,
// );

// export const Error = createVariation(
//     `
// <SSelect v-model="value" error>
//   <option value="option">option</option>
//   <option value="option2">option2</option>
//   <option value="option3">option3</option>
//   <option value="option4">option4</option>
//   <option value="option5">option5</option>
// </SSelect>
// `,
// );
