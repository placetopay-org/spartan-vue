<script setup lang="ts">
import { computed } from 'vue';
import { SCard } from '../SCard';
import { SModal, type TModalProps } from '../SModal';
import type { TCardProps } from '../SCard';

defineEmits(['close']);

const props = withDefaults(defineProps<Partial<TModalProps> & Partial<TCardProps>>(), {
    // SModal props
    open: false,

    // SCard props
    size: 'md',
    bodyAccent: false,
    headerAccent: false,
    footerAccent: false,
    bodyClass: '',
    headerClass: '',
    footerClass: '',
    icon: undefined,
    actions: undefined,
});

const modalProps = computed(() => ({
    open: props.open,
}));

const cardProps = computed(() => ({
    ...props,
    open: undefined,
}));
</script>

<template>
    <SModal v-bind="modalProps" @close="$emit('close')">
        <SCard v-bind="cardProps">
            <template #title><slot name="title" /></template>
            <slot />
            <template #description><slot name="description" /></template>
        </SCard>
    </SModal>
</template>
