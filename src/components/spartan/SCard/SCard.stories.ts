import SCard from './SCard.vue';
import { SAvatar } from '../SAvatar';
import { SBadge } from '../SBadge';
import { SButton } from '../SButton';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';
import {
    EnvelopeIcon,
    PhoneIcon,
    HandThumbUpIcon,
    ShareIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    SquaresPlusIcon,
    CubeTransparentIcon,
    CloudIcon,
} from '@heroicons/vue/24/outline';
import { BoltIcon, KeyIcon, SparklesIcon } from '@heroicons/vue/24/solid';

export default {
    component: SCard,
    title: 'misc/Card',
    parameters: {
        docs: {
            description: {
                component:
                    'A card is a flexible and extensible content container. It includes options for headers and footers, and powerful display options.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: 'text',
            description: 'The content of the card.',
            table: { type: { summary: 'VNode | VNode Array' }, category: 'Slots' },
        },
        header: {
            control: 'text',
            description: 'The content of the card header.',
            table: { type: { summary: 'VNode | VNode Array' }, category: 'Slots' },
        },
        footer: {
            control: 'text',
            description: 'The content of the card footer.',
            table: { type: { summary: 'VNode | VNode Array' }, category: 'Slots' },
        },
        title: {
            control: 'text',
            description: 'The content of the card title.',
            table: { type: { summary: 'VNode | VNode Array' }, category: 'Slots' },
        },
        description: {
            control: 'text',
            description: 'The content of the card description.',
            table: { type: { summary: 'VNode | VNode Array' }, category: 'Slots' },
        },

        // Props
        size: {
            control: 'inline-radio',
            options: ['sm', 'md'],
            description: 'The size of the card. Inlfuences the padding and the rounded corners.',
            table: { type: { summary: 'sm | md' } },
        },
        icon: {
            control: 'select',
            options: ['SquaresPlusIcon', 'PhoneIcon', 'ShareIcon'],
            description: 'The icon of the card.',
            table: { type: { summary: 'FunctionalComponent' } },
        },
        actions: {
            control: 'select',
            options: ['none', 'contact', 'social'],
            description: 'Buttons on bottom of the card that can be used to dispath actions.',
            table: {
                type: { summary: '{ icon: FunctionalComponent; onClick: () => void; text: string; }' },
            },
        },
        bodyAccent: {
            control: { type: null },
            description: 'Whether the body of the card should have an accent color.',
            table: { type: { summary: 'boolean' } },
        },
        headerAccent: {
            control: { type: null },
            description: 'Whether the header of the card should have an accent color.',
            table: { type: { summary: 'boolean' } },
        },
        footerAccent: {
            control: { type: null },
            description: 'Whether the footer of the card should have an accent color.',
            table: { type: { summary: 'boolean' } },
        },
        bodyClass: {
            control: { type: null },
            description: 'The class of the body of the card container.',
            table: { type: { summary: 'boolean' } },
        },
        headerClass: {
            control: { type: null },
            description: 'The class of the header of the card container.',
            table: { type: { summary: 'boolean' } },
        },
        footerClass: {
            control: { type: null },
            description: 'The class of the footer of the card container.',
            table: { type: { summary: 'boolean' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SCard },
    setup: () => {
        const getIcon = (icon: string) => {
            if (icon === 'SquaresPlusIcon') {
                return SquaresPlusIcon;
            }

            if (icon === 'PhoneIcon') {
                return PhoneIcon;
            }

            if (icon === 'ShareIcon') {
                return ShareIcon;
            }
        };

        const getActionExample = (example: string) => {
            if (example === 'none') {
                return [];
            }

            if (example === 'contact') {
                return [
                    {
                        icon: EnvelopeIcon,
                        onClick: () => {},
                        text: 'Email',
                    },
                    {
                        icon: PhoneIcon,
                        onClick: () => {},
                        text: 'Call',
                    },
                ];
            }

            if (example === 'social') {
                return [
                    {
                        icon: HandThumbUpIcon,
                        onClick: () => {},
                        text: 'Like',
                    },
                    {
                        icon: ShareIcon,
                        onClick: () => {},
                        text: 'Share',
                    },
                    {
                        icon: ChatBubbleOvalLeftEllipsisIcon,
                        onClick: () => {},
                        text: 'Comment',
                    },
                ];
            }
        };

        return { getIcon, getActionExample };
    },
    template: `<SCard v-bind="args" :icon="getIcon(args.icon)" :actions="getActionExample(args.actions)">
    <template v-if="args.header" #header>
        {{ args.header }}
    </template>

    <template v-if="args.title" #title>
        {{ args.title }}
    </template>

    <template v-if="args.description" #description>
        {{ args.description }}
    </template>

    {{args.default}}

    <template v-if="args.footer" #footer>
        {{ args.footer }}
    </template>
    </SCard>`,
    transform: (args) => `<SCard ${sourceBinding(args)}>${
        args.header ? `\n\t<template #header>${args.header}</template>\n` : ''
    }
    ${args.default}${args.footer ? `\n\n\t<template #footer>${args.footer}</template>` : ''}
</SCard>`,
    args: {
        default: 'Card content',
        header: '',
        footer: '',
        size: 'md',
        actions: 'none',
        title: '',
        description: '',
        icon: undefined,
    },
});

export const AccentParts = createVariation({
    components: { SCard },
    containerClass: 'flex flex-wrap gap-4',
    template: `<SCard footer-accent size='sm'>
    <p class="w-60">This is a free plan. It has limited features.</p>
    
    <template #footer>
        <p class="text-gray-500 italic px-2">Promotion valid until 31/12/2023</p>
    </template>
</SCard>
    
<SCard header-accent size='sm'>
    <template #header>
        <p class="text-gray-500 font-semibold p-2">💰 Free Plan</p>
    </template>

    <p class="w-60">This is a free plan. It has limited features.</p>
</SCard>

<SCard size='sm'>
    <template #header>
        <p class="text-gray-500 font-semibold p-2">💰 Free Plan</p>
    </template>

    <p class="w-60">This is a free plan. It has limited features.</p>

    <template #footer>
        <p class="text-gray-500 italic px-2">Promotion valid until 31/12/2023</p>
    </template>
</SCard>

<SCard body-accent size='sm'>
    <template #header>
        <p class="text-gray-500 font-semibold p-2">💰 Free Plan</p>
    </template>

    <p class="w-60">This is a free plan. It has limited features.</p>
</SCard>

<SCard body-accent size='sm'>
    <template #header>
        <p class="text-gray-500 font-semibold p-2">💰 Free Plan</p>
    </template>

    <p class="w-60">This is a free plan. It has limited features.</p>

    <template #footer>
        <p class="text-gray-500 italic px-2">Promotion valid until 31/12/2023</p>
    </template>
</SCard>

<SCard header-accent footer-accent size='sm'>
    <template #header>
        <p class="text-gray-500 font-semibold px-2">💰 Free Plan</p>
    </template>

    <p class="w-60">This is a free plan. It has limited features.</p>

    <template #footer>
        <p class="text-gray-500 italic px-2">Promotion valid until 31/12/2023</p>
    </template>
</SCard>`,
});

export const ActionButtons = createVariation({
    components: { SCard, SAvatar, SBadge },
    containerClass: 'flex flex-wrap gap-4',
    setup: () => {
        const contactActions = [
            {
                icon: EnvelopeIcon,
                onClick: () => {},
                text: 'Email',
            },
            {
                icon: PhoneIcon,
                onClick: () => {},
                text: 'Call',
            },
        ];

        const socialActions = [
            {
                icon: HandThumbUpIcon,
                onClick: () => {},
                text: 'Like',
            },
            {
                icon: ShareIcon,
                onClick: () => {},
                text: 'Share',
            },
            {
                icon: ChatBubbleOvalLeftEllipsisIcon,
                onClick: () => {},
                text: 'Comment',
            },
        ];

        return { contactActions, socialActions };
    },
    template: `<SCard :actions="contactActions" bodyClass="flex items-center justify-between w-80">
    <div class="flex flex-col gap-2">
        <div class="flex gap-2">
            <span class="text-gray-900 font-semibold">Jane Cooper</span>
            <SBadge pill color="primary">Admin</SBadge>
        </div>
        <span class="text-gray-500 font-normal">Regional Paradigm Technician</span>
    </div>
    <SAvatar name="Jane Cooper" />
</SCard>

<SCard :actions="socialActions" class="w-[500px]">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
</SCard>`,
});

export const ActionsSlot = createVariation({
    components: { SCard, SButton },
    containerClass: 'grid grid-cols-2 gap-4',
    template: `<SCard iconVariant="success">
    <template #title>Confirm payment</template>
    <template #description>A voucher will be sent to your email.</template>
    <template #actions>
        <SButton class="w-full" variant="primary">Confirm</SButton>
        <SButton class="w-full" variant="secondary">Cancel</SButton>
    </template>
</SCard>

<SCard iconVariant="info">
    <template #title>Don't forget!</template>
    <template #description>Check your email to confirm your account.</template>
    <template #actions>
        <SButton class="w-full" variant="primary">Go to email</SButton>
    </template>
</SCard>`,
});

export const CustomIcon = createVariation({
    components: { SCard },
    containerClass: 'grid grid-cols-3 gap-4',
    setup: () => ({ BoltIcon, KeyIcon, SparklesIcon }),
    template: `<SCard :icon="BoltIcon">
    <template #title>
        Fast
    </template>
</SCard>

<SCard :icon="KeyIcon">
    <template #title>
        Secure
    </template>
</SCard>

<SCard :icon="SparklesIcon">
    <template #title>
        Beautiful
    </template>
</SCard>`,
});

export const VariantIcon = createVariation({
    components: { SCard },
    containerClass: 'grid grid-cols-3 gap-4',
    setup: () => ({ SquaresPlusIcon }),
    template: `<SCard iconVariant="primary">
    <template #title>
        Primary Style
    </template>
</SCard>

<SCard iconVariant="success">
    <template #title>
        Success Style
    </template>
</SCard>

<SCard iconVariant="danger">
    <template #title>
        Danger Style
    </template>
</SCard>

<SCard iconVariant="warning">
    <template #title>
        Warning Style
    </template>
</SCard>

<SCard iconVariant="info">
    <template #title>
        Info Style
    </template>
</SCard>`,
});

export const CustomIconStyle = createVariation({
    components: { SCard },
    containerClass: 'grid grid-cols-3 gap-4',
    setup: () => ({ CubeTransparentIcon, CloudIcon }),
    template: `<SCard :icon="CubeTransparentIcon" iconContainerClass="bg-black" iconClass="text-white">
    <template #title>
        Fully customized
    </template>
</SCard>

<SCard :icon="CloudIcon" iconVariant="warning" iconContainerClass="rounded shadow">
    <template #title>
        Hybrid #1
    </template>
</SCard>

<SCard iconVariant="success" iconClass="h-10 w-10 stroke-2" iconContainerClass="p-1">
    <template #title>
        Hybrid #2
    </template>
</SCard>`,
});

export const EmptyState = createVariation({
    components: { SCard },
    containerClass: 'flex flex-wrap gap-4',
    template: `<SCard iconVariant="primary">
    <template #title>
        You dont have any reports
    </template>

    <template #description>
        There are no records available. you can start by adding a new one.
    </template>
</SCard>`,
});
