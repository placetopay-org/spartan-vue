import STooltip from './STooltip.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: STooltip,
    title: 'misc/Tooltip',
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
    components: { STooltip },
    containerClass: 'mb-20',
    template: `
<STooltip v-bind="args">
    <div class="bg-yellow-300 w-full md:w-80 h-20 px-8 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 flex justify-center items-center">Any Element</div>
</STooltip>
`,
    transform: (args) => `
<STooltip ${sourceBinding(args)}>
    <div class="bg-yellow-300 w-full md:w-80 h-20 px-8 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 flex justify-center items-center">Any Element</div>
</STooltip>`,
    args: {
        title: 'Tooltip!',
        color: 'dark',
    },
});
