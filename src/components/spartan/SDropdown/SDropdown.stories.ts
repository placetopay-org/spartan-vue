import SDropdown from './SDropdown.vue';
import SDropdownItem from './SDropdownItem.vue';
import { SAvatar, SButton } from '@spartan';
import type { SourceProps } from '@storybook/blocks';
import { action } from '@storybook/addon-actions';
import { buildDesign, buildSourceBinding, createDefault, createVariation as buildVariation } from '@/helpers';
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
    title: 'inputs/Dropdown',
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
            table: {
                type: { summary: 'VNode | VNode Array' },
                category: 'Item - Slots',
            },
        },
        itemSlotDescription: {
            name: 'description',
            control: 'text',
            description: 'Slot for item description.',
            table: {
                type: { summary: 'VNode | VNode Array' },
                category: 'Item - Slots',
            },
        },

        // Item - Props
        itemPropIcon: {
            name: 'icon',
            control: 'select',
            options: ['PuzzlePieceIcon', 'ArrowLeftOnRectangleIcon', 'PencilIcon'],
            description: `A Vue functional component to be used as the item's icon.`,
            table: {
                type: { summary: 'FunctionalComponent' },
                category: 'Item - Props',
            },
        },
        itemPropDisabled: {
            name: 'disabled',
            description: 'If **true**, the item will be disabled and non-interactive.',
            table: { type: { summary: 'boolean' }, category: 'Item - Props' },
        },
    },
};

const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4813%3A18985');

const sourceBinding = buildSourceBinding({
    check: ['leftToRight'],
});

const itemsSourceBinding = buildSourceBinding(
    {
        check: ['disabled'],
        custom: { icon: true },
    },
    'item',
);

export const Default = createDefault({
    components: {
        SDropdown,
        SDropdownItem,
        SButton,
        ChevronDownIcon,
        PuzzlePieceIcon,
    },
    containerClass: 'flex justify-center items-center h-[500px] w-[500px]',
    setup: () => {
        const getIcon = (icon: 'PuzzlePieceIcon' | 'ArrowLeftOnRectangleIcon' | 'PencilIcon') => {
            if (icon === 'PuzzlePieceIcon') return PuzzlePieceIcon;
            if (icon === 'ArrowLeftOnRectangleIcon') return ArrowLeftOnRectangleIcon;
            if (icon === 'PencilIcon') return PencilIcon;
        };
        return { getIcon, ChevronDownIcon };
    },
    args: {
        itemSlotDefault: 'Title',
        itemPropIcon: 'PuzzlePieceIcon',
        itemSlotDescription: 'Description',
    },
    template: `
<SDropdown v-bind="args">
  <template #reference>
    <SButton variant="secondary" :right-icon="ChevronDownIcon">Options</SButton>
  </template>

  <SDropdownItem @click="console.log('title')" :icon="getIcon(args.itemPropIcon)" :disabled="args.itemPropDisabled">
    {{ args.itemSlotDefault }}

    <template #description>
      {{ args.itemSlotDescription }}
    </template>
  </SDropdownItem>

  <SDropdownItem :icon="getIcon(args.itemPropIcon)" :disabled="args.itemPropDisabled">
    {{ args.itemSlotDefault }}

    <template #description>
      {{ args.itemSlotDescription }}
    </template>
  </SDropdownItem>

  <SDropdownItem :icon="getIcon(args.itemPropIcon)" :disabled="args.itemPropDisabled">
    {{ args.itemSlotDefault }}

    <template #description>
      {{ args.itemSlotDescription }}
    </template>
  </SDropdownItem>
</SDropdown>`,
});

const createVariation = (template: string) => ({
    decorators: [() => ({ template: '<div class="h-[250px] w-[500px]"><story/></div>' })],
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

export const Placement = createVariation(`
<SDropdown placement="right-start">
  <template #reference>
    <SButton variant="secondary" :right-icon="ChevronDownIcon">Options</SButton>
  </template>

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
</SDropdown>
`);

export const Offset = createVariation(`
<SDropdown :offset="16" placement="bottom-end">
  <template #reference>
    <SButton variant="secondary" :right-icon="ChevronDownIcon">Options</SButton>
  </template>

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
</SDropdown>
`);

export const WithIcon = createVariation(`
<SDropdown placement="bottom-end">
  <template #reference>
    <SButton variant="secondary" :right-icon="ChevronDownIcon">Options</SButton>
  </template>

  <SDropdownItem :icon="UserCircleIcon"> My Profile </SDropdownItem>
  <SDropdownItem :icon="PencilIcon"> Edit </SDropdownItem>
  <SDropdownItem :icon="PlusIcon"> Add </SDropdownItem>
  <SDropdownItem :icon="Cog8ToothIcon"> Settings </SDropdownItem>
</SDropdown>
`);

export const AsLink = buildVariation({
    containerClass: 'h-[250px] w-[500px]',
    components: {
        SDropdown,
        SDropdownItem,
        SButton,
    },
    setup() {
        return {
            ChevronDownIcon,
            UserCircleIcon,
            PencilIcon,
            PlusIcon,
            Cog8ToothIcon,
        };
    },
    template: `
<SDropdown>
  <template #reference>
    <SButton variant="secondary" :right-icon="ChevronDownIcon">Options</SButton>
  </template>

  <SDropdownItem :icon="UserCircleIcon" link="/profile"> My Profile </SDropdownItem>
  <SDropdownItem :icon="PencilIcon" link="/edit"> Edit </SDropdownItem>
  <SDropdownItem :icon="PlusIcon" link="/add"> Add </SDropdownItem>
  <SDropdownItem :icon="Cog8ToothIcon" link="/settings"> Settings </SDropdownItem>
</SDropdown>  
`,
});

export const OnAvatarElement = createVariation(`
<SDropdown leftToRight>
  <template #reference>
    <SAvatar size="2xl" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256" />
  </template>

  <!-- Info Item -->
  <SDropdownItem disabled>
    <div class="flex flex-col items-start">
      <span class="font-normal"> Signed in as </span>
      <span> tom@example.com </span>
    </div>
  </SDropdownItem>

  <SDropdownItem> Account Settings </SDropdownItem>
  <SDropdownItem :icon="ArrowLeftOnRectangleIcon"> Logout </SDropdownItem>
</SDropdown>
`);
