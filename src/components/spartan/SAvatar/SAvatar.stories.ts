/* eslint-disable no-useless-escape */

import SAvatar from './SAvatar.vue';
import { SDropdown, SDropdownItem } from '@spartan';
import type { SourceProps } from '@storybook/blocks';
import { buildDesign, buildSourceBinding } from '@/helpers';
import { ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline';

export default {
    component: SAvatar,
    title: 'misc/Avatar',
    parameters: {
        docs: {
            description: {
                component: 'A versatile avatar component with multiple styles and appearances.',
            },
        },
    },
    argTypes: {
        // Props
        borderless: {
            description: 'If **true**, the avatar will be borderless.',
            table: { type: { summary: 'boolean' } },
        },
        indicator: {
            description: 'If **true**, the avatar will have an indicator.',
            table: { type: { summary: 'boolean' } },
        },
        indicatorPosition: {
            control: 'inline-radio',
            options: ['left-top', 'left-bottom', 'right-top', 'right-bottom'],
            description: 'Sets the position of the indicator.',
            table: {
                type: { summary: 'left-top | left-bottom | right-top | right-bottom' },
            },
        },
        name: {
            control: 'text',
            description: 'Defines the text to be used for the component.',
            table: { type: { summary: 'string' } },
        },
        size: {
            control: 'inline-radio',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
            description: 'Sets the size of the avatar.',
            table: { type: { summary: 'xs | sm | md | lg | xl | 2xl' } },
        },
        src: {
            control: 'text',
            description: 'Defines the image source to be used for the component.',
            table: { type: { summary: 'string' } },
        },
    },
};

const design = buildDesign('https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=200-1795');

const sourceBinding = buildSourceBinding({
    check: ['borderless', 'indicator'],
    prop: {
        indicatorPosition: 'right-top',
        name: '?',
        size: 'md',
        src: undefined,
    },
});

export const Default = {
    render: (args: any) => ({
        components: { SAvatar },
        setup() {
            return { args };
        },
        template: '<SAvatar v-bind="args" />',
    }),
    parameters: {
        design,
        docs: {
            canvas: { layout: 'centered' },
            source: {
                transform: ((_, storyContext) => `
        <SAvatar ${sourceBinding(storyContext.args)} />
        `) as SourceProps['transform'],
                type: 'dynamic',
                language: 'html',
            },
        },
    },
    args: {
        borderless: false,
        indicator: false,
        indicatorPosition: 'right-top',
        name: 'John Doe',
        size: 'md',
    },
};

const createVariation = (
    template: string,
    options?: {
        focusVisible?: boolean;
        decorators?: (() => {
            template: string;
        })[];
    },
) => ({
    decorators: options?.decorators ?? [
        () => ({
            template: '<div style="gap: 20px; display: flex; align-items: end;"><story/></div>',
        }),
    ],
    render: () => ({
        components: { SAvatar, SDropdown, SDropdownItem, ArrowLeftOnRectangleIcon },
        setup() {
            return { ArrowLeftOnRectangleIcon };
        },
        template,
    }),
    parameters: {
        design,
        pseudo: { focusVisible: options?.focusVisible },
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

export const Size = createVariation(`
<SAvatar name="John Doe" size="xs" />
<SAvatar name="John Doe" size="sm" />
<SAvatar name="John Doe" size="md" />
<SAvatar name="John Doe" size="lg" />
<SAvatar name="John Doe" size="xl" />
<SAvatar name="John Doe" size="2xl" />
`);

export const Name = createVariation(`
<!-- separators: ' ' - _ . , ; : | \ -->
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

export const Focus = createVariation(
    `
<!-- focus-visible: ON -->
<SAvatar name="John Doe" size="2xl" />
<SAvatar size="2xl" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256" />
`,
    { focusVisible: true },
);

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

    <SDropdownItem :icon="ArrowLeftOnRectangleIcon"> Logout </SDropdownItem>
  </template>
</SDropdown>
`,
    {
        decorators: [
            () => ({
                template: '<div style="padding-bottom: 200px;"><story/></div>',
            }),
        ],
    },
);
