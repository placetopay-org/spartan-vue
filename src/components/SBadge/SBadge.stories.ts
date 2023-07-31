import SBadge from './SBadge.vue';
import type { SourceProps } from '@storybook/blocks';
import { action } from '@storybook/addon-actions';
import { buildDesign } from '../../helpers';

export default {
  component: SBadge,
  title: 'new/Badge',
  parameters: {
    docs: {
      description: {
        component: 'A customizable and interactive badge component is easily integrated. Allows you to embed content and offers extensive appearance features.',
      },
    },
  },
  argTypes: {
    removed: {
      control: { type: 'text' },
      table: { type: { summary: null }, category: 'Events' },
      description: `This event is emitted when the badge's remove button is clicked.`,
    },
    default: {
      control: 'text',
      description: 'Default slot for badge content.',
      table: { type: { summary: 'VNode | VNode Array' } },
    },
    color: {
      control: { type: 'select' },
      options: ['blue', 'gray', 'green', 'indigo', 'primary', 'red', 'yellow'],
      description: `Determines the badge's color theme`,
      table: { type: { summary: 'VNode | VNode Array' } },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Dictates the size of the badge.',
      table: { type: { summary: 'VNode | VNode Array' } },
    },
    pill: {
      description: 'If set to `true`, the badge will have fully rounded corners. Otherwise, it will have slightly rounded corners.',
      table: { type: { summary: 'boolean' } },
    },
    dot: {
      description: 'If `true`, a dot will be displayed inside the badge.',
      table: { type: { summary: 'boolean' } },
    },
    outline: {
      description: `If true, the badge will be outlined with its color theme. Otherwise, it'll have a solid background of its color theme.`,
      table: { type: { summary: 'boolean' } },
    },
    show: {
      control: { type: 'boolean' },
      description: 'If provided and is `true`, the badge will be displayed. If `false`, the badge will not be displayed. If not provided (`undefined`), the badge will be displayed by default.',
      table: { type: { summary: 'boolean' } },
    },
  },
};

const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=220-2083')

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
    design,
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

const createVariation = (template: string) => ({
  decorators: [() => ({ template: '<div style="gap: 20px; display: flex; align-items: end;"><story/></div>' })],
  render: () => ({
    components: { SBadge },
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

export const Size = createVariation(
  `
<SBadge color="blue" size="sm"> Small </SBadge>
<SBadge color="blue" size="md"> Medium </SBadge>
<SBadge color="blue" size="lg"> Large </SBadge>
`
);

export const Color = createVariation(
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
