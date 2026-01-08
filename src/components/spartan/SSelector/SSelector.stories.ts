import SSelector from './SSelector.vue';
import { SButton } from '@spartan';
import { createVariation } from '@/helpers';
import { ref, watch } from 'vue';
import { FlagIcon } from '@placetopay/flagicons-vue';

export default {
    component: SSelector,
    title: 'inputs/Selector',
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
        flipOptions: {
            description: 'Whether the options should be flipped.',
            table: { type: { summary: 'boolean' } },
        },
        displayButtonText: {
            control: { type: null },
            description: 'The function to display the button text.',
            table: { type: { summary: '(option) => string' } },
        },
    },
};

// const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=184-3842');

// const sourceBinding = buildSourceBinding({
//     prop: { rounded: 'both', errorText: undefined, helpText: undefined },
//     check: ['disabled', 'error'],
// });

// const options = [
//     { name: '🪪 Cédula de ciudadanía', value: 'CC' },
//     { name: '🪪 Cédula de extranjería', value: 'CE' },
//     { name: '🪪 Tarjeta de identidad', value: 'TI' },
//     { name: '🪪 NIT', value: 'NIT' },
//     { name: '🪪 Social Security Number', value: 'SSN' },
//     { name: '🪪 Individual Taxpayer Identification Number', value: 'ITIN' },
//     { name: '🪪 Employer Identification Number', value: 'EIN' },
//     { name: '🪪 National Insurance Number', value: 'NINO' },
//     { name: '🪪 Unique Taxpayer Reference', value: 'UTR' },
//     { name: '🪪 Pasaporte', value: 'PA' },
//     { name: '🪪 Registro civil', value: 'RC' },
// ];

const countries = ref([
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' },
]);

const manyCities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
    { name: 'Berlin', code: 'BER' },
    { name: 'Frankfurt', code: 'FRF' },
    { name: 'Hamburg', code: 'HMB' },
    { name: 'Munich', code: 'MUN' },
    { name: 'Chicago', code: 'CHI' },
    { name: 'Los Angeles', code: 'LAX' },
    { name: 'New York', code: 'NYC' },
    { name: 'San Francisco', code: 'SFO' },
    { name: 'Kyoto', code: 'KYO' },
    { name: 'Osaka', code: 'OSA' },
    { name: 'Tokyo', code: 'TYO' },
    { name: 'Yokohama', code: 'YOK' },
]);

const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
]);

const groupedCities = ref([
    {
        label: 'Germany',
        code: 'DE',
        items: [
            { name: 'Berlin', value: 'Berlin' },
            { name: 'Frankfurt', value: 'Frankfurt' },
            { name: 'Hamburg', value: 'Hamburg' },
            { name: 'Munich', value: 'Munich' },
        ],
    },
    {
        label: 'USA',
        code: 'US',
        items: [
            { name: 'Chicago', value: 'Chicago' },
            { name: 'Los Angeles', value: 'Los Angeles' },
            { name: 'New York', value: 'New York' },
            { name: 'San Francisco', value: 'San Francisco' },
        ],
    },
    {
        label: 'Japan',
        code: 'JP',
        items: [
            { name: 'Kyoto', value: 'Kyoto' },
            { name: 'Osaka', value: 'Osaka' },
            { name: 'Tokyo', value: 'Tokyo' },
            { name: 'Yokohama', value: 'Yokohama' },
        ],
    },
]);

export const Default = createVariation({
    components: { SSelector },
    containerClass: 'flex gap-4',
    setup: () => {
        const value = ref();

        return { value, cities };
    },
    template: `
<!-- cities: [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
] -->
<SSelector v-model="value" :options="cities" optionLabel="name" placeholder="Select a City" class="w-80" />`,
});

export const Base = createVariation({
    components: { SSelector, SButton },
    containerClass: 'flex gap-4',
    setup: () => {
        const value = ref();
        const clear = () => (value.value = null);

        return { value, cities, clear };
    },
    template: `
<!-- cities: [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
] -->
<SSelector v-model="value" :options="cities" optionLabel="name" placeholder="Select a City" class="w-80" />`,
});

export const Clearable = createVariation({
    components: { SSelector, SButton },
    containerClass: 'flex gap-4',
    setup: () => {
        const value = ref();
        const clear = () => (value.value = null);

        return { value, cities, clear };
    },
    template: `
<!-- cities: [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
] -->
<SSelector v-model="value" :options="cities" optionLabel="name" placeholder="Select a City" class="w-80" clearable />`,
});

export const Groups = createVariation({
    components: { SSelector, SButton },
    containerClass: 'flex gap-4',
    setup: () => {
        const value = ref();
        const clear = () => (value.value = null);

        return { value, groupedCities, clear };
    },
    template: `
<!-- groupedCities: [
    {
        label: 'Germany',
        code: 'DE',
        items: [
            { name: 'Berlin', value: 'Berlin' },
            { name: 'Frankfurt', value: 'Frankfurt' },
            { name: 'Hamburg', value: 'Hamburg' },
            { name: 'Munich', value: 'Munich' }
        ]
    },
    {
        label: 'USA',
        code: 'US',
        items: [
            { name: 'Chicago', value: 'Chicago' },
            { name: 'Los Angeles', value: 'Los Angeles' },
            { name: 'New York', value: 'New York' },
            { name: 'San Francisco', value: 'San Francisco' }
        ]
    },
    {
        label: 'Japan',
        code: 'JP',
        items: [
            { name: 'Kyoto', value: 'Kyoto' },
            { name: 'Osaka', value: 'Osaka' },
            { name: 'Tokyo', value: 'Tokyo' },
            { name: 'Yokohama', value: 'Yokohama' }
        ]
    }
] -->
<SSelector v-model="value" :options="groupedCities" optionLabel="name" optionGroupLabel="label" optionGroupItems="items" placeholder="Select a City" class="w-80" />`,
});

