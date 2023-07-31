import SButton from './SButton.vue';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon } from '@heroicons/vue/24/solid';
import type { SourceProps } from '@storybook/blocks';
import { action } from '@storybook/addon-actions';
import { buildDesign } from '../../helpers';

export default {
  component: SButton,
  title: 'new/Button',
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component with multiple styles and appearances.',
      },
    },
  },
  argTypes: {
    default: {
      control: 'text',
      description: 'Default slot for button content.',
      table: { type: { summary: 'VNode | VNode Array' } },
    },
    as: {
      control: 'text',
      description: 'Defines the HTML element tag type to be used for the component.',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      description: 'If **true**, the button will be disabled and non-interactive.',
      table: { type: { summary: 'boolean' } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
      description: 'Sets the size of the button.',
      table: { type: { summary: 'sm | md' } },
    },
    loading: {
      description: 'If **true**, the button will display a loading spinner.',
      table: { type: { summary: 'boolean' } },
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
      table: { type: { summary: 'primary | secondary | danger | outline | link' } },
    },
    rounded: {
      control: 'inline-radio',
      options: ['left', 'right', 'both', 'none', 'full'],
      description: `Specifies which corners should be rounded.`,
      table: { type: { summary: 'left | right | both | none | full' } },
    },
    icon: {
      control: 'select',
      options: ['PlusIcon', 'MagnifyingGlassIcon', 'PencilIcon'],
      description: `A Vue functional component to be used as the button's icon.`,
      table: { type: { summary: 'FunctionalComponent' } },
    },
    endIcon: {
      description: 'If **true**, the icon will be displayed at the end of the button content.',
      table: { type: { summary: 'boolean' } },
    },
  },
};

const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=146-240');

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
      description: {
        story: 'Standard button presentation.',
      },
      source: {
        transform: ((_, storyContext) => `
        ${
          storyContext.args.icon
            ? `import { ${storyContext.args.icon} } from '@heroicons/vue/24/solid'
        `
            : ''
        }
        <SButton ${storyContext.args.as && storyContext.args.as !== 'button' ? `as="${storyContext.args.as}"` : ''} ${
          storyContext.args.disabled ? 'disabled' : ''
        } ${storyContext.args.size && storyContext.args.size !== 'medium' ? `size="${storyContext.args.size}"` : ''} ${storyContext.args.loading ? 'loading' : ''} ${
          storyContext.args.type && storyContext.args.type !== 'button' ? `type="${storyContext.args.type}"` : ''
        } ${
          storyContext.args.variant && storyContext.args.variant !== 'primary'
            ? `variant="${storyContext.args.variant}"`
            : ''
        } ${
          storyContext.args.rounded && storyContext.args.rounded !== 'both'
            ? `rounded="${storyContext.args.rounded}"`
            : ''
        } ${storyContext.args.icon ? `:icon="${storyContext.args.icon}"` : ''} ${
          storyContext.args.endIcon ? 'endIcon' : ''
        }> ${storyContext.args.default} </SButton>
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
    size: 'md',
    loading: false,
    type: 'button',
    variant: 'primary',
    rounded: 'both',
    icon: undefined,
    endIcon: false,
  },
};

const createVariation = (template: string) => ({
  decorators: [() => ({ template: '<div style="gap: 20px; display: flex; align-items: end;"><story/></div>' })],
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
`
);

export const Rounded = createVariation(
  `
<SButton rounded="both"> Both </SButton>
<SButton rounded="left"> Left </SButton>
<SButton rounded="right"> Right </SButton>
<SButton rounded="none"> None </SButton>
<SButton rounded="full"> Full </SButton>
`
);

export const Sizes = createVariation(
  `
<SButton size="sm"> Small </SButton>
<SButton> Medium </SButton>
`
);

export const Disabled = createVariation(
  `
<SButton> Enabled </SButton>
<SButton disabled> Disabled </SButton>
`
);

export const Loading = createVariation(
  `
<SButton loading> Loading </SButton>
`
);

export const OnlyIcon = createVariation(
  `
<SButton :icon="PencilIcon"/>
<SButton :icon="MagnifyingGlassIcon" rounded="circle"/>
<SButton :icon="PlusIcon" small/>
`
);

export const IconWithText = createVariation(
  `
<SButton :icon="MagnifyingGlassIcon">Search</SButton>
<SButton :icon="PlusIcon" endIcon>Create QR</SButton>
`
);
