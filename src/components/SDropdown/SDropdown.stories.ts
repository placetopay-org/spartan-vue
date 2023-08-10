import SDropdown from './SDropdown.vue';
import SDropdownItem from './SDropdownItem.vue';
import { SButton } from '../SButton';
import { SAvatar } from '../SAvatar';
import type { SourceProps } from '@storybook/blocks';
import { action } from '@storybook/addon-actions';
import { buildDesign, buildSourceBinding } from '../../helpers';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import {
  Cog8ToothIcon,
  PuzzlePieceIcon,
  PencilIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  PlusIcon,
} from '@heroicons/vue/24/outline';

export default {
  component: SDropdown,
  title: 'new/Dropdown',
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
      control: { type: null },
      description: 'Default slot for dropdown content.',
      table: { type: { summary: 'VNode | VNode Array' } },
    },
    items: {
      control: { type: null },
      description: 'Slot for dropdown items.',
      table: { type: { summary: 'VNode | VNode Array' } },
    },

    // Props
    leftToRight: {
      description: 'If **true**, the dropdown will open from left to right.',
      table: { type: { summary: 'boolean' } },
    },

    // Item - Slots
    itemSlotDefault: {
      name: 'default',
      control: 'text',
      description: 'Default slot for item content.',
      table: { type: { summary: 'VNode | VNode Array' }, category: 'Item - Slots' },
    },
    itemSlotDescription: {
      name: 'description',
      control: 'text',
      description: 'Slot for item description.',
      table: { type: { summary: 'VNode | VNode Array' }, category: 'Item - Slots' },
    },

    // Item - Props
    itemPropIcon: {
      name: 'icon',
      control: 'select',
      options: ['PuzzlePieceIcon', 'ArrowLeftOnRectangleIcon', 'PencilIcon'],
      description: `A Vue functional component to be used as the item's icon.`,
      table: { type: { summary: 'FunctionalComponent' }, category: 'Item - Props' },
    },
    itemPropStatic: {
      name: 'static',
      description: 'If **true**, the item will be static and non-interactive.',
      table: { type: { summary: 'boolean' }, category: 'Item - Props' },
    },
  },
};

const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4565%3A14705');

const sourceBinding = buildSourceBinding({
  check: ['leftToRight'],
});

const itemsSourceBinding = buildSourceBinding({
  check: ['static'],
  custom: { icon: true },
}, 'item');

export const Default = {
  decorators: [() => ({ template: '<div style="padding-bottom: 200px;"><story/></div>' })],
  render: (args: any) => ({
    components: { SDropdown, SDropdownItem, SButton, ChevronDownIcon, PuzzlePieceIcon },
    setup() {
      const getIcon = (icon: 'PuzzlePieceIcon' | 'ArrowLeftOnRectangleIcon' | 'PencilIcon') => {
        if (icon === 'PuzzlePieceIcon') return PuzzlePieceIcon;
        if (icon === 'ArrowLeftOnRectangleIcon') return ArrowLeftOnRectangleIcon;
        if (icon === 'PencilIcon') return PencilIcon;
      };
      return { args, getIcon, onClick: action('onClick'), ChevronDownIcon };
    },
    template: `<SDropdown v-bind="args">
    <SButton variant="secondary" :icon="ChevronDownIcon" endIcon>Options</SButton>

    <template #items>
      <SDropdownItem :icon="getIcon(args.itemPropIcon)" :static="args.itemPropStatic">
        {{ args.itemSlotDefault }}
        
        <template #description>
          {{ args.itemSlotDescription }}
        </template>
      </SDropdownItem>

      <SDropdownItem :icon="getIcon(args.itemPropIcon)" :static="args.itemPropStatic">
        {{ args.itemSlotDefault }}
        
        <template #description>
          {{ args.itemSlotDescription }}
        </template>
      </SDropdownItem>

      <SDropdownItem :icon="getIcon(args.itemPropIcon)" :static="args.itemPropStatic">
        {{ args.itemSlotDefault }}
        
        <template #description>
          {{ args.itemSlotDescription }}
        </template>
      </SDropdownItem>
    </template>
  </SDropdown>`,
  }),
  parameters: {
    design,
    docs: {
      source: {
        transform: ((_, storyContext) => `
<SDropdown ${sourceBinding(storyContext.args)}>
  <SButton variant="secondary" :icon="ChevronDownIcon" endIcon>Options</SButton>
  
  <template #items>
    <SDropdownItem ${itemsSourceBinding(storyContext.args)}>
      ${storyContext.args.itemSlotDefault}
      
      <template #description>
        ${storyContext.args.itemSlotDescription}
      </template>
    </SDropdownItem>

    <SDropdownItem ${itemsSourceBinding(storyContext.args)}>
      ${storyContext.args.itemSlotDefault}
      
      <template #description>
        ${storyContext.args.itemSlotDescription}
      </template>
    </SDropdownItem>

    <SDropdownItem ${itemsSourceBinding(storyContext.args)}>
      ${storyContext.args.itemSlotDefault}
      
      <template #description>
        ${storyContext.args.itemSlotDescription}
      </template>
    </SDropdownItem>
  </template>
</SDropdown>`) as SourceProps['transform'],
        type: 'dynamic',
        language: 'html',
      },
    },
  },
  args: {
    leftToRight: false,
    itemSlotDefault: 'Title',
    itemSlotDescription: 'Description',
    itemPropIcon: undefined,
    itemPropStatic: false,
  },
};

