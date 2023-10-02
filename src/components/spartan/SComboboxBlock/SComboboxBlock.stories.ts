import SComboboxBlock from './SComboboxBlock.vue';
import { ref } from 'vue';
import type { SourceProps } from '@storybook/blocks';
import { buildDesign, buildSourceBinding } from '@/helpers';
import { InformationCircleIcon, CurrencyDollarIcon, MapPinIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { EnvelopeIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/vue/24/solid';

export default {
    component: SComboboxBlock,
    title: 'new/ComboboxBlock',
    parameters: {
        docs: {
            description: {
                component: 'DOC',
            },
        },
    },
    argTypes: {
        // Events
        'update:modelValue': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'DOC',
        },

        // Props
        error: {
            control: 'text',
            description: 'DOC',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
        helpText: {
            control: 'text',
            description: 'DOC',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
        label: {
            control: 'text',
            description: 'DOC',
            table: { type: { summary: 'string' }, category: 'Props' },
        },

        // Props - Input
        disabled: {
            description: 'DOC',
            table: {
                type: { summary: 'boolean' },
                category: 'Props',
                subcategory: 'Input',
            },
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
            table: {
                type: { summary: 'FunctionalComponent' },
                category: 'Props',
                subcategory: 'Input',
            },
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
            description: 'DOC',
            table: {
                type: { summary: 'string' },
                category: 'Props',
                subcategory: 'Input',
            },
        },
        modelValue: {
            control: { type: null },
            description: 'DOC',
            table: {
                type: { summary: 'Ref<string>' },
                category: 'Props',
                subcategory: 'Input',
            },
        },
        name: {
            control: 'text',
            description: 'DOC',
            table: {
                type: { summary: 'string' },
                category: 'Props',
                subcategory: 'Input',
            },
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
            description: 'DOC',
            table: {
                type: { summary: 'string' },
                category: 'Props',
                subcategory: 'Input',
            },
        },
        prefix: {
            control: 'text',
            description: 'DOC',
            table: {
                type: { summary: 'string' },
                category: 'Props',
                subcategory: 'Input',
            },
        },
        suffix: {
            control: 'text',
            description: 'DOC',
            table: {
                type: { summary: 'string' },
                category: 'Props',
                subcategory: 'Input',
            },
        },
        type: {
            control: 'text',
            description: 'DOC',
            table: {
                type: { summary: 'string' },
                category: 'Props',
                subcategory: 'Input',
            },
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
            SComboboxBlock,
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
        template: '<SComboboxBlock v-bind="args" v-model="value" />',
    }),
    parameters: {
        design,
        docs: {
            canvas: { layout: 'centered' },
            source: {
                transform: ((_, storyContext) => `
        <SComboboxBlock ${sourceBinding(storyContext.args)} />
        `) as SourceProps['transform'],
                type: 'dynamic',
                language: 'html',
            },
        },
    },
    args: {
        disabled: false,
        error: '',
        helpText: 'Help text',
        rightIcon: undefined,
        leftIcon: undefined,
        id: 'test-id',
        label: 'Label',
        name: 'test-name',
        placeholder: 'Placeholder',
        prefix: '',
        suffix: '',
        rounded: 'both',
        type: 'text',
    },
};

// const createVariation = (
//     template: string,
//     options?: {
//         focusVisible?: boolean;
//         containerClass?: string;
//     },
// ) => ({
//     decorators: [
//         () => ({
//             template: `<div style="${options?.containerClass ?? 'gap: 20px; display: flex;'}"><story/></div>`,
//         }),
//     ],
//     render: () => ({
//         components: {
//             SComboboxBlock,
//             SButton,
//             SDropdown,
//             SDropdownItem,
//             ArrowLeftOnRectangleIcon,
//             EnvelopeIcon,
//             KeyIcon,
//             InformationCircleIcon,
//             ChatBubbleLeftEllipsisIcon,
//             CurrencyDollarIcon,
//             MapPinIcon,
//         },
//         setup() {
//             const email = ref('');

//             return {
//                 email,
//                 SButton,
//                 ArrowLeftOnRectangleIcon,
//                 EnvelopeIcon,
//                 KeyIcon,
//                 InformationCircleIcon,
//                 ChatBubbleLeftEllipsisIcon,
//                 CurrencyDollarIcon,
//                 MapPinIcon,
//             };
//         },
//         template,
//     }),
//     parameters: {
//         design,
//         pseudo: { focusVisible: options?.focusVisible },
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

// export const WithLabel = createVariation(`<SComboboxBlock label="Name" placeholder="Enter your name" />`, {
//     containerClass: 'width: 200px',
// });

// export const WithHelpText = createVariation(
//     `<SComboboxBlock label="Token" helpText="does not include quotes" placeholder="XX-XXXX-XXXX" />`,
//     {
//         containerClass: 'width: 200px',
//     },
// );

// export const WithErrorText = createVariation(
//     `<SComboboxBlock label="Amount" error="the amount is mandatory" prefix="$" placeholder="0.00" />`,
//     {
//         containerClass: 'width: 200px',
//     },
// );
