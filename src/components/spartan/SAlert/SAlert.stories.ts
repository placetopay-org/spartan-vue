import SAlert from './SAlert.vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { InfoCircleIcon, Warning2Icon, SearchNormal1Icon, NextIcon } from '@placetopay/iconsax-vue/outline';
import { buildSourceBinding, createDefault, createHistory, createVariation as buildVariation } from '@/helpers';
import type { FunctionalComponent } from 'vue';

export default {
    component: SAlert,
    title: 'display/Alert',
    ...createHistory({
        description:
            'A versatile alert component for displaying important messages with multiple styles and appearances.',
        slots: [
            {
                name: 'default',
                description: 'Default slot for alert content.',
                control: true,
            },
        ],
        props: [
            {
                name: 'title',
                description: 'The title of the alert.',
                type: 'string',
                control: 'text',
            },
            {
                name: 'description',
                description: 'The description of the alert.',
                type: 'string',
                control: 'text',
            },
            {
                name: 'icon',
                description: 'The icon of the alert.',
                type: 'FunctionalComponent',
                options: ['InfoCircleIcon', 'Warning2Icon', 'SearchNormal1Icon'],
                control: 'select',
            },
            {
                name: 'color',
                description: 'The color of the alert.',
                type: 'neutral | primary | secondary | success | info | warning | error',
                control: 'select',
                options: ['neutral', 'primary', 'secondary', 'success', 'info', 'warning', 'error'],
            },
            {
                name: 'variant',
                description: 'The variant of the alert.',
                type: 'string',
                control: 'select',
                options: ['solid', 'outline', 'soft', 'subtle'],
            },
            {
                name: 'closeable',
                description: 'Whether the alert is closeable.',
                type: 'boolean',
                control: 'boolean',
            },
            {
                name: 'closeIcon',
                description: 'The icon of the close button.',
                type: 'FunctionalComponent',
                options: ['NextIcon', 'XMarkIcon'],
                control: 'select',
            },
        ],
    }),
};

const sourceBinding = buildSourceBinding({
    check: ['closable'],
    prop: {
        title: undefined,
        description: undefined,
        icon: undefined,
        color: 'neutral',
        variant: 'solid',
        closeable: false,
        closeIcon: undefined,
    },
});

export const Default = createDefault({
    design: 'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=12869-7328&t=JrQd7GUtfJ0roBo5-0',
    components: { SAlert },
    setup: () => {
        const getIcon = (icon: 'InfoCircleIcon' | 'Warning2Icon' | 'SearchNormal1Icon' | 'NextIcon' | 'XMarkIcon') => {
            if (icon === 'InfoCircleIcon') return InfoCircleIcon;
            if (icon === 'Warning2Icon') return Warning2Icon;
            if (icon === 'SearchNormal1Icon') return SearchNormal1Icon;
            if (icon === 'NextIcon') return NextIcon;
            if (icon === 'XMarkIcon') return XMarkIcon;
        };

        return { getIcon, InfoCircleIcon, Warning2Icon, SearchNormal1Icon, NextIcon, XMarkIcon };
    },
    args: {
        title: 'Alert title',
        description: 'Alert description',
        icon: undefined,
        color: 'neutral',
        variant: 'solid',
        closeable: false,
        closeIcon: undefined,
    },
    transform: (args) =>
        `<SAlert ${sourceBinding(args)} ${args.icon ? ':icon="' + args.icon + '"' : ''}>${args.default}</SAlert>`,
    template: '<SAlert v-bind="args" :icon="getIcon(args.icon)"> {{ args.default }} </SAlert>',
});

const createVariation = (template: string, icons?: Record<string, FunctionalComponent>) =>
    buildVariation({
        components: { SAlert },
        setup: () => icons,
        containerClass: 'flex gap-5',
        template,
    });

export const Base = createVariation('<SAlert title="Alert title" description="Alert description" />');

export const WithIcon = createVariation(
    '<SAlert title="Alert title" description="Alert description" :icon="InfoCircleIcon" />',
    { InfoCircleIcon },
);

export const WithCloseButton = createVariation(
    '<SAlert title="Alert title" description="Alert description" closeable />',
);

export const WithCloseButtonAndIcon = createVariation(
    '<SAlert title="Alert title" description="Alert description" closeable :icon="SearchNormal1Icon" />',
    { SearchNormal1Icon },
);

export const WithCloseButtonIcon = createVariation(
    '<SAlert title="Alert title" description="Alert description" closeable :closeIcon="NextIcon" />',
    { NextIcon },
);
