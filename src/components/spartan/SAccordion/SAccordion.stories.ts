import SAccordion from './SAccordion.vue';
import { buildSourceBinding, createDefault } from '@/helpers';
import { Bars4Icon, XMarkIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';

export default {
    component: SAccordion,
    title: 'new/Accordion',
    parameters: {
        docs: {
            description: {
                component: 'A simple accordion component layout.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: { type: null },
            table: { type: { summary: 'VNode | VNode Array' }, category: 'Slots' },
            description: 'The content of the accordion.',
        },

        // Props
        class: {
            control: { type: null },
            description: 'The class attribute.',
            table: { type: { summary: 'string' } },
        },
        open: {
            control: { type: null },
            description: 'Whether the accordion is open or not.',
            table: { type: { summary: 'boolean' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SAccordion, Bars4Icon, XMarkIcon },
    containerClass: 'flex gap-2',
    setup: () => {
        const open = ref(true);
        return { open };
    },
    template: `<div class="flex flex-col gap-2">
    <button class="bg-blue-300 px-4 py-1 h-fit border-dashed border-4 border-blue-600 font-bold text-blue-800 flex justify-center items-center" @click="open = true">Open</button>
    <button class="bg-red-300 px-4 py-1 h-fit border-dashed border-4 border-red-600 font-bold text-red-800 flex justify-center items-center" @click="open = false">Close</button>    
</div>

    
<SAccordion :open="open">
<div class="bg-yellow-300 w-80 h-full border-dashed border-4 border-yellow-600 font-bold text-yellow-800">
    <div class="flex justify-center items-center h-full">Any Element Too!</div>
</div> 
</SAccordion>`,
    transform: (args) => `<SAccordion ${sourceBinding(args)}>${args.default}</SAccordion>`,
    args: {
        open: false,
    },
});
