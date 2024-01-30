import { buildSourceBinding, createDefault, createHistory } from '@/helpers';
import SAccordion from './SAccordion.vue';
import { Bars4Icon, XMarkIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';

export default {
    component: SAccordion,
    title: 'misc/Accordion',
    ...createHistory({
        description: 'A simple accordion component layout.',
        slots: [{ name: 'default', description: 'The content of the accordion.' }],
        props: [
            {
                name: 'class',
                description: 'The class attribute.',
                type: 'string',
                control: null,
            },
            {
                name: 'open',
                description: 'Whether the accordion is open or not.',
                type: 'boolean',
                control: null,
            },
            {
                name: 'vertical',
                description: 'Whether the accordion is vertical or not.',
                default: 'false',
                type: 'boolean',
            },
        ],
    }),
};

const sourceBinding = buildSourceBinding({
    check: ['vertical']
});

export const Default = createDefault({
    components: { SAccordion, Bars4Icon, XMarkIcon },
    containerClass: 'h-[600px] w-[600px] flex',
    setup: () => {
        const open = ref(false);
        return { open };
    },
    args: {
        vertical: false,
    },
    transform: (args) => `
    <SAccordion class="w-[150px]" :open="open" ${sourceBinding(args)}>
        <div class="relative bg-yellow-300 h-full w-[150px] border-dashed border-4 border-yellow-600 font-bold text-yellow-800 flex justify-center items-center">
            Any Element!
            <button class="absolute right-4 top-4" @click="open = false">
                <span class="sr-only">Close</span>
                <XMarkIcon class="h-7 w-7"/>
            </button>
        </div>     
    </SAccordion>

    <div class="relative bg-blue-300 flex-1 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex justify-center items-center">
        Other content
        <button v-if="!open" class="absolute left-4 top-4" @click="open = true">
            <span class="sr-only">Open</span>
            <Bars4Icon class="h-7 w-7"/>
        </button>
    </div>`,
    template: `
    <SAccordion class="w-[150px]" :open="open" v-bind="args">
        <div class="relative bg-yellow-300 h-full w-[150px] border-dashed border-4 border-yellow-600 font-bold text-yellow-800 flex justify-center items-center">
            Any Element!
            <button class="absolute right-4 top-4" @click="open = false">
                <span class="sr-only">Close</span>
                <XMarkIcon class="h-7 w-7"/>
            </button>
        </div>     
    </SAccordion>

    <div class="relative bg-blue-300 flex-1 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex justify-center items-center">
        Other content
        <button v-if="!open" class="absolute left-4 top-4" @click="open = true">
            <span class="sr-only">Open</span>
            <Bars4Icon class="h-7 w-7"/>
        </button>
    </div>`,
});
