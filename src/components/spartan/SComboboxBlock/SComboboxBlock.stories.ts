import SComboboxBlock from './SComboboxBlock.vue';
import { SComboboxOption, SComboboxOptionGroup } from '../SCombobox';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';
import { ref } from 'vue';

export default {
    component: SComboboxBlock,
    title: 'new/ComboboxBlock',
    parameters: {
        docs: {
            description: { component: 'The select component is used to create a dropdown list of options.' },
        },
    },
    argTypes: {
        // Props
        errorText: {
            control: 'text',
            description: 'The error message to be displayed when the select has an error.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
        helpText: {
            control: 'text',
            description: 'The help message to be displayed below the select.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
        label: {
            control: 'text',
            description: 'The label of the select.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
    },
};

const sourceBinding = buildSourceBinding({
    prop: {
        errorText: undefined,
        helpText: undefined,
        label: undefined,
        id: undefined,
    },
    check: ['disabled', 'error'],
});

const currencyOptions = [
    {
        label: 'Colombia',
        options: [
            { label: 'Cédula de ciudadanía', value: 'CC' },
            { label: 'Cédula de extranjería', value: 'CE' },
            { label: 'Tarjeta de identidad', value: 'TI' },
            { label: 'NIT', value: 'NIT' },
        ],
    },
    {
        label: 'United States',
        options: [
            { label: 'Social Security Number', value: 'SSN' },
            { label: 'Individual Taxpayer Identification Number', value: 'ITIN' },
            { label: 'Employer Identification Number', value: 'EIN' },
        ],
    },
];

export const Default = createDefault({
    containerClass: 'h-96',
    components: { SComboboxBlock, SComboboxOption, SComboboxOptionGroup },
    args: {
        errorText: '',
        helpText: 'Help text',
        label: 'Custom Label',
        id: 'custom-id',
    },
    setup: () => {
        const value = ref('CC');
        return { value, options: currencyOptions[0].options };
    },
    template: `<SComboboxBlock class="w-24" v-bind="args" v-model="value">
    <template #button>{{ value }}</template>
    <SComboboxOptionGroup label="Colombia">
        <SComboboxOption value="CC">🪪 Cédula de ciudadanía</SComboboxOption>
        <SComboboxOption value="CE">🪪 Cédula de extranjería</SComboboxOption>
        <SComboboxOption value="TI">🪪 Tarjeta de identidad</SComboboxOption>
        <SComboboxOption value="NIT">🪪 NIT</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="United States">
        <SComboboxOption value="SSN">🪪 Social Security Number</SComboboxOption>
        <SComboboxOption value="ITIN">🪪 Individual Taxpayer Identification Number</SComboboxOption>
        <SComboboxOption value="EIN">🪪 Employer Identification Number</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="United Kingdom">
        <SComboboxOption value="NINO">🪪 National Insurance Number</SComboboxOption>
        <SComboboxOption value="UTR">🪪 Unique Taxpayer Reference</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="Other">
        <SComboboxOption value="PA">🪪 Pasaporte</SComboboxOption>
        <SComboboxOption value="RC">🪪 Registro civil</SComboboxOption>
    </SComboboxOptionGroup>
</SComboboxBlock>`,
    transform: (args) => `<SComboboxBlock ${sourceBinding(args)} ${
        args.search === 'auto' ? 'search="auto"' : args.search === 'true' ? 'search' : ''
    } v-model="value">
    <SComboboxOptionGroup label="Colombia">
        <SComboboxOption value="CC">🪪 Cédula de ciudadanía</SComboboxOption>
        <SComboboxOption value="CE">🪪 Cédula de extranjería</SComboboxOption>
        <SComboboxOption value="TI">🪪 Tarjeta de identidad</SComboboxOption>
        <SComboboxOption value="NIT">🪪 NIT</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="United States">
        <SComboboxOption value="SSN">🪪 Social Security Number</SComboboxOption>
        <SComboboxOption value="ITIN">🪪 Individual Taxpayer Identification Number</SComboboxOption>
        <SComboboxOption value="EIN">🪪 Employer Identification Number</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="United Kingdom">
        <SComboboxOption value="NINO">🪪 National Insurance Number</SComboboxOption>
        <SComboboxOption value="UTR">🪪 Unique Taxpayer Reference</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="Other">
        <SComboboxOption value="PA">🪪 Pasaporte</SComboboxOption>
        <SComboboxOption value="RC">🪪 Registro civil</SComboboxOption>
    </SComboboxOptionGroup>
</SComboboxBlock>`,
});