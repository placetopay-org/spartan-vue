import SModal from './SModal.vue';
import SModalTitle from './SModalTitle.vue';
import SModalDescription from './SModalDescription.vue';
import { ref } from 'vue';
import { SButton } from '../SButton';
import { createDefault, createVariation, createHistory } from '@/helpers';

export default {
    component: SModal,
    title: 'modals/Modal',
    ...createHistory({
        description: 'A modal is a dialog box/popup window that is displayed on top of the current page.',
        events: [
            {
                name: 'close',
                description: 'Emitted when the modal is closed.',
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'The content of the modal.',
            }
        ],
        props: [
            {
                name: 'open',
                type: 'boolean',
                default: 'false',
                description: 'Whether the modal is open or not.',
                control: null,
            },
            {
                name: 'responsive',
                type: 'boolean',
                default: 'true',
                description: 'Whether the modal is responsive or not.',
                control: 'boolean',
            },
            {
                name: 'position',
                type: 'string',
                default: 'center',
                description: 'The position of the modal.',
                options: ['top', 'nearTop', 'center', 'bottom'],
                control: 'select',
            }
        ]
    }),
};

export const Default = createDefault({
    components: { SModal, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModal v-bind="args" :open="open" @close="() => open = false">
    <div class="bg-yellow-300 flex flex-col gap-8 w-full sm:w-80 h-36 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 justify-center items-center">
        Any Element!

        <button class="bg-blue-300 px-2 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex items-center" @click="() => open = false">X</button>
    </div>
</SModal>
    
    <SButton @click="() => open = true">Open Modal</SButton>`,
    transform: () => `<SModal :open="open" @close="() => open = false">
    <div class="yellow-element">
        Any Element!

        <button class="blue-element" @click="() => open = false">X</button>
    </div>    
</SModal>
    
    <SButton @click="() => open = true">Open Modal</SButton>`,
    args: {
        default: undefined,
        open: undefined,
        close: undefined,
        responsive: true,
        position: 'center',
    },
});

export const WithCloseTrigger = createVariation({
    components: { SModal, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModal :open="open" @close="() => open = false">
    <div class="bg-yellow-300 flex flex-col gap-10 w-80 h-36 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 justify-center items-center">
        <span>Any Element</span>

        <button class="bg-blue-300 px-4 py-2 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex items-center" @click="() => open = false">Close trigger!</button>
    </div>
</SModal>
    
<SButton @click="() => open = true">Open Modal</SButton>`,
});

export const WithAccessibleTitle = createVariation({
    components: { SModal, SButton, SModalTitle },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModal :open="open" @close="() => open = false">
    <div class="bg-yellow-300 flex flex-col gap-10 w-80 h-36 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 justify-center items-center">
        <SModalTitle class="bg-red-300 px-4 py-1 border-4 border-dashed border-red-600">Modal Title</SModalTitle>
    
        <span>Any Element</span>
    </div>
</SModal>
    
<SButton @click="() => open = true">Open Modal</SButton>`,
});

export const WithAccessibleDescription = createVariation({
    components: { SModal, SButton, SModalDescription },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModal :open="open" @close="() => open = false">
    <div class="p-4 bg-yellow-300 gap-4 flex flex-col w-80 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 items-center">
        <span>Any Element</span>

        <SModalDescription class="bg-green-300 px-10 py-20 border-4 border-dashed border-green-600 text-base">Modal Description!</SModalDescription>
    </div>
</SModal>
    
<SButton @click="() => open = true">Open Modal</SButton>`,
});
