import SModalConfirm from './SModalConfirm.vue';
import { ref } from 'vue';
import { SButton } from '../SButton';
import { createDefault, createVariation, createHistory } from '@/helpers';

export default {
    component: SModalConfirm,
    title: 'modals/ModalConfirm',
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
    components: { SModalConfirm, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModalConfirm v-bind="args" v-model:open="open" description="Are you sure you want to delete this item?" />
    
<SButton @click="() => open = true">Open Modal</SButton>`,
    transform: () => `<SModalConfirm v-model:open="open" description="Are you sure you want to delete this item?" />
    
<SButton @click="() => open = true">Open Modal</SButton>`,
    args: {
        responsive: true,
        position: 'center',
        closable: true,
    },
});

export const ChangeIcon = createVariation({
    components: { SModalConfirm, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModalConfirm v-model:open="open" description="Are you sure you want to delete this item?" icon="success" />
<SButton @click="() => open = true">Open Modal</SButton>`,
});
