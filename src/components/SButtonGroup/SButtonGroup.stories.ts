import SButtonGroup from './SButtonGroup.vue';
import { SDropdown, SDropdownItem } from '../SDropdown';
import type { SourceProps } from '@storybook/blocks';
import { action } from '@storybook/addon-actions';
import { buildDesign, buildSourceBinding } from '../../helpers';
import { BookmarkIcon, PlusIcon, PencilIcon, ChevronDownIcon, UserCircleIcon } from '@heroicons/vue/20/solid';

export default {
  component: SButtonGroup,
  title: 'new/ButtonGroup',
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
    active: {
      description: 'If **true**, the button will be active.',
      table: { type: { summary: 'boolean' } },
    },
    disabled: {
      description: 'If **true**, the button will be disabled.',
      table: { type: { summary: 'boolean' } },
    },
    endIcon: {
      description: 'If **true**, the button will have an icon on the right side.',
      table: { type: { summary: 'boolean' } },
    },
    first: {
      description: 'If **true**, the button will be the first in the group.',
      table: { type: { summary: 'boolean' } },
    },
    icon: {
      control: 'select',
      options: ['BookmarkIcon', 'PlusIcon', 'PencilIcon', 'ChevronDownIcon'],
      description: `A Vue functional component to be used as the button's icon.`,
      table: { type: { summary: 'FunctionalComponent' } },
    },
    last: {
      description: 'If **true**, the button will be the last in the group.',
      table: { type: { summary: 'boolean' } },
    },
    next: {
      description: 'If **true**, the button will be the next in the group.',
      table: { type: { summary: 'boolean' } },
    },
    prev: {
      description: 'If **true**, the button will be the previous in the group.',
      table: { type: { summary: 'boolean' } },
    },
  },
};

const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4565%3A14705');

const sourceBinding = buildSourceBinding({
  check: ['active', 'disabled', 'endIcon', 'first', 'last', 'next', 'prev'],
  custom: { icon: true },
});

export const Default = {
  render: (args: any) => ({
    components: { SButtonGroup, BookmarkIcon, PlusIcon, PencilIcon, ChevronDownIcon },
    setup() {
      const getIcon = (icon: 'BookmarkIcon' | 'PlusIcon' | 'PencilIcon' | 'ChevronDownIcon') => {
        if (icon === 'BookmarkIcon') return BookmarkIcon;
        if (icon === 'PlusIcon') return PlusIcon;
        if (icon === 'PencilIcon') return PencilIcon;
        if (icon === 'ChevronDownIcon') return ChevronDownIcon;
      };
      return { args, getIcon, onClick: action('onClick') };
    },
    template: `<SButtonGroup v-bind="args" :icon="getIcon(args.icon)" @click="onClick">{{ args.default }}</SButtonGroup>`,
  }),
  parameters: {
    design,
    docs: {
      source: {
        transform: ((_, storyContext) =>
          `<SButtonGroup ${sourceBinding(storyContext.args)}>${
            storyContext.args.default
          }</SButtonGroup>`) as SourceProps['transform'],
        type: 'dynamic',
        language: 'html',
      },
    },
  },
  args: {
    default: 'Group',
    active: false,
    disabled: false,
    endIcon: false,
    first: false,
    icon: undefined,
    last: false,
    next: false,
    prev: false,
  },
};

const createVariation = (
  template: string,
  decorators?: (() => {
    template: string;
  })[]
) => ({
  decorators: decorators ?? [
    () => ({ template: '<div style="gap: 20px; display: flex; align-items: end;"><story/></div>' }),
  ],
  render: () => ({
    components: {
      SButtonGroup,
      SDropdown,
      SDropdownItem,
      BookmarkIcon,
      PlusIcon,
      PencilIcon,
      ChevronDownIcon,
      UserCircleIcon,
    },
    setup() {
      return {
        BookmarkIcon,
        PlusIcon,
        PencilIcon,
        ChevronDownIcon,
        UserCircleIcon,
      };
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

export const Group = createVariation(`
<span class="s-button-group">
  <SButtonGroup> one </SButtonGroup>
  <SButtonGroup> two </SButtonGroup>
  <SButtonGroup> three </SButtonGroup>
</span>
`);

export const GroupRounded = createVariation(`
<span class="s-button-group">
  <SButtonGroup first> red </SButtonGroup>
  <SButtonGroup> green </SButtonGroup>
  <SButtonGroup last> blue </SButtonGroup>
</span>
`);

export const GroupWithNav = createVariation(`
<span class="s-button-group">
  <SButtonGroup prev />
  <SButtonGroup v-for="i in ['day', 'week', 'month', 'year']">{{ i }}</SButtonGroup>
  <SButtonGroup next />
</span>
`);

export const GroupWithActiveItem = createVariation(`
<span class="s-button-group">
  <SButtonGroup active first>Page 1</SButtonGroup>
  <SButtonGroup>Page 2</SButtonGroup>
  <SButtonGroup>Page 3</SButtonGroup>
  <SButtonGroup>...</SButtonGroup>
  <SButtonGroup next last />
</span>
`);

export const GroupWithDisableItem = createVariation(`
<span class="s-button-group">
  <SButtonGroup v-for="(i, index) in 5" :disabled="index === 3">{{ \`\${i + 28}. Section\` }}</SButtonGroup>
  <SButtonGroup next last />
</span>
`);

export const GroupWithIcons = createVariation(`
<span class="s-button-group">
  <SButtonGroup :icon="UserCircleIcon" first>John Doe</SButtonGroup>
  <SButtonGroup :icon="UserCircleIcon">Mark Moe</SButtonGroup>
  <SButtonGroup :icon="PlusIcon" last/>
</span>
`);

export const GroupWithDropdown = createVariation(`
<span class="s-button-group">
  <SButtonGroup first>Save changes</SButtonGroup>
  <SDropdown>
    <SButtonGroup :icon="ChevronDownIcon" last />

    <template #items>
      <SDropdownItem :icon="UserCircleIcon"> My Profile </SDropdownItem>
      <SDropdownItem :icon="PencilIcon"> Edit </SDropdownItem>
      <SDropdownItem :icon="PlusIcon"> Add </SDropdownItem>
    </template>
  </SDropdown>
</span>
`,
  [() => ({ template: '<div style="padding-bottom: 200px; padding-left: 32px;"><story/></div>' })]
);

export const Pagination = createVariation(`
<span class="s-button-group">
  <SButtonGroup prev first />
  <SButtonGroup v-for="(i, index) in 9" :active="index === 4">{{ i }}</SButtonGroup>
  <SButtonGroup next last />
</span>
`);

export const Customize = createVariation(`
<span class="s-button-group">
  <SButtonGroup prev first />
  <SButtonGroup>Days</SButtonGroup>
  <SButtonGroup disabled>Weeks</SButtonGroup>
  <SButtonGroup :icon="PlusIcon"/>
  <SButtonGroup :icon="BookmarkIcon">Months</SButtonGroup>
  <SButtonGroup active>29</SButtonGroup>
  <SButtonGroup :icon="PencilIcon" endIcon>Years</SButtonGroup>
  <SButtonGroup :icon="ChevronDownIcon" endIcon>Menu</SButtonGroup>
  <SButtonGroup next last />
</span>
`);
