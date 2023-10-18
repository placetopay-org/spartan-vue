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
                component:
                    'The combobox component is a select with more features. Custom design and search are supported.',
            },
        },
    },
    argTypes: {
        // Events
        'update:modelValue': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'The event emitted when the combobox value changes.',
        },
        query: {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'The event emitted when the combobox query changes.',
        },

        // Slots
        default: {
            control: { type: null },
            description: 'The content to be rendered inside the combobox.',
            table: { type: { summary: 'VNode | VNode Array' } },
        },
        button: {
            control: { type: null },
            description: 'The content to be rendered inside the combobox button.',
            table: { type: { summary: 'VNode | VNode Array' } },
        },
        label: {
            control: { type: null },
            description: '-',
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
        modelValue: {
            control: { type: null },
            description: 'The value of the select.',
            table: { type: { summary: 'Ref<string>' } },
        },
        rounded: {
            control: 'inline-radio',
            options: ['left', 'right', 'both', 'none'],
            description: `Specifies which corners should be rounded.`,
            table: { type: { summary: 'left | right | both | none | full' } },
        },
        search: {
            control: 'select',
            options: ['false', 'true', 'auto'],
            description: 'Whether the select should be searchable.',
            table: { type: { summary: "boolean | 'auto'" } },
        },
        displayButtonText: {
            control: { type: null },
            description: 'The function to display the button text.',
            table: { type: { summary: '(option) => string' } },
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
        rounded: 'both',
        modelValue: undefined,
        search: 'false',
        displayButtonText: (item: any) => item,
    },
    setup: () => {
        const value = ref();
        const getSearchProp = (search: 'false' | 'true' | 'auto') => (search === 'false' ? false : search);
        return { value, getSearchProp, options: currencyOptions[0].options };
    },
    template: `<SCombobox class="w-24" v-bind="{...args, search: getSearchProp(args.search)}" v-model="value">
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
</SCombobox>`,
    transform: (args) => `<SCombobox ${sourceBinding(args)} ${
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
</SCombobox>`,
});

const riskOptions = [
    { initial: 'H', name: 'Hight' },
    { initial: 'M', name: 'Medium' },
    { initial: 'L', name: 'Low' },
];

export const Disabled = createVariation({
    components: { SCombobox, SComboboxOption },
    setup: () => {
        const value = ref('CC');
        return { value };
    },
    template: `<SCombobox class="w-24" v-model="value" disabled initialOption :displayButtonText="item => item">
    <SComboboxOption value="CC">Cédula de ciudadanía</SComboboxOption>
    <SComboboxOption value="TI">Tarjeta de identidad</SComboboxOption>
</SCombobox>`,
    containerClass: 'w-[100px]',
});

export const Placeholder = createVariation({
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    setup: () => {
        const value = ref();
        const value2 = ref();
        return { value, value2 };
    },
    template: `<SCombobox class="w-40" v-model="value" :displayButtonText="item => item ?? 'Select an option'">
    <SComboboxOption value="" disabled>Select an option</SComboboxOption>
    <SComboboxOption value="CC">Cédula de ciudadanía</SComboboxOption>
    <SComboboxOption value="TI">Tarjeta de identidad</SComboboxOption>
</SCombobox>

<SCombobox class="w-40" v-model="value2">
    <template #button>
        <span :class="[value2 ? 'text-gray-900' : 'text-gray-500']">{{ value2 || 'Select an option' }}</span>
    </template>
    <SComboboxOption value="" disabled>Select an option</SComboboxOption>
    <SComboboxOption value="CC">Cédula de ciudadanía</SComboboxOption>
    <SComboboxOption value="TI">Tarjeta de identidad</SComboboxOption>
</SCombobox>

<SCombobox class="w-40" v-model="value2" :displayButtonText="item => item ?? '--'">
    <SComboboxOption value="CC">Cédula de ciudadanía</SComboboxOption>
    <SComboboxOption value="TI">Tarjeta de identidad</SComboboxOption>
</SCombobox>

<SCombobox class="w-40" v-model="value2">
    <template #button>{{ value2 || '--' }}</template>
    <SComboboxOption value="CC">Cédula de ciudadanía</SComboboxOption>
    <SComboboxOption value="TI">Tarjeta de identidad</SComboboxOption>
</SCombobox>`,
    containerClass: 'grid grid-cols-4 gap-2 h-[100px]',
});

