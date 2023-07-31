import SButton from './SButton.vue';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon } from '@heroicons/vue/24/solid';
import type { SourceProps } from '@storybook/blocks';
import { action } from '@storybook/addon-actions';

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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=146-240&mode=design&t=QxbbEscvKyQw6gj0-0',
    },
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

const createVariation = (description: string, template: string) => ({
  decorators: [() => ({ template: '<div style="gap: 20px; display: flex; align-items: end;"><story/></div>' })],
  render: () => ({
    components: { SButton, PlusIcon, MagnifyingGlassIcon, PencilIcon },
    setup() {
      return { PlusIcon, MagnifyingGlassIcon, PencilIcon };
    },
    template,
  }),
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=146-240&mode=design&t=QxbbEscvKyQw6gj0-0',
    },
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story: description,
      },
      source: {
        code: template,
        language: 'html',
      },
    },
  },
});

export const Variant = createVariation(
  'Showcases the button in various visual styles.',
  `
<SButton variant="primary"> Primary </SButton>
<SButton variant="secondary"> Secondary </SButton>
<SButton variant="danger"> Danger </SButton>
<SButton variant="outline"> Outline </SButton>
<SButton variant="link"> Link </SButton>
`
);

export const Rounded = createVariation(
  'Displays the button with different corner treatments.',
  `
<SButton rounded="both"> Both </SButton>
<SButton rounded="left"> Left </SButton>
<SButton rounded="right"> Right </SButton>
<SButton rounded="none"> None </SButton>
<SButton rounded="full"> Full </SButton>
`
);

export const Sizes = createVariation(
  'Displays the button in different sizes.',
  `
<SButton size="sm"> Small </SButton>
<SButton> Medium </SButton>
`
);

export const Disabled = createVariation(
  'Displays the button in its active and inactive states.',
  `
<SButton> Enabled </SButton>
<SButton disabled> Disabled </SButton>
`
);

export const Loading = createVariation(
  'Displays the button when it is in a loading state.',
  `
<SButton loading> Loading </SButton>
`
);

export const OnlyIcon = createVariation(
  'A button that solely displays an icon.',
  `
<SButton :icon="PencilIcon"/>
<SButton :icon="MagnifyingGlassIcon" rounded="circle"/>
<SButton :icon="PlusIcon" small/>
`
);

export const IconWithText = createVariation(
  'Combines both icon and text within the button.',
  `
<SButton :icon="MagnifyingGlassIcon">Search</SButton>
<SButton :icon="PlusIcon" endIcon>Create QR</SButton>
`
);
