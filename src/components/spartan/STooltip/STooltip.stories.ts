import STooltip from './STooltip.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: STooltip,
    title: 'misc/Tooltip',
    parameters: {
        docs: {
            description: {
                component: 'The link component is used to navigate between pages.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the link.',
        },
        description: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the link.',
        },

        // Props
        type: {
            control: 'select',
            options: ['success', 'danger', 'warning'],
            description: 'The type of the input element.',
            table: { type: { summary: 'success | danger | warning' } },
        },
        leftBorder: {
            control: 'boolean',
            description: 'The type of the input element.',
            table: { type: { summary: 'boolean' } },
        },
    },
};

const sourceBinding = buildSourceBinding({
    prop: { title: undefined }
});

export const Default = createDefault({
    components: { STooltip },
    containerClass: 'mb-20',
    template: `
<div class="dark">
<STooltip v-bind="args">
    <div class="bg-yellow-300 w-full md:w-80 h-20 px-8 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 flex justify-center items-center">Any Element</div>
</STooltip>
</div>`,
    transform: (args) => `
<STooltip ${sourceBinding(args)}>
    <div class="bg-yellow-300 w-full md:w-80 h-20 px-8 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 flex justify-center items-center">Any Element</div>
</STooltip>`,
    args: {
        title: 'Tooltip!',
    },
});