const createVariation = (template: string) => ({
  decorators: [() => ({ template: '<div style="padding-bottom: 200px;"><story/></div>' })],
  render: () => ({
    components: {
      SDropdown,
      SDropdownItem,
      SButton,
      SAvatar,
      ChevronDownIcon,
      PuzzlePieceIcon,
      ArrowLeftOnRectangleIcon,
      UserCircleIcon,
      PlusIcon,
      Cog8ToothIcon,
    },
    setup() {
      return {
        ChevronDownIcon,
        PuzzlePieceIcon,
        ArrowLeftOnRectangleIcon,
        UserCircleIcon,
        PlusIcon,
        PencilIcon,
        Cog8ToothIcon,
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

export const LeftToRight = createVariation(`
<SDropdown leftToRight>
  <SButton variant="secondary" :icon="ChevronDownIcon" endIcon>Options</SButton>

  <template #items>
    <SDropdownItem>
      Title
      
      <template #description>
        Description
      </template>
    </SDropdownItem>

    <SDropdownItem>
      Title
      
      <template #description>
        Description
      </template>
    </SDropdownItem>

    <SDropdownItem>
      Title
      
      <template #description>
        Description
      </template>
    </SDropdownItem>
  </template>
</SDropdown>
`);

export const WithIcon = createVariation(`
<SDropdown leftToRight>
  <SButton variant="secondary" :icon="ChevronDownIcon" endIcon>Options</SButton>

  <template #items>
    <SDropdownItem :icon="UserCircleIcon"> My Profile </SDropdownItem>
    <SDropdownItem :icon="PencilIcon"> Edit </SDropdownItem>
    <SDropdownItem :icon="PlusIcon"> Add </SDropdownItem>
    <SDropdownItem :icon="Cog8ToothIcon"> Settings </SDropdownItem>
  </template>
</SDropdown>
`);

export const WithInfoItem = createVariation(`
<SDropdown leftToRight>
  <SButton variant="secondary" :icon="ChevronDownIcon" endIcon>Options</SButton>

  <template #items>
    <!-- Info Item -->
    <SDropdownItem static>
      <div class="flex flex-col items-start">
        <span class="font-normal"> Signed in as </span>
        <span> tom@example.com </span>
      </div>
    </SDropdownItem>

    <SDropdownItem> Account Settings </SDropdownItem>
    <SDropdownItem :icon="ArrowLeftOnRectangleIcon"> Logout </SDropdownItem>
  </template>
</SDropdown>
`);

export const OnAvatarElement = createVariation(`
<SDropdown leftToRight>
  <SAvatar size="2xl" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256" />

  <template #items>
    <!-- Info Item -->
    <SDropdownItem static>
      <div class="flex flex-col items-start">
        <span class="font-normal"> Signed in as </span>
        <span> tom@example.com </span>
      </div>
    </SDropdownItem>

    <SDropdownItem> Account Settings </SDropdownItem>
    <SDropdownItem :icon="ArrowLeftOnRectangleIcon"> Logout </SDropdownItem>
  </template>
</SDropdown>
`);
