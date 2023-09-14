import SCombobox from './SCombobox.vue';
import type { SourceProps } from '@storybook/blocks';
import { buildDesign, buildSourceBinding, createDefault } from '@/helpers';
import { ref } from 'vue';

export default {
    component: SCombobox,
    title: 'new/Combobox',
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

// const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=184-3842');

// const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    containerClass: 'h-96',
    components: { SCombobox },
    template: '<SCombobox v-bind="args" v-model="args.modelValue" />',
    args: {},
});

// export const Default = {
//     decorators: [
//         () => ({
//             template: '<div style="gap: 20px; display: flex;"><story/></div>',
//         }),
//     ],
//     render: (args: any) => ({
//         components: { SCombobox },
//         setup() {
//             return { args };
//         },
//         template: `
// <SCombobox v-bind="args" v-model="args.modelValue">
//   <SCombobox.group label="Colombia">
//     <SCombobox.option value="bogota">Bogotá</SCombobox.option>
//     <SCombobox.option value="medellin">Medellín</SCombobox.option>
//     <SCombobox.option value="cali">Cali</SCombobox.option>
//     <SCombobox.option value="barranquilla">Barranquilla</SCombobox.option>
//   </SCombobox.group>

//   <SCombobox.group label="United States">
//     <SCombobox.option value="new york">New York</SCombobox.option>
//     <SCombobox.option value="los angeles">Los Angeles</SCombobox.option>
//     <SCombobox.option value="chicago">Chicago</SCombobox.option>
//     <SCombobox.option value="houston">Houston</SCombobox.option>
//   </SCombobox.group>

//   <SCombobox.group label="United Kingdom">
//     <SCombobox.option value="london">London</SCombobox.option>
//     <SCombobox.option value="birmingham">Birmingham</SCombobox.option>
//     <SCombobox.option value="liverpool">Liverpool</SCombobox.option>
//     <SCombobox.option value="manchester">Manchester</SCombobox.option>
//   </SCombobox.group>
// </SCombobox>
// `,
//     }),
//     parameters: {
//         design,
//         docs: {
//             canvas: { layout: 'centered' },
//             source: {
//                 transform: ((_, storyContext) => `<SCombobox ${sourceBinding(storyContext.args)}>
//     <SComboboxGroup label="Colombia">
//         <SComboboxOption value="bogota">Bogotá</SComboboxOption>
//         <SComboboxOption value="medellin">Medellín</SComboboxOption>
//         <SComboboxOption value="cali">Cali</SComboboxOption>
//         <SComboboxOption value="barranquilla">Barranquilla</SComboboxOption>
//     </SComboboxGroup>

//     <SComboboxGroup label="United States">
//         <SComboboxOption value="new york">New York</SComboboxOption>
//         <SComboboxOption value="los angeles">Los Angeles</SComboboxOption>
//         <SComboboxOption value="chicago">Chicago</SComboboxOption>
//         <SComboboxOption value="houston">Houston</SComboboxOption>
//     </SComboboxGroup>

//     <SComboboxGroup label="United Kingdom">
//         <SComboboxOption value="london">London</SComboboxOption>
//         <SComboboxOption value="birmingham">Birmingham</SComboboxOption>
//         <SComboboxOption value="liverpool">Liverpool</SComboboxOption>
//         <SComboboxOption value="manchester">Manchester</SComboboxOption>
//     </SComboboxGroup>
// </SCombobox>`) as SourceProps['transform'],
//                 type: 'dynamic',
//                 language: 'html',
//             },
//         },
//     },
//     args: {
//         disabled: false,
//         error: false,
//         id: 'test-id',
//         modelValue: undefined,
//         name: 'payment_method',
//         placeholder: 'Select an option',
//         rounded: 'both',
//     },
// };

// const createVariation = (template: string, placeholder?: boolean) => ({
//     decorators: [
//         () => ({
//             template: '<div style="gap: 20px; display: flex; max-width: 200px"><story/></div>',
//         }),
//     ],
//     render: () => ({
//         components: { SCombobox },
//         template,
//         setup() {
//             const value = ref(placeholder ? undefined : 'option');
//             return { value };
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

// export const Placeholder = createVariation(
//     `
// <SCombobox v-model="value" placeholder="Select an option">
//   <SComboboxOption value="option">option</SComboboxOption>
//   <SComboboxOption value="option2">option2</SComboboxOption>
//   <SComboboxOption value="option3">option3</SComboboxOption>
//   <SComboboxOption value="option4">option4</SComboboxOption>
//   <SComboboxOption value="option5">option5</SComboboxOption>
// </SCombobox>
// `,
//     true,
// );

// export const Disabled = createVariation(
//     `
// <SCombobox v-model="value" disabled>
//   <SComboboxOption value="option">option</SComboboxOption>
//   <SComboboxOption value="option2">option2</SComboboxOption>
//   <SComboboxOption value="option3">option3</SComboboxOption>
//   <SComboboxOption value="option4">option4</SComboboxOption>
//   <SComboboxOption value="option5">option5</SComboboxOption>
// </SCombobox>
// `,
// );

// export const Error = createVariation(
//     `
// <SCombobox v-model="value" error>
//   <SComboboxOption value="option">option</SComboboxOption>
//   <SComboboxOption value="option2">option2</SComboboxOption>
//   <SComboboxOption value="option3">option3</SComboboxOption>
//   <SComboboxOption value="option4">option4</SComboboxOption>
//   <SComboboxOption value="option5">option5</SComboboxOption>
// </SCombobox>
// `,
// );
