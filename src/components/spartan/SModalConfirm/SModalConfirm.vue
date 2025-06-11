<script setup lang="ts">
import { SButton, SModalCard } from '@spartan';
import type { TModalProps, TCardProps } from '@spartan';
import { computed } from 'vue';
import { translator } from '@/helpers';
import type { TModalConfirmEmits, TModalConfirmProps } from './types';

defineEmits<TModalConfirmEmits>();

const props = defineProps<TModalConfirmProps & TModalProps & TCardProps>();

const { t } = translator('modalConfirm');

const title = computed(() => props.title || t('title'));
const confirmText = computed(() => props.confirmText || t('confirmText'));
const cancelText = computed(() => props.cancelText || t('cancelText'));
const icon = computed(() => props.icon || 'danger');
const responsive = computed(() => props.responsive !== false);
</script>

<template>
    <SModalCard
        :open="open"
        @update:open="$emit('update:open', $event)"
        :icon
        :title
        :pt:title="closable ? 'text-left' : ''"
        :pt:description="closable ? 'text-left' : ''"
        :responsive
        :closable
    >
        <template #description>
            {{ text }}
        </template>

        <template #actions>
            <SButton class="w-full" @click="$emit('confirm')">{{ confirmText }}</SButton>
            <SButton class="w-full" @click="$emit('update:open', false)" variant="secondary">{{ cancelText }}</SButton>
        </template>
    </SModalCard>
</template>
