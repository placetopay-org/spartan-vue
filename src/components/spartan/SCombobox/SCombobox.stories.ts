import SCombobox from './SCombobox.vue';
import SComboboxOption from './SComboboxOption.vue';
import SComboboxOptionGroup from './SComboboxOptionGroup.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';
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
        searchBy: {
            control: 'select',
            options: ['label', 'value'],
            description: `A Vue functional component to be used as the right side input's icon.`,
            table: { type: { summary: 'FunctionalComponent' } },
        },
    },
};

// const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=184-3842');

const sourceBinding = buildSourceBinding({
    prop: { rounded: 'both', errorText: undefined, helpText: undefined, placeholder: undefined },
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
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    args: {
        disabled: false,
        error: false,
        errorText: '',
        helpText: '',
        label: 'Select',
        placeholder: undefined,
        rounded: 'both',
        modelValue: undefined,
        searchBy: undefined,
        displayButtonText: (item: any) => (item && item.value ? item.value : '-'),
        displayOptionText: (item: any) => `${item.value}: ${item.label}`,
        options: currencyOptions[0].options,
    },
    setup: () => {
        const value = ref();
        return { value, options: currencyOptions };
    },
    template: `
    <SCombobox class="w-24" v-bind="args" :searchBy="args.searchBy && ((option) => option[args.searchBy])" v-model="value">
    </SCombobox>`,
    transform: (args) => `<SCombobox ${sourceBinding(args)} v-model="value">
    <template #button>{{ value?.value ?? '-' }}</template>

    <SComboboxOptionGroup label="Colombia">
        <SComboboxOption value="CC">Cédula de ciudadanía</SComboboxOption>
        <SComboboxOption value="CE">Cédula de extranjería</SComboboxOption>
        <SComboboxOption value="TI">Tarjeta de identidad</SComboboxOption>
        <SComboboxOption value="NIT">NIT</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="United States">
        <SComboboxOption value="SSN">Social Security Number</SComboboxOption>
        <SComboboxOption value="ITIN">Individual Taxpayer Identification Number</SComboboxOption>
        <SComboboxOption value="EIN">Employer Identification Number</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="United Kingdom">
        <SComboboxOption value="NINO">National Insurance Number</SComboboxOption>
        <SComboboxOption value="UTR">Unique Taxpayer Reference</SComboboxOption>
    </SComboboxOptionGroup>

    <SComboboxOptionGroup label="Other">
        <SComboboxOption value="PA">Pasaporte</SComboboxOption>
        <SComboboxOption value="RC">Registro civil</SComboboxOption>
    </SComboboxOptionGroup>
</SCombobox>`,
});

const riskOptions = [
    { initial: 'H', name: 'Hight' },
    { initial: 'M', name: 'Medium' },
    { initial: 'L', name: 'Low' },
];

export const Disabled = createVariation({
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    setup: () => {
        const value = ref('CC');
        return { value };
    },
    template: `<SCombobox class="w-24" v-model="value" disabled :displayButtonText="item => item">
    <SComboboxOption value="CC">Cédula de ciudadanía</SComboboxOption>
    <SComboboxOption value="TI">Tarjeta de identidad</SComboboxOption>
</SCombobox>`,
    containerClass: 'w-[100px]',
});

export const Placeholder = createVariation({
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    setup: () => {
        const value = ref();
        return { value };
    },
    template: `<SCombobox class="w-54" v-model="value" :displayButtonText="item => item ?? 'Select an option'">
    <SComboboxOption value="" disabled>Select an option</SComboboxOption>
    <SComboboxOption value="CC">Cédula de ciudadanía</SComboboxOption>
    <SComboboxOption value="TI">Tarjeta de identidad</SComboboxOption>
</SCombobox>`,
    containerClass: 'w-[300px] h-[150px]',
});

