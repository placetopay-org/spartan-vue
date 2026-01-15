<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { computed, useAttrs } from 'vue';
import { SCard, type TCardProps } from '../SCard';
import { SModal, type TModalProps } from '../SModal';
import type { TModalCardEmits } from './types';

defineEmits<TModalCardEmits>();

const attrs = useAttrs();

const props = defineProps<TModalProps & TCardProps>();

const modalBind = computed(() => ({
    open: props.open,
    preventClose: props.preventClose,
    responsive: props.responsive,
    position: props.position,
}));

const cardBind = computed(() => ({
    class: twMerge('w-full sm:max-w-lg', props.class),
    size: props.size,
    icon: props.icon,
    actions: props.actions,
    title: props.title,
    iconType: props.iconType,
    iconColor: props.iconColor,
    closable: props.closable,
    'pt:title': attrs['pt:title'],
    'pt:icon': attrs['pt:icon'],
    'pt:iconContainer': attrs['pt:iconContainer'],
    'pt:description': attrs['pt:description'],
}));
</script>

<template>
    <SModal v-bind="modalBind" @update:open="$emit('update:open', $event)">
        <SCard v-bind="cardBind" @close="$emit('update:open', false)">
            <template #description>
                <slot name="description" />
            </template>

            <slot />

            <template #actions>
                <slot name="actions" />
            </template>
        </SCard>
    </SModal>
</template>
