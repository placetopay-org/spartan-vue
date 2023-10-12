import SModalCard from './SModalCard.vue';
import { ref } from 'vue';
import { SInputBlock } from '../SInputBlock';
import { SButton } from '../SButton';
import { createDefault, createVariation } from '@/helpers';
import {
    ChatBubbleBottomCenterTextIcon,
    ExclamationCircleIcon,
    BanknotesIcon,
    CheckCircleIcon,
    XCircleIcon,
    PencilSquareIcon,
} from '@heroicons/vue/24/outline';

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
    argTypes: {
        // Slots
        default: {
            control: 'text',
            description: 'The content of the modal.',
            table: { type: { summary: 'VNode | VNode Array' } },
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
    args: {
        default: 'Card content on the modal!',
    },
});

export const ActionModal = createVariation({
    components: { SModalCard, SButton, SInputBlock },
    setup: () => {
        const open1 = ref(false);
        const open2 = ref(false);
        const onSubmit = () => {};

        return { open1, open2, onSubmit, ChatBubbleBottomCenterTextIcon, BanknotesIcon, PencilSquareIcon };
    },
    template: `<!-- Modal #1 -->
<SModalCard 
    class="w-96"
    :actions="[{
        icon: BanknotesIcon,
        onClick: () => open1 = false,
        text: 'Go to billing',
    }]" 
    :icon="ChatBubbleBottomCenterTextIcon" 
    :open="open1" 
    @close="() => open1 = false"
>
    <template #title>
        Trial Plan
    </template>

    <template #description>
        You don't have access to this feature, please upgrade your plan
    </template>
</SModalCard>

<!-- Modal #2 -->
<SModalCard
    class="w-96"
    :icon="ChatBubbleBottomCenterTextIcon" 
    :open="open2" 
    @close="() => open2 = false"
>
    <template #title>
        Trial Plan
    </template>

    <template #description>
        You don't have access to this feature, please upgrade your plan
    </template>

    <SButton :icon="BanknotesIcon" class="w-full mt-6" variant="primary" @click="() => open2 = false">
        Go to billing
    </SButton>
</SModalCard>
    
<SButton @click="() => open1 = true">Action Modal</SButton>
<SButton @click="() => open2 = true">Custom Action Modal</SButton>`,
});

export const ConfirmModal = createVariation({
    components: { SModalCard, SButton, SInputBlock },
    setup: () => {
        const open1 = ref(false);
        const open2 = ref(false);
        const open3 = ref(false);

        return {
            open1,
            open2,
            open3,
            ExclamationCircleIcon,
            CheckCircleIcon,
            XCircleIcon,
            PencilSquareIcon,
        };
    },
    template: `<!-- Modal #1 -->
<SModalCard 
    :actions="[{
        icon: XCircleIcon,
        onClick: () => open1 = false,
        text: 'Cancel',
    },{
        icon: CheckCircleIcon,
        onClick: () => open1 = false,
        text: 'Accept',
    }]" 
    :icon="ExclamationCircleIcon" 
    iconVariant="danger"
    :open="open1" 
    @close="() => open1 = false"
>
    <template #title>
        Delete User
    </template>

    <template #description>
        Are you sure you want to delete the user 'Jhon Doe'? This action cannot be undone.
    </template>
</SModalCard>

<!-- Modal #2 -->
<SModalCard
    class="w-96"
    :icon="PencilSquareIcon" 
    iconClass="text-gray-500"
    iconContainerClass="bg-gray-100"
    :open="open2" 
    @close="() => open2 = false"
>
    <template #title>
        Edit payment method
    </template>

    <form @submit.prevent="onSubmit">
        <SInputBlock
            id="alias"
            label="Alias" 
            placeholder="My custom name"
        />
        <div class="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
            <SButton class="w-full" variant="primary" type="submit">
                Save
            </SButton>
            <SButton class="w-full" variant="secondary" @click="() => open2 = false">
                Cancel
            </SButton>
        </div>
    </form>
</SModalCard>

<!-- Modal #3 -->
<SModalCard
    :icon="ExclamationCircleIcon" 
    iconVariant="danger"
    :open="open3" 
    @close="() => open3 = false"
>
    <template #title>
        Delete means of payment
    </template>

    <template #description>
        Are you absolutely sure that you want to delete the payment method that ends in 1155? This action cannot be reversed.
    </template>

    <form @submit.prevent="onSubmit">
        <div class="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
            <SButton class="w-full" variant="danger" type="submit">
                Delete
            </SButton>
            <SButton class="w-full" variant="secondary" @click="() => open3 = false">
                Cancel
            </SButton>
        </div>
    </form>
</SModalCard>
    
<SButton @click="() => open1 = true">Example #1</SButton>
<SButton @click="() => open2 = true">Example #2</SButton>
<SButton @click="() => open3 = true">Example #3</SButton>`,
});
