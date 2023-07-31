import SBadge from './SBadge.vue';
import type { SourceProps } from '@storybook/blocks';
import { action } from '@storybook/addon-actions';

export default {
  component: SBadge,
  title: 'new/Badge',
  parameters: {
    docs: {
      description: {
        component: 'BADGE',
      },
    },
  },
  argTypes: {
    removed: {
      control: { type: 'text' },
      table: { type: { summary: null }, category: 'Events' },
      description: 'Emitted when the button is removed',
    },
    default: {
      control: 'text',
      description: 'Default slot for badge content.',
      table: { type: { summary: 'VNode | VNode Array' } },
    },
    color: {
      control: { type: 'select' },
      options: ['blue', 'gray', 'green', 'indigo', 'primary', 'red', 'yellow'],
      description: 'BADGE',
      table: { type: { summary: 'VNode | VNode Array' } },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
      description: 'BADGE',
      table: { type: { summary: 'VNode | VNode Array' } },
    },
    pill: {
      description: 'BADGE',
      table: { type: { summary: 'boolean' } },
    },
    dot: {
      description: 'BADGE',
      table: { type: { summary: 'boolean' } },
    },
    outline: {
      description: 'BADGE',
      table: { type: { summary: 'boolean' } },
    },
    show: {
      control: { type: 'boolean' },
      description: 'BADGE',
      table: { type: { summary: 'boolean' } },
    },
  },
};

export const Default = {
  render: (args: any) => ({
    components: { SBadge },
    setup() {
      const removed = (e: any) => {
        action('removed')(e);
        args.show = false;
        setTimeout(() => {
          args.show = true;
        }, 350);
      };
      return { args, removed };
    },
    template: '<SBadge v-bind="args" @removed="removed"> {{ args.default }} </SBadge>',
  }),
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=220-2298&mode=design&t=2M2dC9vkSMAsks1E-4',
    },
    docs: {
      description: {
        story: 'Standard badge presentation.',
      },
      source: {
        transform: ((_, storyContext) => `
        <SBadge ${
          storyContext.args.color && storyContext.args.color !== 'gray' ? `color="${storyContext.args.color}"` : ''
        } ${storyContext.args.size && storyContext.args.size !== 'md' ? `size="${storyContext.args.size}"` : ''} ${
          storyContext.args.pill ? 'pill' : ''
        } ${storyContext.args.dot ? 'dot' : ''} ${
          storyContext.args.show !== undefined ? (storyContext.args.show ? 'show="true"' : 'show="false"') : ''
        } ${storyContext.args.removed ? `@removed="${storyContext.args.removed.replace(/ /g, '')}"` : ''}> ${
          storyContext.args.default
        } </SBadge>
        `) as SourceProps['transform'],
        type: 'dynamic',
        language: 'html',
      },
    },
  },
  args: {
    default: 'Badge',
    color: 'gray',
    size: 'md',
    pill: false,
    dot: false,
    outline: false,
  },
};

const createVariation = (description: string, template: string) => ({
  decorators: [() => ({ template: '<div style="gap: 20px; display: flex; align-items: end;"><story/></div>' })],
  render: () => ({
    components: { SBadge },
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

export const Size = createVariation(
  'Showcases the badge with different sizes.',
  `
<SBadge color="blue" size="sm"> Small </SBadge>
<SBadge color="blue" size="md"> Medium </SBadge>
<SBadge color="blue" size="lg"> Large </SBadge>
`
);

export const Color = createVariation(
  'Showcases the badge with different colors.',
  `
<SBadge color="primary"> Primary </SBadge>
<SBadge color="gray"> Gray </SBadge>
<SBadge color="red"> Red </SBadge>
<SBadge color="blue"> Blue </SBadge>
<SBadge color="green"> Green </SBadge>
<SBadge color="yellow"> Yellow </SBadge>
<SBadge color="indigo"> Indigo </SBadge>
`
);

export const Outline = createVariation(
  'Showcases the badge with an outline.',
  `
<SBadge color="primary" outline> Primary </SBadge>
<SBadge color="gray" outline> Gray </SBadge>
<SBadge color="red" outline> Red </SBadge>
<SBadge color="blue" outline> Blue </SBadge>
<SBadge color="green" outline> Green </SBadge>
<SBadge color="yellow" outline> Yellow </SBadge>
<SBadge color="indigo" outline> Indigo </SBadge>
`
);

export const Pill = createVariation(
  'Showcases the badge with a pill shape.',
  `
<SBadge color="primary" pill> Primary </SBadge>
<SBadge color="gray" pill> Gray </SBadge>
<SBadge color="red" pill> Red </SBadge>
<SBadge color="blue" pill> Blue </SBadge>
<SBadge color="green" pill> Green </SBadge>
<SBadge color="yellow" pill> Yellow </SBadge>
<SBadge color="indigo" pill> Indigo </SBadge>
`
);

export const Dot = createVariation(
  'Showcases the badge with a dot.',
  `
<SBadge color="primary" dot> Primary </SBadge>
<SBadge color="gray" dot> Gray </SBadge>
<SBadge color="red" dot> Red </SBadge>
<SBadge color="blue" dot> Blue </SBadge>
<SBadge color="green" dot> Green </SBadge>
<SBadge color="yellow" dot> Yellow </SBadge>
<SBadge color="indigo" dot> Indigo </SBadge>
`
);

export const Removable = createVariation(
  'Showcases the badge with a remove button.',
  `
<SBadge color="primary" show="true"> Primary </SBadge>
<SBadge color="gray" show="true"> Gray </SBadge>
<SBadge color="red" show="true"> Red </SBadge>
<SBadge color="blue" show="true"> Blue </SBadge>
<SBadge color="green" show="true"> Green </SBadge>
<SBadge color="yellow" show="true"> Yellow </SBadge>
<SBadge color="indigo" show="true"> Indigo </SBadge>
`
);

export const Customize = createVariation(
  '',
  `
<SBadge color="primary" dot show="true"> Primary </SBadge>
<SBadge color="gray" outline dot pill> Gray </SBadge>
<SBadge color="red" dot size="sm"> Red </SBadge>
<SBadge color="blue" outline dot> Blue </SBadge>
<SBadge color="green" outline dot size="lg"> Green </SBadge>
<SBadge color="yellow" size="lg" show="true"> Yellow </SBadge>
<SBadge color="indigo" outline dot show="true"> Indigo </SBadge>
`
);