export const Disabled = createVariation({
    components: { SSelector, SButton },
    containerClass: 'flex gap-4',
    setup: () => {
        const value = ref();
        const clear = () => (value.value = null);

        return { value, cities, clear };
    },
    template: `<SSelector v-model="value" disabled :options="cities" optionLabel="name" placeholder="Select a City" class="w-80" />`,
});

export const DisabledOption = createVariation({
    components: { SSelector, SButton },
    containerClass: 'flex gap-4',
    setup: () => {
        const value = ref();
        const clear = () => (value.value = null);
        const citiesWithDisabled = ref([
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM', disabled: true },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST', disabled: true },
            { name: 'Paris', code: 'PRS' },
        ]);

        return { value, citiesWithDisabled, clear };
    },
    template: `
<!-- citiesWithDisabled: [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM', disabled: true },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST', disabled: true },
    { name: 'Paris', code: 'PRS' },
] -->
<SSelector v-model="value" :options="citiesWithDisabled" optionLabel="name" placeholder="Select a City" class="w-80" />`,
});

export const Template = createVariation({
    components: { SSelector, SButton, FlagIcon },
    containerClass: 'flex gap-4',
    setup: () => {
        const value = ref();
        const clear = () => (value.value = null);

        return { value, countries, clear };
    },
    template: `
<!-- import { FlagIcon } from '@placetopay/flagicons-vue'; 
countries: [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
] -->
<SSelector v-model="value" :options="countries" optionLabel="name" placeholder="Select a City" class="w-80">
<template #option="{ option }">
    <div class="flex items-center gap-2.5">
        <FlagIcon :flag="option?.code" size="S" />
        <span>{{ option?.name }}</span>
    </div>
</template>
</SSelector>`,
});

export const Search = createVariation({
    components: { SSelector, SButton },
    containerClass: 'flex gap-4',
    setup: () => {
        const value = ref();
        const query = ref('');
        const computedCities = ref(manyCities.value);
        const isLoading = ref(false);

        const updateQuery = (q: string) => (query.value = q);

        watch(query, () => {
            if (query.value === '') {
                computedCities.value = manyCities.value;
                return;
            }

            isLoading.value = true;
            setTimeout(() => {
                computedCities.value = manyCities.value.filter((city) =>
                    city.name.toLowerCase().includes(query.value.toLowerCase()),
                );
                isLoading.value = false;
            }, 500);
        });

        return { value, computedCities, query, updateQuery, isLoading };
    },
    template: `
    <!-- manyCities: [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
    { name: 'Berlin', code: 'BER' },
    { name: 'Frankfurt', code: 'FRF' },
    { name: 'Hamburg', code: 'HMB' },
    { name: 'Munich', code: 'MUN' },
    { name: 'Chicago', code: 'CHI' },
    { name: 'Los Angeles', code: 'LAX' },
    { name: 'New York', code: 'NYC' },
    { name: 'San Francisco', code: 'SFO' },
    { name: 'Kyoto', code: 'KYO' },
    { name: 'Osaka', code: 'OSA' },
    { name: 'Tokyo', code: 'TYO' },
    { name: 'Yokohama', code: 'YOK' },
]     
-->
<SSelector v-model="value" search :loading="isLoading" :options="computedCities" optionLabel="name" placeholder="Select a City" class="w-80" @query="updateQuery" />

<p>Query: <span>{{ query }}</span></p>`,
});

export const SearchClearable = createVariation({
    components: { SSelector, SButton },
    containerClass: 'flex gap-4',
    setup: () => {
        const value = ref();
        const query = ref('');
        const computedCities = ref(cities.value);
        const isLoading = ref(false);

        const updateQuery = (q: string) => (query.value = q);

        watch(query, () => {
            if (query.value === '') {
                computedCities.value = cities.value;
                return;
            }

            isLoading.value = true;
            setTimeout(() => {
                computedCities.value = cities.value.filter((city) =>
                    city.name.toLowerCase().includes(query.value.toLowerCase()),
                );
                isLoading.value = false;
            }, 500);
        });

        return { value, computedCities, query, updateQuery, isLoading };
    },
    template: `
<!-- cities: [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
] 
computedCities: cities.value.filter(city => city.name.toLowerCase().includes(query.value.toLowerCase()));    
-->
<SSelector v-model="value" search clearable :loading="isLoading" :options="computedCities" optionLabel="name" placeholder="Select a City" class="w-80" @query="updateQuery" />

<p>Query: <span>{{ query }}</span></p>`,
});
