<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';
import { SCard, type TCardProps } from '../SCard';
import { SModal, SModalTitle, SModalDescription, type TModalProps } from '../SModal';
import type { TModalCardEmits } from './types';

defineEmits<TModalCardEmits>();

const props = withDefaults(defineProps<Partial<TModalProps> & Partial<TCardProps>>(), {
    // SModal props
    open: false,

    // SCard props
    class: '',
    size: 'md',
    bodyClass: '',
    headerClass: '',
    footerClass: '',
    iconClass: '',
    iconContainerClass: '',
    iconVariant: undefined,
    icon: undefined,
    actions: undefined,
});

const modalProps = computed(() => ({
    open: props.open,
}));

const cardProps = computed(() => ({
    class: twMerge('w-full sm:max-w-lg', props.class),
    size: props.size,
    bodyClass: props.bodyClass,
    headerClass: props.headerClass,
    footerClass: props.footerClass,
    iconClass: props.iconClass,
    iconContainerClass: props.iconContainerClass,
    icon: props.icon,
    actions: props.actions,
    iconVariant: props.iconVariant,
}));
</script>

<template>
    <SModal v-bind="modalProps" @close="$emit('close')">
        <SCard v-bind="cardProps">
            <template #title>
                <SModalTitle><slot name="title" /></SModalTitle>
            </template>
            <slot />
            <template #description>
                <SModalDescription><slot name="description" /></SModalDescription>
            </template>
            <template #actions>
                <slot name="actions" />
            </template>
        </SCard>
    </SModal>
</template>
