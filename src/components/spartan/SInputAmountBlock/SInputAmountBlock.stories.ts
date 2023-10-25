import SInputAmountBlock from './SInputAmountBlock.vue';
import { ref } from 'vue';
import { SButton, SDropdown, SDropdownItem } from '@spartan';
import { buildDesign, buildSourceBinding, createDefault, createVariation as buildVariation } from '@/helpers';
import {
    ArrowLeftOnRectangleIcon,
    InformationCircleIcon,
    CurrencyDollarIcon,
    MapPinIcon,
    MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline';
import { EnvelopeIcon, KeyIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/vue/24/solid';

export default {
    component: SInputAmountBlock,
    title: 'new/InputAmountBlock',
    parameters: {
        docs: {
            description: { component: 'The input component is used to create a text input.' },
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
        left: {
            control: { type: null },
            description: 'The content to be rendered before the input.',
            table: { type: { summary: 'VNode | VNode Array' } },
        },
        right: {
            control: { type: null },
            description: 'The content to be rendered after the input.',
            table: { type: { summary: 'VNode | VNode Array' } },
        },

        // Props
        errorText: {
            control: 'text',
            description: 'The error message to be displayed when the input has an error.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
        helpText: {
            control: 'text',
            description: 'The help message to be displayed below the input.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
        label: {
            control: 'text',
            description: 'The label of the input.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },

        // Props - Input Amount
        currency: {
            control: 'select',
            options: ['USD', 'EUR', 'COP', 'CLP', 'AUD', 'JPY', 'CNY', 'CHF', 'SEK', 'NZD'],
            description: 'The currency of the input amount.',
            table: { type: { summary: 'string' }, category: 'Props', subcategory: 'Input Amount' },
        },

        // Props - Input
        disabled: {
            description: 'Whether the input is disabled.',
            table: { type: { summary: 'boolean' }, category: 'Props', subcategory: 'Input' },
        },
        leftIcon: {
            control: 'select',
            options: [
                'EnvelopeIcon',
                'MagnifyingGlassIcon',
                'MapPinIcon',
                'InformationCircleIcon',
                'CurrencyDollarIcon',
                'ChatBubbleLeftEllipsisIcon',
            ],
            description: `A Vue functional component to be used as the left icon.`,
            table: { type: { summary: 'FunctionalComponent' }, category: 'Props', subcategory: 'Input' },
        },
        rightIcon: {
            control: 'select',
            options: [
                'EnvelopeIcon',
                'MagnifyingGlassIcon',
                'MapPinIcon',
                'InformationCircleIcon',
                'CurrencyDollarIcon',
                'ChatBubbleLeftEllipsisIcon',
            ],
            description: `A Vue functional component to be used as the right icon.`,
            table: {
                type: { summary: 'FunctionalComponent' },
                category: 'Props',
                subcategory: 'Input',
            },
        },
        id: {
            control: 'text',
            description: 'The id of the input.',
            table: { type: { summary: 'string' }, category: 'Props', subcategory: 'Input' },
        },
        modelValue: {
            control: { type: null },
            description: 'The value of the input.',
            table: {
                type: { summary: 'Ref<string>' },
                category: 'Props',
                subcategory: 'Input',
            },
        },
        name: {
            control: 'text',
            description: 'The name of the input.',
            table: { type: { summary: 'string' }, category: 'Props', subcategory: 'Input' },
        },
        rounded: {
            control: 'inline-radio',
            options: ['left', 'right', 'both', 'none'],
            description: `Specifies which corners should be rounded.`,
            table: {
                type: { summary: 'left | right | both | none | full' },
                category: 'Props',
                subcategory: 'Input',
            },
        },
        placeholder: {
            control: 'text',
            description: 'The placeholder of the input.',
            table: { type: { summary: 'string' }, category: 'Props', subcategory: 'Input' },
        },
        prefix: {
            control: 'text',
            description: 'A prefix to be displayed before the input value.',
            table: { type: { summary: 'string' }, category: 'Props', subcategory: 'Input' },
        },
        suffix: {
            control: 'text',
            description: 'A suffix to be displayed after the input value.',
            table: { type: { summary: 'string' }, category: 'Props', subcategory: 'Input' },
        },
        type: {
            control: 'text',
            description: 'The type of the input.',
            table: { type: { summary: 'string' }, category: 'Props', subcategory: 'Input' },
        },
        error: {
            control: { type: 'boolean' },
            description: 'Whether the input has an error.',
            table: { type: { summary: 'boolean' }, category: 'Props', subcategory: 'Input' },
        },
    },
};

const design = buildDesign('');

const sourceBinding = buildSourceBinding({
    check: ['disabled', 'error'],
    custom: { icon: true },
    prop: {
        rounded: 'both',
        id: undefined,
        name: undefined,
        placeholder: undefined,
        prefix: undefined,
        suffix: undefined,
        type: 'text',
        label: undefined,
        errorText: undefined,
        helpText: undefined,
    },
});

export const Default = createDefault({
    design: '',
    components: {
        SInputAmountBlock,
        EnvelopeIcon,
        MagnifyingGlassIcon,
        MapPinIcon,
        InformationCircleIcon,
        CurrencyDollarIcon,
        ChatBubbleLeftEllipsisIcon,
    },
    setup: () => {
        const value = ref('');
        const currency = ref('USD');
        const getIcon = (
            icon:
                | 'EnvelopeIcon'
                | 'MagnifyingGlassIcon'
                | 'MapPinIcon'
                | 'InformationCircleIcon'
                | 'CurrencyDollarIcon'
                | 'ChatBubbleLeftEllipsisIcon',
        ) => {
            if (icon === 'EnvelopeIcon') return EnvelopeIcon;
            if (icon === 'MagnifyingGlassIcon') return MagnifyingGlassIcon;
            if (icon === 'MapPinIcon') return MapPinIcon;
            if (icon === 'InformationCircleIcon') return InformationCircleIcon;
            if (icon === 'CurrencyDollarIcon') return CurrencyDollarIcon;
            if (icon === 'ChatBubbleLeftEllipsisIcon') return ChatBubbleLeftEllipsisIcon;
        };

        return {
            getIcon,
            currency,
            value,
            EnvelopeIcon,
            MagnifyingGlassIcon,
            MapPinIcon,
            InformationCircleIcon,
            CurrencyDollarIcon,
            ChatBubbleLeftEllipsisIcon,
        };
    },
    template:
        '<SInputAmountBlock v-bind="args" v-model:currency="currency" :right-icon="getIcon(args.rightIcon)" :left-icon="getIcon(args.leftIcon)" v-model="value" />',
    transform: (args) => ` <SInputAmountBlock ${sourceBinding(args)} /> `,
    args: {
        disabled: false,
        error: undefined,
        id: 'test-id',
        modelValue: undefined,
        name: 'test-name',
        placeholder: 'Placeholder',
        rounded: 'both',
        label: 'Custom label',
        errorText: '',
        helpText: '',
        rightIcon: undefined,
        leftIcon: undefined,
        prefix: '',
        suffix: '',
        type: 'text',
    },
});

const createVariation = ({ template, ...rest }: { template: string }) =>
    buildVariation({
        template,
        components: {
            SInputAmountBlock,
            SButton,
            SDropdown,
            SDropdownItem,
            ArrowLeftOnRectangleIcon,
            EnvelopeIcon,
            KeyIcon,
            InformationCircleIcon,
            ChatBubbleLeftEllipsisIcon,
            CurrencyDollarIcon,
            MapPinIcon,
        },
        containerClass: 'w-[200px]',
        ...rest,
    });

export const WithLabel = createVariation({
    template: `<SInputAmountBlock label="Name" id="test-id" placeholder="Enter your name" />`,
});

export const WithHelpText = createVariation({
    template: `<SInputAmountBlock id="test-id" label="Token" helpText="does not include quotes" placeholder="XX-XXXX-XXXX" />`,
});

export const WithErrorText = createVariation({
    template: `<SInputAmountBlock id="test-id" label="Amount" errorText="the amount is mandatory" prefix="$" placeholder="0.00" />`,
});
