import SAvatar from './SAvatar.vue';
import { SDropdown, SDropdownItem } from '@spartan';
import { buildSourceBinding, createDefault, createHistory, createVariation as buildVariation } from '@/helpers';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/24/outline';

export default {
    component: SAvatar,
    title: 'misc/Avatar',
    ...createHistory({
        description: 'A versatile avatar component with multiple styles and appearances.',
        props: [
            {
                name: 'borderless',
                description: 'If **true**, the avatar will be borderless.',
                type: 'boolean',
                control: 'boolean',
            },
            {
                name: 'indicator',
                description: 'If **true**, the avatar will have an indicator.',
                type: 'boolean',
                control: 'boolean',
            },
            {
                name: 'indicatorPosition',
                description: 'Sets the position of the indicator.',
                type: 'left-top | left-bottom | right-top | right-bottom',
                options: ['left-top', 'left-bottom', 'right-top', 'right-bottom'],
                control: 'inline-radio',
            },
            {
                name: 'name',
                description: 'Defines the text to be used for the component.',
                type: 'string',
                control: 'text',
            },
            {
                name: 'size',
                description: 'Sets the size of the avatar.',
                type: 'xs | sm | md | lg | xl | 2xl',
                options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
                control: 'inline-radio',
            },
            {
                name: 'src',
                description: 'Defines the image source to be used for the component.',
                type: 'string',
                control: 'text',
            },
        ],
    }),
};

const sourceBinding = buildSourceBinding({
    check: ['borderless', 'indicator'],
    prop: {
        indicatorPosition: 'right-top',
        name: '?',
        size: 'md',
        src: undefined,
    },
});

export const Default = createDefault({
    design: 'https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=200-1795',
    components: { SAvatar },
    setup: () => ({ ArrowLeftEndOnRectangleIcon }),
    args: {
        borderless: false,
        indicator: false,
        indicatorPosition: 'right-top',
        name: 'John Doe',
        size: 'md',
    },
    transform: (args) => `<SAvatar ${sourceBinding(args)} />`,
    template: '<SAvatar v-bind="args" />',
});

const createVariation = (
    template: string,
    options?: {
        focus?: boolean;
        containerClass?: string;
    },
) =>
    buildVariation({
        focusVisible: options?.focus,
        components: { SAvatar, SDropdown, SDropdownItem },
        containerClass: options?.containerClass ?? 'flex gap-5',
        template,
        setup: () => {
            return { ArrowLeftEndOnRectangleIcon };
        },
    });

export const Size = createVariation(
    `
<SAvatar name="John Doe" size="xs" />
<SAvatar name="John Doe" size="sm" />
<SAvatar name="John Doe" size="md" />
<SAvatar name="John Doe" size="lg" />
<SAvatar name="John Doe" size="xl" />
<SAvatar name="John Doe" size="2xl" />
`,
    { containerClass: 'flex gap-5 items-end' },
);

export const Name = createVariation(`
<!-- separators: ' ' - _ . , ; : | -->
<SAvatar name="John Doe" size="2xl" />
<SAvatar name="richard-poe" size="2xl" />
<SAvatar name="Mark.moe" size="2xl" />
<SAvatar name="emmet:goe" size="2xl" />
<SAvatar name="roy" size="2xl" />
<SAvatar name="by" size="2xl" />
`);

export const Src = createVariation(`
<SAvatar size="2xl" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256" />
<SAvatar size="2xl" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256" />
<SAvatar size="2xl" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256" />
`);

export const Borderless = createVariation(`
<SAvatar name="John Doe" size="2xl" borderless />
<SAvatar size="2xl" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256" borderless />
`);

export const Indicator = createVariation(`
<SAvatar name="John Doe" size="2xl" indicator />
<SAvatar name="John Doe" size="2xl" indicator indicatorPosition="left-top" />
<SAvatar name="John Doe" size="2xl" indicator indicatorPosition="left-bottom" />
<SAvatar name="John Doe" size="2xl" indicator indicatorPosition="right-top" />
<SAvatar name="John Doe" size="2xl" indicator indicatorPosition="right-bottom" />
`);

export const WithDropdown = createVariation(
    `
<SDropdown>
    <template #reference>
        <SAvatar size="2xl" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256" />
    </template>

    <!-- Info Item -->
    <SDropdownItem static>
        <div class="flex flex-col items-start">
        <span class="font-normal"> Signed in as </span>
        <span> tom@example.com </span>
        </div>
    </SDropdownItem>

    <SDropdownItem :icon="ArrowLeftEndOnRectangleIcon"> Logout </SDropdownItem>
</SDropdown>
`,
    { containerClass: 'pb-[200px]' },
);
