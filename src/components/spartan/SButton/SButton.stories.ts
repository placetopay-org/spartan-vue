import SButton from './SButton.vue';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon } from '@heroicons/vue/24/solid';
import type { SourceProps } from '@storybook/blocks';
import { action } from '@storybook/addon-actions';
import { buildDesign, buildSourceBinding } from '@/helpers';

export default {
    component: SButton,
    title: 'buttons/Button',
    parameters: {
        docs: {
            description: {
                component: 'A versatile button component with multiple styles and appearances.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: 'text',
            description: 'Default slot for button content.',
            table: { type: { summary: 'VNode | VNode Array' } },
        },

        // Props
        as: {
            control: 'text',
            description: 'Defines the HTML element tag type to be used for the component.',
            table: { type: { summary: 'string' } },
        },
        disabled: {
            description: 'If **true**, the button will be disabled and non-interactive.',
            table: { type: { summary: 'boolean' } },
        },
        endIcon: {
            description: 'If **true**, the icon will be displayed at the end of the button content.',
            table: { type: { summary: 'boolean' } },
        },
        icon: {
            control: 'select',
            options: ['PlusIcon', 'MagnifyingGlassIcon', 'PencilIcon'],
            description: `A Vue functional component to be used as the button's icon.`,
            table: { type: { summary: 'FunctionalComponent' } },
        },
        loading: {
            description: 'If **true**, the button will display a loading spinner.',
            table: { type: { summary: 'boolean' } },
        },
        rounded: {
            control: 'inline-radio',
            options: ['left', 'right', 'both', 'none', 'full'],
            description: `Specifies which corners should be rounded.`,
            table: { type: { summary: 'left | right | both | none | full' } },
        },
        size: {
            control: 'inline-radio',
            options: ['sm', 'md'],
            description: 'Sets the size of the button.',
            table: { type: { summary: 'sm | md' } },
        },
        type: {
            control: 'inline-radio',
            options: ['button', 'submit'],
            description: `Specifies the button's type.`,
            table: { type: { summary: 'button | submit' } },
        },
        variant: {
            control: 'inline-radio',
            options: ['primary', 'secondary', 'danger', 'outline', 'link'],
            description: `Defines the button's appearance variant.`,
            table: {
                type: { summary: 'primary | secondary | danger | outline | link' },
            },
        },
    },
};

const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=146-240');

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

export const Default = {
    render: (args: any) => ({
        components: { SButton, PlusIcon, MagnifyingGlassIcon, PencilIcon },
        setup() {
            const getIcon = (icon: 'PlusIcon' | 'MagnifyingGlassIcon' | 'PencilIcon') => {
                if (icon === 'PlusIcon') return PlusIcon;
                if (icon === 'MagnifyingGlassIcon') return MagnifyingGlassIcon;
                if (icon === 'PencilIcon') return PencilIcon;
            };
            return { args, getIcon, onClick: action('onClick') };
        },
        template: '<SButton v-bind="args" :icon="getIcon(args.icon)" @click="onClick"> {{ args.default }} </SButton>',
    }),
    parameters: {
        design,
        docs: {
            canvas: { layout: 'centered' },
            source: {
                transform: ((_, storyContext) => `
        ${
            storyContext.args.icon
                ? `import { ${storyContext.args.icon} } from '@heroicons/vue/24/solid'
        `
                : ''
        }
        <SButton ${sourceBinding(storyContext.args)}> ${storyContext.args.default} </SButton>
        `) as SourceProps['transform'],
                type: 'dynamic',
                language: 'tsx',
            },
        },
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
};

const createVariation = (template: string) => ({
    decorators: [
        () => ({
            template: '<div style="gap: 20px; display: flex; align-items: end;"><story/></div>',
        }),
    ],
    render: () => ({
        components: { SButton, PlusIcon, MagnifyingGlassIcon, PencilIcon },
        setup() {
            return { PlusIcon, MagnifyingGlassIcon, PencilIcon };
        },
        template,
    }),
    parameters: {
        design,
        controls: { disable: true },
        actions: { disable: true },
        docs: {
            source: {
                code: template,
                language: 'html',
            },
        },
    },
});

export const Variant = createVariation(
    `
<SButton variant="primary"> Primary </SButton>
<SButton variant="secondary"> Secondary </SButton>
<SButton variant="danger"> Danger </SButton>
<SButton variant="outline"> Outline </SButton>
<SButton variant="link"> Link </SButton>
`,
);

export const Rounded = createVariation(
    `
<SButton rounded="both"> Both </SButton>
<SButton rounded="left"> Left </SButton>
<SButton rounded="right"> Right </SButton>
<SButton rounded="none"> None </SButton>
<SButton rounded="full"> Full </SButton>
`,
);

export const Sizes = createVariation(
    `
<SButton size="sm"> Small </SButton>
<SButton> Medium </SButton>
`,
);

export const Disabled = createVariation(
    `
<SButton> Enabled </SButton>
<SButton disabled> Disabled </SButton>
`,
);

export const Loading = createVariation(
    `
<SButton loading> Loading </SButton>
`,
);

export const OnlyIcon = createVariation(
    `
<SButton :icon="MagnifyingGlassIcon" rounded="right"/>
<SButton :icon="PencilIcon" size="sm" rounded="none"/>
<SButton :icon="PlusIcon" size="sm" rounded="full"/>
`,
);

export const IconWithText = createVariation(
    `
<SButton :icon="MagnifyingGlassIcon">Search</SButton>
<SButton :icon="PlusIcon" endIcon>Create QR</SButton>
`,
);