export const Error = createVariation({
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    setup: () => {
        const value = ref('CC');
        return { value };
    },
    template: `<SCombobox error class="w-24" v-model="value" :displayButtonText="item => item">
    <SComboboxOption value="CC">Cédula de ciudadanía</SComboboxOption>
    <SComboboxOption value="TI">Tarjeta de identidad</SComboboxOption>
</SCombobox>`,
    containerClass: 'h-[100px]',
});

export const CustomButtonTextWithProp = createVariation({
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    setup: () => {
        const value = ref(riskOptions[0]);
        return { value, options: riskOptions };
    },
    template: `<SCombobox class="w-40" v-model="value" :displayButtonText="item => item && \`\${item.initial} - (\${item.name})\`">
    <SComboboxOption :value="options[0]">Hight risk</SComboboxOption>
    <SComboboxOption :value="options[1]">Medium risk</SComboboxOption>
    <SComboboxOption :value="options[2]">Low risk</SComboboxOption>
</SCombobox>`,
    containerClass: 'w-[300px] h-[150px]',
});

export const CustomButtonContentWithSlot = createVariation({
    components: { SCombobox, SComboboxOption, SComboboxOptionGroup },
    setup: () => {
        const value = ref(riskOptions[0]);
        return { value, options: riskOptions };
    },
    template: `<SCombobox class="w-40" v-model="value">
    <template #button>
        <span class="font-bold text-red-500">{{ value.initial }}</span> - {{ value.name }}
    </template>

    <SComboboxOption :value="options[0]">Hight risk</SComboboxOption>
    <SComboboxOption :value="options[1]">Medium risk</SComboboxOption>
    <SComboboxOption :value="options[2]">Low risk</SComboboxOption>
</SCombobox>`,
    containerClass: 'w-[300px] h-[150px]',
});

export const WithSearch = createVariation({
    components: { SCombobox, SComboboxOption },
    setup: () => {
        const value = ref(riskOptions[0]);
        const query = ref('');
        return { value, query, options: riskOptions };
    },
    template: `<SCombobox class="w-40" v-model="value" search @query="value => query = value" :displayButtonText="item => item && item.name">
    <SComboboxOption :value="options[0]">Hight risk</SComboboxOption>
    <SComboboxOption :value="options[1]">Medium risk</SComboboxOption>
    <SComboboxOption :value="options[2]">Low risk</SComboboxOption>
</SCombobox>

<p class="mt-1"><span class="font-bold">Query:</span> {{ query }}</span>`,
    containerClass: 'w-full h-[150px] flex gap-8 items-start',
});

export const WithAutomaticSearch = createVariation({
    components: { SCombobox, SComboboxOption },
    setup: () => {
        const value = ref(riskOptions[0]);
        const query = ref('');
        return { value, query, options: riskOptions };
    },
    template: `<SCombobox class="w-40" v-model="value" search="auto" @query="value => query = value" :displayButtonText="item => item && item.name">
    <SComboboxOption :value="options[0]">Hight risk</SComboboxOption>
    <SComboboxOption :value="options[1]">Medium risk</SComboboxOption>
    <SComboboxOption :value="options[2]">Low risk</SComboboxOption>
</SCombobox>

<p class="mt-1"><span class="font-bold">Query:</span> {{ query }}</span>`,
    containerClass: 'w-full h-[150px] flex gap-8 items-start',
});
