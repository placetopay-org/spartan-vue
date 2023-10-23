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
                component: 'A simple accordion component.',
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
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SAccordion, Bars4Icon, XMarkIcon },
    containerClass: 'h-[600px] w-[600px] flex',
    setup: () => {
        const accordionRef = ref(null);
        return { accordionRef };
    },
    template: `<SAccordion class="w-[150px]" ref="accordionRef">
    <div class="relative bg-yellow-300 h-full w-[150px] border-dashed border-4 border-yellow-600 font-bold text-yellow-800 flex justify-center items-center">
    Any Element!
    <button class="absolute right-4 top-4" @click="accordionRef?.toggle"><XMarkIcon class="h-7 w-7"/></button>
</div>     
</SAccordion>

<div class="relative bg-blue-300 flex-1 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex justify-center items-center">
    Other content
    <button v-if="!accordionRef?.state" class="absolute left-4 top-4" @click="accordionRef?.toggle"><Bars4Icon class="h-7 w-7"/></button>
</div>`,
    transform: (args) => `<SAccordion ${sourceBinding(args)}>${args.default}</SAccordion>`,
    args: {},
});
