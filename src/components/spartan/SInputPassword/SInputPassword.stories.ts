import { ref } from 'vue';
import SInputPassword from './SInputPassword.vue';
import SInputPasswordPanel from './SInputPasswordPanel.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

const currencies = ['USD', 'EUR', 'COP', 'JPY', 'BHD'];

export default {
    component: SInputPassword,
    title: 'inputs/InputPassword',
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
    components: { SInputPassword },
    args: {
    },
    template: `<SInputPassword v-model="value" />`,
    transform: (args) => `<SInputPassword ${sourceBinding(args)} v-model=value />`,
});

export const Base = createVariation({
    components: { SInputPassword },
    containerClass: 'flex w-[320px]',
    template: `<SInputPassword v-model="value"/>`,
});

export const Rules = createVariation({
    components: { SInputPassword },
    containerClass: 'flex flex-col w-[320px]',
    setup: () => {
        const value = ref('');
        const state = ref();
        const isValid = ref();

        const rules = ref({
            min: 3,
            max: 4,
        });

        return { value, rules, state, isValid };
    },
    template: `<!-- rules: { min: 3, max: 4 } -->
<SInputPassword v-model="value" :rules="rules" @state="e => state = e" @isValid="e => isValid = e" />
<pre>isValid: {{ isValid }}</pre>
<pre>state: {{ state }}</pre>`,
});

export const FeedbackPanel = createVariation({
    components: { SInputPassword, SInputPasswordPanel },
    containerClass: 'flex flex-col w-[340px]',
    setup: () => {
        const value = ref();
        const state = ref();
        const isValid = ref();

        const rules = ref({
            min: 6,
            max: 12,
            lowercase: true,
            uppercase: true,
            digit: true,
            special: true,
        });

        return { value, rules, state, isValid };
    },
    template: `<!-- rules: {
    min: 6,
    max: 12,
    lowercase: true,
    uppercase: true,
    digit: true,
    special: true,
} -->
<SInputPassword v-model="value" :rules="rules" @state="e => state = e" />
<SInputPasswordPanel class="mt-6" :state="state" />`,
});

export const FeedbackPanelWithAccordion = createVariation({
    components: { SInputPassword, SInputPasswordPanel },
    containerClass: 'flex flex-col w-[340px]',
    setup: () => {
        const value = ref();
        const state = ref();
        const isValid = ref();
        const isFocused = ref(false);

        const rules = ref({
            min: 6,
            max: 12,
            lowercase: true,
            uppercase: true,
            digit: true,
            special: true,
        });

        return { value, rules, state, isValid, isFocused };
    },
    template: `<!-- rules: {
    min: 6,
    max: 12,
    lowercase: true,
    uppercase: true,
    digit: true,
    special: true,
} -->
<SInputPassword v-model="value" :rules="rules" @state="e => state = e" @focus="isFocused = true" @blur="isFocused = false"  />
<SInputPasswordPanel class="mt-6" :state="state" :open="isFocused" />`,
});