export const Error = createVariation({
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    setup: () => {
        const value = ref();
        return { value };
    },
    template: `<SCombobox error class="w-54" v-model="value" :displayButtonText="item => item">
    <SComboboxOption value="CC">Cédula de ciudadanía</SComboboxOption>
    <SComboboxOption value="TI">Tarjeta de identidad</SComboboxOption>
</SCombobox>`,
    containerClass: 'w-[300px] h-[100px]',
});

export const CustomButtonTextWithProp = createVariation({
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    setup: () => {
        const value = ref({ initial: 'H', name: 'Hight' });
        return { value };
    },
    template: `<SCombobox class="w-54" v-model="value" :displayButtonText="item => \`\${item.initial} - (\${item.name})\`">
    <SComboboxOption :value="{ initial: 'H', name: 'Hight' }">Hight risk</SComboboxOption>
    <SComboboxOption :value="{ initial: 'M', name: 'Medium' }">Medium risk</SComboboxOption>
    <SComboboxOption :value="{ initial: 'L', name: 'Low' }">Low risk</SComboboxOption>
</SCombobox>`,
    containerClass: 'w-[300px] h-[150px]',
});

export const CustomButtonContentWithSlot = createVariation({
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    setup: () => {
        const value = ref({ initial: 'H', name: 'Hight' });
        return { value };
    },
    template: `<SCombobox class="w-54" v-model="value">
    <template #button>
        <span class="font-bold">{{ value.initial }}</span> - {{ value.name }}
    </template>

    <SComboboxOption :value="{ initial: 'H', name: 'Hight' }">Hight risk</SComboboxOption>
    <SComboboxOption :value="{ initial: 'M', name: 'Medium' }">Medium risk</SComboboxOption>
    <SComboboxOption :value="{ initial: 'L', name: 'Low' }">Low risk</SComboboxOption>
</SCombobox>`,
    containerClass: 'w-[300px] h-[150px]',
});

export const CustomOptionTextWithProp = createVariation({
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    setup: () => {
        const value = ref({ initial: 'H', name: 'Hight' });
        return { value, options: riskOptions };
    },
    template: `<SCombobox class="w-54" v-model="value" :options="options" :displayOptionText="option => \`\${option.name} risk\`">
    <template #button>
        <span class="font-bold">{{ value.initial }}</span> - {{ value.name }}
    </template>
</SCombobox>
    `,
    containerClass: 'w-[300px] h-[150px]',
});

export const CustomOptionContentWithSlot = createVariation({
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    setup: () => {
        const value = ref({ initial: 'H', name: 'Hight' });
        return { value };
    },
    template: `<SCombobox class="w-54" v-model="value">
    <template #button>
        <span class="font-bold">{{ value.initial }}</span> - {{ value.name }}
    </template>

    <SComboboxOption :value="{ initial: 'H', name: 'Hight' }"><span class="font-bold">Hight</span> risk</SComboboxOption>
    <SComboboxOption :value="{ initial: 'M', name: 'Medium' }"><span class="font-bold">Medium</span> risk</SComboboxOption>
    <SComboboxOption :value="{ initial: 'L', name: 'Low' }"><span class="font-bold">Low</span> risk</SComboboxOption>
</SCombobox>`,
    containerClass: 'w-[300px] h-[150px]',
});

export const WithoutSlots = createVariation({
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    setup: () => {
        const value = ref({ initial: 'H', name: 'Hight' });
        return { value, options: riskOptions };
    },
    template: `<SCombobox class="w-54" v-model="value" :options="options" :displayButtonText="item => \`\${item.initial} - (\${item.name})\`" :displayOptionText="option => \`\${option.name} risk\`"/>`,
    containerClass: 'w-[300px] h-[150px]',
});

export const WithSearch = createVariation({
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    setup: () => {
        const value = ref({ initial: 'H', name: 'Hight' });
        return { value, options: riskOptions };
    },
    template: `<SCombobox class="w-54" v-model="value" :searchBy="option => option.name" :options="options" :displayButtonText="item => item.name" :displayOptionText="option => option.name"/>`,
    containerClass: 'w-[300px] h-[150px]',
});
