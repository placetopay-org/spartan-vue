import SModal from './SModal.vue';
import { SSelectorBlock } from '@spartan';
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
            },
        ],
        slots: [
            {
                name: 'default',
                description: 'The content of the modal.',
            },
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
            },
        ],
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

export const PreventClose = createVariation({
    components: { SModal, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModal :open="open" @close="() => open = false" preventClose>
    <div class="bg-yellow-300 flex flex-col gap-10 w-80 h-36 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 justify-center items-center">
        <span>Any Element</span>

        <button class="bg-blue-300 px-4 py-2 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex items-center" @click="() => open = false">Close trigger!</button>
    </div>
</SModal>
    
<SButton @click="() => open = true">Open Modal</SButton>`,
});

export const NoResponsive = createVariation({
    components: { SModal, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModal :open="open" @close="() => open = false" :responsive="false">
    <div class="bg-yellow-300 flex flex-col gap-10 w-80 h-36 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 justify-center items-center">
        <span>Any Element</span>

        <button class="bg-blue-300 px-4 py-2 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex items-center" @click="() => open = false">Close trigger!</button>
    </div>
</SModal>
    
<SButton @click="() => open = true">Open Modal</SButton>`,
});

export const Custom = createVariation({
    components: { SModal, SButton, SSelectorBlock },
    setup: () => {
        const open = ref(false);
        const option = ref({ label: 'Option 1', value: '1' });

        const options = [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }];

        return { open, option, options };
    },
    template: `<SModal :open="open" @close="() => open = false">
    <div class="bg-yellow-300 p-8 flex flex-col gap-10 w-80 h-36 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 justify-center items-center">
        <SSelectorBlock v-model="option" :options="options" optionLabel="label" />
    
        <span>Custom: {{ option.value }}</span>
    </div>
</SModal>
    
<SButton @click="() => open = true">Open Modal</SButton>`,
});
