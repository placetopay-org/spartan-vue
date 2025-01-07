import { ref } from 'vue';
import SInputTag from './SInputTag.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: SInputTag,
    title: 'inputs/InputTag',
    parameters: {
        docs: {
            description: {
                component:
                    'The Tooltip component is used to display additional information when users hover over on an element. It provides contextual help or details without cluttering the UI. The tooltip appears in a configurable position relative to the element it is attached to, and it can include an optional arrow to indicate its relationship with the target element.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The element that triggers the tooltip when interacted with',
        },

        // Props
        title: {
            control: 'text',
            description:
                'The content of the tooltip. This is the text that will be displayed when the tooltip is triggered.',
            table: { type: { summary: 'string' } },
        },
        color: {
            control: 'select',
            options: ['dark', 'light', 'auto'],
            description:
                'The color scheme of the tooltip. This will determine the background and text color of the tooltip.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'auto' },
            },
        },
    },
};

const sourceBinding = buildSourceBinding({
    prop: { title: undefined, color: 'auto' },
});

export const Default = createDefault({
    components: { SInputTag },
    containerClass: 'mb-20',
    setup: () => {
        const value = ref(['tag1', 'tag2', 'tag3']);

        return { value };
    },
    template: `
<SInputTag v-bind="args" v-model="value" />

<p>Value:</p>
<pre>{{ value }}</pre>
`,
    transform: (args) => `
<!-- tags: ['tag1', 'tag2', 'tag3'] -->
<SInputTag v-model="tags" ${sourceBinding(args)}/>`,
    args: {
    },
});

export const Base = createVariation({
    components: { SInputTag },
    containerClass: 'mb-20',
    setup: () => {
        const value = ref(['tag1', 'tag2', 'tag3']);

        return { value };
    },
    template: `
<!-- tags: ['tag1', 'tag2', 'tag3'] -->
<SInputTag v-model="value" />`,
});

export const LongExample = createDefault({
    components: { SInputTag },
    containerClass: 'mb-20',
    setup: () => {
        const value = ref(['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit sed do eiusmod tempor', 'incididunt ut labore et dolore magna aliqua Ut enim', 'ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum']);

        return { value };
    },
    template: `<SInputTag v-bind="args" v-model="value" />`,
    transform: (args) => `
<SInputTag v-model="tags" ${sourceBinding(args)}/>`,
    args: {
    },
});