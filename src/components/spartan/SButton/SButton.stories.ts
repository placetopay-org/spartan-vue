import SButton from './SButton.vue';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon } from '@heroicons/vue/24/solid';
import { buildSourceBinding, createDefault, createHistory, createVariation as buildVariation } from '@/helpers';
import type { FunctionalComponent } from 'vue';

export default {
    component: SButton,
    title: 'buttons/Button',
    ...createHistory({
        description: 'A versatile button component with multiple styles and appearances.',
        slots: [
            {
                name: 'default',
                description: 'Default slot for button content.',
                control: true,
            },
        ],
        props: [
            {
                name: 'as',
                description: 'Defines the HTML element tag type to be used for the component.',
                type: 'string',
                control: null,
            },
            {
                name: 'disabled',
                description: 'If **true**, the button will be disabled and non-interactive.',
                type: 'boolean',
                control: 'boolean',
            },
            {
                name: 'endIcon',
                description: 'If **true**, the icon will be displayed at the end of the button content.',
                type: 'boolean',
                control: 'boolean',
            },
            {
                name: 'icon',
                description: `A Vue functional component to be used as the button's icon.`,
                type: 'FunctionalComponent',
                options: ['PlusIcon', 'MagnifyingGlassIcon', 'PencilIcon'],
                control: 'select',
            },
            {
                name: 'loading',
                description: 'If **true**, the button will display a loading spinner.',
                type: 'boolean',
                control: 'boolean',
            },
            {
                name: 'rounded',
                description: `Specifies which corners should be rounded.`,
                type: 'left | right | both | none | full',
                options: ['left', 'right', 'both', 'none', 'full'],
                control: null,
            },
            {
                name: 'size',
                description: 'Sets the size of the button.',
                type: 'sm | md',
                options: ['sm', 'md'],
                control: 'inline-radio',
            },
            {
                name: 'type',
                description: `Specifies the button's type.`,
                type: 'button | submit',
                options: ['button', 'submit'],
                control: 'inline-radio',
            },
            {
                name: 'variant',
                description: `Defines the button's appearance variant.`,
                type: 'primary | secondary | danger | outline | link',
                options: ['primary', 'secondary', 'danger', 'outline', 'link'],
                control: 'inline-radio',
            },
        ],
    }),
};

const sourceBinding = buildSourceBinding({
    check: ['disabled', 'loading', 'endIcon'],
    prop: {
        as: 'button',
        size: 'md',
        type: 'button',
        variant: 'primary',
        rounded: 'both',
    },
    custom: { icon: true },
});

export const Default = createDefault({
    design: 'https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=146-240',
    components: { SButton },
    setup: () => {
        const getIcon = (icon: 'PlusIcon' | 'MagnifyingGlassIcon' | 'PencilIcon') => {
            if (icon === 'PlusIcon') return PlusIcon;
            if (icon === 'MagnifyingGlassIcon') return MagnifyingGlassIcon;
            if (icon === 'PencilIcon') return PencilIcon;
        };

        return { getIcon, PlusIcon, MagnifyingGlassIcon, PencilIcon };
    },
    args: {
        default: 'Click me',
        as: 'button',
        disabled: false,
        endIcon: false,
        icon: undefined,
        loading: false,
        rounded: 'both',
        size: 'md',
        type: 'button',
        variant: 'primary',
    },
    transform: (args) => `<SButton ${sourceBinding(args)}>${args.default}</SButton>`,
    template: '<SButton v-bind="args" :icon="getIcon(args.icon)" @click="onClick"> {{ args.default }} </SButton>',
});

const createVariation = (template: string, icons?: Record<string, FunctionalComponent>) =>
    buildVariation({
        components: { SButton },
        setup: () => icons,
        containerClass: 'flex gap-5',
        template,
    });

export const Variant = createVariation(`
<SButton variant="primary"> Primary </SButton>
<SButton variant="secondary"> Secondary </SButton>
<SButton variant="danger"> Danger </SButton>
<SButton variant="outline"> Outline </SButton>
<SButton variant="link"> Link </SButton>
`);

export const Rounded = createVariation(`
<SButton rounded="both"> Both </SButton>
<SButton rounded="left"> Left </SButton>
<SButton rounded="right"> Right </SButton>
<SButton rounded="none"> None </SButton>
<SButton rounded="full"> Full </SButton>
`);

export const Sizes = createVariation(`
<SButton size="sm"> Small </SButton>
<SButton> Medium </SButton>
`);

export const Disabled = createVariation(`
<SButton> Enabled </SButton>
<SButton disabled> Disabled </SButton>
`);

export const Loading = createVariation(`
<SButton loading> Loading </SButton>
`);

export const OnlyIcon = createVariation(`
<SButton :icon="MagnifyingGlassIcon" rounded="right"/>
<SButton :icon="PencilIcon" size="sm" rounded="none"/>
<SButton :icon="PlusIcon" size="sm" rounded="full"/>
`, { MagnifyingGlassIcon, PencilIcon, PlusIcon });

export const IconWithText = createVariation(`
<SButton :icon="MagnifyingGlassIcon">Search</SButton>
<SButton :icon="PlusIcon" endIcon>Create QR</SButton>
`, { MagnifyingGlassIcon, PlusIcon });
