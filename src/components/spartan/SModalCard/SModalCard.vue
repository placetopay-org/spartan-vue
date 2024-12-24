<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';
import { SCard, type TCardProps } from '../SCard';
import { SModal, type TModalProps } from '../SModal';
import type { TModalCardEmits } from './types';

defineEmits<TModalCardEmits>();

const props = withDefaults(defineProps<Partial<TModalProps> & Partial<TCardProps>>(), {
    // SModal props
    open: false,

    // SCard props
    class: '',
    size: 'md',
    icon: undefined,
    actions: undefined,
});

const modalProps = computed(() => ({
    open: props.open,
    preventClose: props.preventClose,
}));

const cardProps = computed(() => ({
    class: twMerge('w-full sm:max-w-lg', props.class),
    size: props.size,
    icon: props.icon,
    actions: props.actions,
}));
</script>

<template>
    <SModal v-bind="modalProps" @close="$emit('close')">
        <SCard v-bind="cardProps">
            <slot />
            <template #actions>
                <slot name="actions" />
            </template>
        </SCard>
    </SModal>
</template>
