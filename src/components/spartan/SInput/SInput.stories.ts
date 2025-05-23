import SInput from './SInput.vue';
import { ref } from 'vue';
import { SButton } from '@spartan';
import type { SourceProps } from '@storybook/blocks';
import { buildDesign, buildSourceBinding, createVariation } from '@/helpers';
import { InformationCircleIcon, CurrencyDollarIcon, MapPinIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { EnvelopeIcon, KeyIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/vue/24/solid';

export default {
    component: SInput,
    title: 'inputs/Input',
    parameters: {
        docs: {
            description: {
                component: 'Input component with slots for icons, prefix, suffix, and other content.',
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
        left: {
            control: { type: null },
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content to be displayed on the left side of the input.',
        },
        right: {
            control: { type: null },
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content to be displayed on the right side of the input.',
        },

        // Props
        class: {
            control: { type: null },
            table: { type: { summary: null } },
            description: 'The class to apply to the input container.',
        },
        inputClass: {
            control: { type: null },
            table: { type: { summary: null } },
            description: 'The class to apply to the input element.',
        },
        disabled: {
            description: 'The disabled state of the input.',
            table: { type: { summary: 'boolean' } },
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
            description: `A Vue functional component to be used as the left side input's icon.`,
            table: { type: { summary: 'FunctionalComponent' } },
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
            description: `A Vue functional component to be used as the right side input's icon.`,
            table: { type: { summary: 'FunctionalComponent' } },
        },
        error: {
            description: 'The error state of the input.',
            table: { type: { summary: 'boolean' } },
        },
        borderless: {
            description: 'The borderless mode of the input.',
            table: { type: { summary: 'boolean' } },
        },
        id: {
            control: 'text',
            description: 'The id of the input element.',
            table: { type: { summary: 'string' } },
        },
        modelValue: {
            control: { type: null },
            description: 'The value of the input.',
            table: { type: { summary: 'Ref<string>' } },
        },
        leftOptions: {
            control: { type: 'object' },
            description: 'The options to be displayed in the dropdown on the left side of the input.',
            table: { type: { summary: '{ label: string, value: string }[]' } },
        },
        rightOptions: {
            control: { type: 'object' },
            description: 'The options to be displayed in the dropdown on the right side of the input.',
            table: { type: { summary: '{ label: string, value: string }[]' } },
        },
        leftOrderSlots: {
            control: 'text',
            description: 'The order of the slots on the left side of the input.',
            table: { type: { summary: 'string' } },
        },
        rightOrderSlots: {
            control: 'text',
            description: 'The order of the slots on the right side of the input.',
            table: { type: { summary: 'string' } },
        },
        name: {
            control: 'text',
            description: 'The name of the input element.',
            table: { type: { summary: 'string' } },
        },
        rounded: {
            control: 'inline-radio',
            options: ['left', 'right', 'both', 'none'],
            description: `Specifies which corners should be rounded.`,
            table: { type: { summary: 'left | right | both | none | full' } },
        },
        placeholder: {
            control: 'text',
            description: 'The placeholder of the input.',
            table: { type: { summary: 'string' } },
        },
        prefix: {
            control: 'text',
            description: 'The text to be displayed before the input value.',
            table: { type: { summary: 'string' } },
        },
        suffix: {
            control: 'text',
            description: 'The text to be displayed after the input value.',
            table: { type: { summary: 'string' } },
        },
        type: {
            control: 'text',
            description: 'The type of the input element.',
            table: { type: { summary: 'string' } },
        },
    },
};

const design = buildDesign('');

const sourceBinding = buildSourceBinding({
    prop: {
        rounded: 'both',
        id: undefined,
        name: undefined,
        placeholder: undefined,
        prefix: undefined,
        suffix: undefined,
        type: 'text',
    },
    check: ['disabled', 'error'],
    custom: { icon: true },
});

export const Default = {
    render: (args: any) => ({
        components: {
            SInput,
            EnvelopeIcon,
            MagnifyingGlassIcon,
            MapPinIcon,
            InformationCircleIcon,
            CurrencyDollarIcon,
            ChatBubbleLeftEllipsisIcon,
        },
        setup() {
            const value = ref('');
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
                args,
                getIcon,
                value,
                EnvelopeIcon,
                MagnifyingGlassIcon,
                MapPinIcon,
                InformationCircleIcon,
                CurrencyDollarIcon,
                ChatBubbleLeftEllipsisIcon,
            };
        },
        template: `<SInput v-bind="args" :leftIcon="getIcon(args.leftIcon)" :rightIcon="getIcon(args.rightIcon)" />`,
    }),
    parameters: {
        design,
        docs: {
            canvas: { layout: 'centered' },
            source: {
                transform: ((_, storyContext) => `
        <SInput ${sourceBinding(storyContext.args)} />
        `) as SourceProps['transform'],
                type: 'dynamic',
                language: 'html',
            },
        },
    },
    args: {
        disabled: false,
        leftOption: 'PHP',
        leftOptions: [
            {
                label: 'COP',
                value: 'COP',
            },
            {
                label: 'USD',
                value: 'USD',
            },
            {
                label: 'EUR',
                value: 'EUR',
            },
            {
                label: 'JPY',
                value: 'JPY',
            },
            {
                label: 'PHP',
                value: 'PHP',
            },
        ],
        rightOption: 'COP',
        rightOptions: [
            {
                label: 'COP',
                value: 'COP',
            },
            {
                label: 'USD',
                value: 'USD',
            },
            {
                label: 'EUR',
                value: 'EUR',
            },
            {
                label: 'JPY',
                value: 'JPY',
            },
            {
                label: 'PHP',
                value: 'PHP',
            },
        ],
        error: false,
        id: 'test-id',
        name: 'test-name',
        leftOrderSlots: 'selector,text,icon',
        rightOrderSlots: 'icon,text,selector',
        placeholder: 'Placeholder',
        prefix: '',
        suffix: '',
        rounded: 'both',
        type: 'text',
        borderless: false,
    },
};

export const Base = createVariation({
    components: { SInput },
    template: `<SInput />`,
    containerClass: 'w-52',
});

export const Borderless = createVariation({
    components: { SInput },
    template: `
<!-- The borderless using prop -->
<SInput borderless class="bg-[#f8f8f8]" inputClass="bg-[#f8f8f8]" value="borderless(props)" />

<!-- The borderless using classes -->
<SInput class="border-0 focus-within:!ring-0 bg-[#f8f8f8]" inputClass="bg-[#f8f8f8]" value="borderless(classes)" />
`,
    containerClass: 'w-52',
});

export const Disabled = createVariation({
    components: { SInput },
    template: `<SInput disabled placeholder="placeholder" />`,
    containerClass: 'w-52',
});

export const Error = createVariation({
    components: { SInput },
    template: `<SInput error placeholder="placeholder" />`,
    containerClass: 'w-52',
});

export const Rounded = createVariation({
    components: { SInput },
    template: `
    <SInput placeholder="both (default)" />
    <SInput rounded="left" placeholder="left" />
    <SInput rounded="none" placeholder="none" />
    <SInput rounded="right" placeholder="right" />
    `,
});

export const WithLeftIcon = createVariation({
    components: { SInput },
    setup: () => {
        return { EnvelopeIcon, KeyIcon, InformationCircleIcon };
    },
    template: `
    <SInput :leftIcon="EnvelopeIcon" placeholder="Email" />
    <SInput :leftIcon="KeyIcon" placeholder="Password" />
    <SInput :leftIcon="InformationCircleIcon" />
    `,
});

export const WithRightIcon = createVariation({
    components: { SInput },
    setup: () => {
        return { ChatBubbleLeftEllipsisIcon, CurrencyDollarIcon, MapPinIcon };
    },
    template: `
    <SInput :rightIcon="ChatBubbleLeftEllipsisIcon" placeholder="Comment" />
    <SInput :rightIcon="CurrencyDollarIcon" placeholder="Amount" />
    <SInput :rightIcon="MapPinIcon" placeholder="Location" />
    `,
});

export const WithPrefix = createVariation({
    components: { SInput },
    template: `
    <SInput prefix="$" type="number" placeholder="100.000" />
    <SInput prefix="https://" />
    <SInput prefix="name" />
    `,
});

export const WithSuffix = createVariation({
    components: { SInput },
    template: `
    <SInput suffix=".com" />
    <SInput suffix="USD" />
    <SInput suffix="optional" />
    `,
});

export const WithOptionsEmbedded = createVariation({
    components: { SInput },
    setup: () => {
        const currencies = [
            { label: 'COP', value: 'COP' },
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'JPY', value: 'JPY' },
        ];
        const leftOption = ref('USD');
        const rightOption = ref('COP');

        return { leftOption, rightOption, currencies };
    },
    template: `
<SInput v-model:leftOption="leftOption" :leftOptions="currencies" />
    
<SInput v-model:rightOption="rightOption" :rightOptions="currencies" />
    `,
    containerClass: 'w-[700px] gap-5 flex',
});

export const OrderPrecastSlots = createVariation({
    components: { SInput },
    setup: () => {
        return { MapPinIcon, InformationCircleIcon };
    },
    template: `
        <SInput :rightIcon="MapPinIcon" :leftIcon="InformationCircleIcon" prefix="Set" placeholder="Location" suffix="help" />
        
        <SInput :icrightIconon="MapPinIcon" :leftIcon="InformationCircleIcon" prefix="Set" placeholder="Location" suffix="help" leftOrderSlots="icon,text" rightOrderSlots="text,icon" />
        `,
    containerClass: 'w-[700px] flex gap-5',
});

export const PrecastAndCustomSlots = createVariation({
    components: { SInput, SButton },
    setup: () => {
        return { MapPinIcon, InformationCircleIcon };
    },
    template: `
        <SInput :icon="MapPinIcon" :endIcon="InformationCircleIcon" prefix="Set" placeholder="Location" suffix="help" leftOrderSlots="slot,icon,text">
            <template #left>
                <div class="flex items-center">
                    <span class="font-bold">Required</span>
                </div>
            </template>
        
            <template #right>
                <SButton rounded="none" class="-m-px">Send</SButton>
            </template>
        </SInput>
        `,
    containerClass: 'w-[700px] flex gap-5',
});
