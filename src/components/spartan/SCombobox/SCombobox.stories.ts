import SCombobox from './SCombobox.vue';
import SComboboxOption from './SComboboxOption.vue';
import SComboboxOptionGroup from './SComboboxOptionGroup.vue';
import type { SourceProps } from '@storybook/blocks';
import { buildDesign, buildSourceBinding, createDefault, createVariation } from '@/helpers';
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
        errorText: {
            description: 'The error text to be displayed.',
            table: { type: { summary: 'string' } },
        },
        helpText: {
            description: 'The help text to be displayed.',
            table: { type: { summary: 'string' } },
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
        label: {
            control: { type: 'text' },
            description: 'The label of the select.',
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

const sourceBinding = buildSourceBinding({
    prop: { rounded: 'both', errorText: undefined, helpText: undefined, placeholder: undefined },
    check: ['disabled', 'error'],
});

export const Default = createDefault({
    containerClass: 'h-96',
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    args: {
        disabled: false,
        error: false,
        errorText: '',
        helpText: '',
        label: 'Select',
        placeholder: '',
        rounded: 'both',
    },
    template: `<SCombobox class="w-24" v-bind="args" v-model="args.modelValue">
    <SComboboxOptionGroup label="Colombia">
        <SComboboxOption label="CC" value="CC"><span class="font-bold">CC</span> Cédula de ciudadanía</SComboboxOption>
        <SComboboxOption label="CE" value="CE">Cédula de extranjería</SComboboxOption>
        <SComboboxOption label="TI" value="TI">Tarjeta de identidad</SComboboxOption>
        <SComboboxOption label="NIT" value="NIT">NIT</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="United States">
        <SComboboxOption label="SSN" value="SSN">Social Security Number</SComboboxOption>
        <SComboboxOption label="ITIN" value="ITIN">Individual Taxpayer Identification Number</SComboboxOption>
        <SComboboxOption label="EIN" value="EIN">Employer Identification Number</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="United Kingdom">
        <SComboboxOption label="NINO" value="NINO">National Insurance Number</SComboboxOption>
        <SComboboxOption label="UTR" value="UTR">Unique Taxpayer Reference</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="Other">
        <SComboboxOption label="PA" value="PA">Pasaporte</SComboboxOption>
        <SComboboxOption label="RC" value="RC">Registro civil</SComboboxOption>
    </SComboboxOptionGroup>
    </SCombobox>`,
    transform: (args) => `<SCombobox ${sourceBinding(args)}>
    <SComboboxOptionGroup label="Colombia">
        <SComboboxOption label="CC" value="CC">Cédula de ciudadanía</SComboboxOption>
        <SComboboxOption label="CE" value="CE">Cédula de extranjería</SComboboxOption>
        <SComboboxOption label="TI" value="TI">Tarjeta de identidad</SComboboxOption>
        <SComboboxOption label="NIT" value="NIT">NIT</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="United States">
        <SComboboxOption label="SSN" value="SSN">Social Security Number</SComboboxOption>
        <SComboboxOption label="ITIN" value="ITIN">Individual Taxpayer Identification Number</SComboboxOption>
        <SComboboxOption label="EIN" value="EIN">Employer Identification Number</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="United Kingdom">
        <SComboboxOption label="NINO" value="NINO">National Insurance Number</SComboboxOption>
        <SComboboxOption label="UTR" value="UTR">Unique Taxpayer Reference</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="Other">
        <SComboboxOption label="PA" value="PA">Pasaporte</SComboboxOption>
        <SComboboxOption label="RC" value="RC">Registro civil</SComboboxOption>
    </SComboboxOptionGroup>
</SCombobox>`,
});

// export const Disabled = createVariation({
//     components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
//     setup: () => {
//         const value = ref('CC');

//         return { value };
//     },
//     template: `<SCombobox class="w-24" v-model="value" disabled>
//     <SComboboxOption label="CC" value="CC">Cédula de ciudadanía</SComboboxOption>
//     <SComboboxOption label="TI" value="TI">Tarjeta de identidad</SComboboxOption>
// </SCombobox>`,
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
