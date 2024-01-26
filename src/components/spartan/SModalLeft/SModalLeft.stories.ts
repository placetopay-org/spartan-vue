import SModalLeft from './SModalLeft.vue';
import { ref } from 'vue';
import { SButton } from '../SButton';
import { createDefault, createVariation } from '@/helpers';

export default {
    component: SModalLeft,
    title: 'modals/ModalLeft',
    parameters: {
        docs: {
            description: {
                component: 'A modal is a dialog box/popup window that is displayed on top of the current page.',
            },
        },
    },
    argTypes: {
        // Events
        close: {
            control: { type: null },
            description: 'Emitted when the modal is closed.',
            table: { type: { summary: null }, category: 'Events' },
        },

        // Slots
        default: {
            control: { type: null },
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the modal.',
        },

        // Props
        open: {
            control: { type: null },
            description: 'Whether the modal is open or not.',
            table: { type: { summary: 'boolean' } },
        },
    },
};

export const Default = createDefault({
    components: { SModalLeft, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModalLeft :open="open" @close="() => open = false">
    <div class="bg-yellow-300 flex flex-col gap-8 w-80 h-full border-dashed border-4 border-yellow-600 font-bold text-yellow-800 justify-center items-center">
        Any Element!

        <button class="bg-blue-300 px-2 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex items-center" @click="() => open = false">X</button>
    </div>
</SModalLeft>
    
    <SButton @click="() => open = true">Open Modal</SButton>`,
    transform: () => `<SModalLeft :open="open" @close="() => open = false">
    <div class="yellow-element">
        Any Element!

        <button class="blue-element" @click="() => open = false">X</button>
    </div>    
</SModalLeft>
    
    <SButton @click="() => open = true">Open Modal</SButton>`,
    args: {
        default: undefined,
        open: undefined,
        close: undefined,
    },
});

export const WithCloseTrigger = createVariation({
    components: { SModalLeft, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModalLeft :open="open" @close="() => open = false">
    <div class="bg-yellow-300 flex flex-col gap-10 w-80 h-full border-dashed border-4 border-yellow-600 font-bold text-yellow-800 justify-center items-center">
        <span>Any Element</span>

        <button class="bg-blue-300 px-4 py-2 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex items-center" @click="() => open = false">Close trigger!</button>
    </div>
</SModalLeft>
    
<SButton @click="() => open = true">Open Modal</SButton>`,
});
