import SModalCard from './SModalCard.vue';
import { ref } from 'vue';
import { SButton } from '../SButton';
import { createDefault, createVariation } from '@/helpers';
import { ChatBubbleBottomCenterTextIcon, ExclamationCircleIcon, BanknotesIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';

export default {
    component: SModalCard,
    title: 'new/ModalCard',
    parameters: {
        docs: {
            description: {
                component: 'A modal component that displays a card.',
            },
        },
    },
};

export const Default = createDefault({
    components: { SModalCard, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModalCard :open="open" @close="() => open = false">
    {{ args.default }}
</SModalCard>
    
    <SButton @click="() => open = true">Open Modal Card</SButton>`,
    transform: () => `<SModal :open="open" @close="() => open = false">
    <div class="yellow-element">
        Any Element!

        <button class="blue-element" @click="() => open = false">X</button>
    </div>    
</SModal>
    
    <SButton @click="() => open = true">Open Modal</SButton>`,
    args: {},
});

export const ActionModal = createVariation({
    components: { SModalCard, SButton },
    setup: () => {
        const open = ref(false);

        return { open, ChatBubbleBottomCenterTextIcon, BanknotesIcon };
    },
    template: `<SModalCard 
    :actions="[{
        icon: BanknotesIcon,
        onClick: () => open = false,
        text: 'Go to billing',
    }]" 
    :icon="ChatBubbleBottomCenterTextIcon" 
    :open="open" 
    @close="() => open = false"
>
    <template #title>
        Trial Plan
    </template>

    <template #description>
        You don't have access to this feature, please upgrade your plan
    </template>
</SModalCard>
    
<SButton @click="() => open = true">Open Action Modal</SButton>`,
});

export const ConfirmModal = createVariation({
    components: { SModalCard, SButton },
    setup: () => {
        const open = ref(false);

        return { open, ChatBubbleBottomCenterTextIcon, ExclamationCircleIcon, CheckCircleIcon, XCircleIcon };
    },
    template: `<SModalCard 
    :actions="[{
        icon: CheckCircleIcon,
        onClick: () => open = false,
        text: 'Accept',
    },
    {
        icon: XCircleIcon,
        onClick: () => open = false,
        text: 'Cancel',
    }]" 
    :icon="ExclamationCircleIcon" 
    :open="open" 
    @close="() => open = false"
>
    <template #title>
        Delete User
    </template>

    <template #description>
        Are you sure you want to delete the user 'Jhon Doe'? This action cannot be undone.
    </template>
</SModalCard>
    
<SButton @click="() => open = true">Open Action Modal</SButton>`,
});
