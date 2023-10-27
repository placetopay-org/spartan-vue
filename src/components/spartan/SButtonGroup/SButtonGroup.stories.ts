import SButtonGroup from './SButtonGroup.vue';
import SButtonGroupItem from './SButtonGroupItem.vue';
import { SDropdown, SDropdownItem } from '../SDropdown';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';
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

const sourceBinding = buildSourceBinding({
    check: ['active', 'disabled', 'endIcon', 'first', 'last', 'next', 'prev'],
    custom: { icon: true },
});

export const Default = createDefault({
    components: { SButtonGroup, SButtonGroupItem, BookmarkIcon, PlusIcon, PencilIcon, ChevronDownIcon },
    setup: () => {
        const getIcon = (icon: 'BookmarkIcon' | 'PlusIcon' | 'PencilIcon' | 'ChevronDownIcon') => {
            if (icon === 'BookmarkIcon') return BookmarkIcon;
            if (icon === 'PlusIcon') return PlusIcon;
            if (icon === 'PencilIcon') return PencilIcon;
            if (icon === 'ChevronDownIcon') return ChevronDownIcon;
        };
        return { getIcon };
    },
    args: {
        default: 'Item',
        active: false,
        disabled: false,
        endIcon: false,
        first: false,
        icon: undefined,
        last: false,
        next: false,
        prev: false,
    },
    template: `<SButtonGroup><SButtonGroupItem v-bind="args" :icon="getIcon(args.icon)">{{ args.default }}</SButtonGroupItem></SButtonGroup>`,
    transform: (args) => `<SButtonGroup>
    <SButtonGroupItem ${sourceBinding(args)}>${args.default}</SButtonGroupItem>
</SButtonGroup>`,
});

export const Base = createVariation({
    components: { SButtonGroup, SButtonGroupItem },
    template: `<SButtonGroup>
    <SButtonGroupItem> one </SButtonGroupItem>
    <SButtonGroupItem> two </SButtonGroupItem>
    <SButtonGroupItem> three </SButtonGroupItem>
</SButtonGroup>`,
});

export const Rounded = createVariation({
    components: { SButtonGroup, SButtonGroupItem },
    template: `<SButtonGroup>
    <SButtonGroupItem first> one </SButtonGroupItem>
    <SButtonGroupItem> two </SButtonGroupItem>
    <SButtonGroupItem last> three </SButtonGroupItem>
</SButtonGroup>`,
});

export const WithNavigation = createVariation({
    components: { SButtonGroup, SButtonGroupItem },
    template: `<SButtonGroup>
    <SButtonGroupItem prev />
    <SButtonGroupItem v-for="i in ['day', 'week', 'month', 'year']">{{ i }}</SButtonGroupItem>
    <SButtonGroupItem next />
</SButtonGroup>`,
});

export const WithActiveItem = createVariation({
    components: { SButtonGroup, SButtonGroupItem },
    template: `<SButtonGroup>
    <SButtonGroupItem active first>Page 1</SButtonGroupItem>
    <SButtonGroupItem>Page 2</SButtonGroupItem>
    <SButtonGroupItem>Page 3</SButtonGroupItem>
    <SButtonGroupItem>...</SButtonGroupItem>
    <SButtonGroupItem next last />
</SButtonGroup>`,
});

export const WithDisableItem = createVariation({
    components: { SButtonGroup, SButtonGroupItem },
    template: `<SButtonGroup>
    <SButtonGroupItem v-for="(i, index) in 5" :disabled="index === 3">{{ \`\${i + 28}. Section\` }}</SButtonGroupItem>
    <SButtonGroupItem next last />
</SButtonGroup>`,
});

export const WithIcons = createVariation({
    components: { SButtonGroup, SButtonGroupItem },
    setup: () => {
        return { UserCircleIcon, PlusIcon };
    },
    template: `<SButtonGroup>
    <SButtonGroupItem :icon="UserCircleIcon" first>John Doe</SButtonGroupItem>
    <SButtonGroupItem :icon="UserCircleIcon">Mark Moe</SButtonGroupItem>
    <SButtonGroupItem :icon="PlusIcon" last/>
</SButtonGroup>`,
});

export const Pagination = createVariation({
    components: { SButtonGroup, SButtonGroupItem },
    template: `<SButtonGroup>
    <SButtonGroupItem prev first />
    <SButtonGroupItem v-for="(i, index) in 9" :active="index === 4">{{ i }}</SButtonGroupItem>
    <SButtonGroupItem next last />
</SButtonGroup>`,
});

export const Customize = createVariation({
    components: { SButtonGroup, SButtonGroupItem },
    setup: () => {
        return { BookmarkIcon, PlusIcon, PencilIcon, ChevronDownIcon };
    },
    template: `<SButtonGroup>
    <SButtonGroupItem prev first />
    <SButtonGroupItem>Days</SButtonGroupItem>
    <SButtonGroupItem disabled>Weeks</SButtonGroupItem>
    <SButtonGroupItem :icon="PlusIcon"/>
    <SButtonGroupItem :icon="BookmarkIcon">Months</SButtonGroupItem>
    <SButtonGroupItem active>29</SButtonGroupItem>
    <SButtonGroupItem :icon="PencilIcon" endIcon>Years</SButtonGroupItem>
    <SButtonGroupItem :icon="ChevronDownIcon" endIcon>Menu</SButtonGroupItem>
    <SButtonGroupItem next last />
</SButtonGroup>`,
});

export const WithDropdown = createVariation({
    components: { SButtonGroup, SButtonGroupItem, SDropdown, SDropdownItem },
    containerClass: 'h-[180px] pl-20',
    setup: () => {
        return { ChevronDownIcon, UserCircleIcon, PencilIcon, PlusIcon };
    },
    template: `<SButtonGroup>
    <SButtonGroupItem first>Save changes</SButtonGroupItem>
    <SDropdown>
        <SButtonGroupItem :icon="ChevronDownIcon" last />

        <template #items>
            <SDropdownItem :icon="UserCircleIcon"> My Profile </SDropdownItem>
            <SDropdownItem :icon="PencilIcon"> Edit </SDropdownItem>
            <SDropdownItem :icon="PlusIcon"> Add </SDropdownItem>
        </template>
    </SDropdown>
</SButtonGroup>`,
});
