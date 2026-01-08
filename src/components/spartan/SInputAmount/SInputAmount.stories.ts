import { ref } from 'vue';
import SInputAmount from './SInputAmount.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

const currencies = ['USD', 'EUR', 'COP', 'JPY', 'BHD'];

export default {
    component: SInputAmount,
    title: 'inputs/InputAmount',
    parameters: {
        docs: {
            description: {
                component: 'A useful input to handle amounts.',
            },
        },
    },
    argTypes: {
        // Props
        currency: {
            control: 'select',
            options: currencies,
            description: 'The currency to handle the amount.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
        symbol: {
            control: 'boolean',
            description: 'Whether to display the currency symbol.',
            table: { type: { summary: 'boolean' }, category: 'Props' },
        },
        suffixCurrency: {
            control: 'boolean',
            description: 'Whether to display the currency after the input.',
            table: { type: { summary: 'boolean' }, category: 'Props' },
        },
        currencies: {
            control: 'array',
            description: 'The list of currencies to be displayed in the selector.',
            table: { type: { summary: 'string[]' }, category: 'Props' },
        },
        minorUnitMode: {
            control: 'boolean',
            description: 'Whether to display the amount in minor unit mode.',
            table: { type: { summary: 'boolean' }, category: 'Props' },
        },

        // Events
        'update:modelValue': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'The event emitted when the input value changes.',
        },
        'update:currency': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'The event emitted when the currency changes.',
        },
        change: {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'The event emitted when the input value changes.',
        },
        info: {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'The event emitted when the currency changes.',
        },
    },
};

const sourceBinding = buildSourceBinding({
    check: ['symbol', 'suffixCurrency'],
});

export const Default = createDefault({
    components: { SInputAmount },
    args: {
        currency: 'USD',
        symbol: false,
        suffixCurrency: false,
        currencies,
        minorUnitMode: false,
    },
    setup: () => {
        const value = ref(22.99);
        const currency = ref('USD');

        return { value, currency, currencies };
    },
    template: `<SInputAmount :symbol="args.symbol" :minorUnitMode="args.minorUnitMode" :suffixCurrency="args.suffixCurrency" :currencies="args.currencies" v-model:currency="currency" v-model="value" @info="console.log" />`,
    transform: (args) =>
        `<SInputAmount ${sourceBinding(args)}  v-model=value v-model:currency="currency" :currencies="currencies" />`,
});

export const Base = createVariation({
    components: { SInputAmount },
    containerClass: 'flex w-[200px]',
    setup: () => {
        const value = ref(22.99);
        const currency = ref('USD');

        return { value, currency };
    },
    template: `<!-- currency: USD -->
<SInputAmount v-model="value" v-model:currency="currency"/>`,
});

export const MinorUnitMode = createVariation({
    components: { SInputAmount },
    containerClass: 'flex flex-col gap-2',
    setup: () => {
        const value = ref(22.99);
        const valueMinor = ref(1234);
        const currency = ref('USD');

        return { value, valueMinor, currency };
    },
    template: `<!-- currency: USD -->
<div class="flex items-center gap-2">
    <div class="flex w-[200px]">
        <SInputAmount v-model="valueMinor" currency="USD" minorUnitMode suffixCurrency />
    </div>
    <span>Model value (minor unit mode): {{valueMinor}}</span>
</div>

<div class="flex items-center gap-2">
    <div class="flex w-[200px]">
        <SInputAmount v-model="value" v-model:currency="currency" suffixCurrency />
    </div>
    <span>Model value: {{value}}</span>
</div>`,
});

export const WithSuffix = createVariation({
    components: { SInputAmount },
    containerClass: 'flex w-[200px]',
    setup: () => {
        const value = ref(22.99);
        const currency = ref('USD');

        return { value, currency };
    },
    template: `<!-- currency: USD -->
<SInputAmount v-model="value" v-model:currency="currency" suffixCurrency />`,
});

export const WithSymbol = createVariation({
    components: { SInputAmount },
    containerClass: 'flex w-[200px]',
    setup: () => {
        const value = ref(22.99);
        const currency = ref('USD');

        return { value, currency };
    },
    template: `<!-- currency: USD -->
<SInputAmount v-model="value" v-model:currency="currency" symbol />`,
});

export const WithSelector = createVariation({
    components: { SInputAmount },
    containerClass: 'flex w-[200px]',
    setup: () => {
        const value = ref(22.99);
        const currency = ref('USD');

        return { value, currency };
    },
    template: `<SInputAmount v-model="value" v-model:currency="currency" :currencies="['USD', 'EUR', 'JPY']" />`,
});

export const Customize = createVariation({
    components: { SInputAmount },
    containerClass: 'flex w-[200px]',
    setup: () => {
        const value = ref(22.99);
        const currency = ref('USD');

        return { value, currency };
    },
    template: `<SInputAmount v-model="value" v-model:currency="currency" symbol :currencies="['USD', 'EUR', 'JPY']" />`,
});
