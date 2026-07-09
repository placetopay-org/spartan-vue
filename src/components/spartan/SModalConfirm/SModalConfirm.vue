<script lang="ts">
/**
 * A pre-configured confirmation modal with confirm/cancel actions, built on top of SModalCard.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SModalConfirm Github}.
 * @see {@link https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=12770-18720 Figma}.
 */
export default {
    name: 'SModalConfirm',
};
</script>

<script setup lang="ts">
import { SButton, SModalCard } from '@spartan';
import type { TModalProps, TCardProps } from '@spartan';
import { computed } from 'vue';
import { translator, hasSlotContent } from '@/helpers';
import type { TModalConfirmEmits, TModalConfirmProps } from './types';

const emit = defineEmits<TModalConfirmEmits>();

// `responsive = true` must live in the destructure: Vue casts an absent boolean
// prop to `false`, so the previous `props.responsive !== false` never saw the
// documented default and every SModalConfirm rendered non-responsive.
const {
    open,
    closable,
    preventClose,
    description,
    responsive = true,
    title: titleProp,
    confirmText: confirmTextProp,
    cancelText: cancelTextProp,
    icon: iconProp,
} = defineProps<TModalConfirmProps & TModalProps & TCardProps>();

const { t } = translator('modalConfirm');

const title = computed(() => titleProp || t('title'));
const confirmText = computed(() => confirmTextProp || t('confirmText'));
const cancelText = computed(() => cancelTextProp || t('cancelText'));
const icon = computed(() => iconProp || 'danger');

const confirm = () => {
    emit('confirm');
    emit('update:open', false);
};
</script>

<template>
    <SModalCard
        :open="open"
        :icon
        :title
        :pt:title="closable ? 'text-left' : ''"
        :pt:description="closable ? 'text-left' : ''"
        :responsive
        :closable
        :prevent-close
        @update:open="$emit('update:open', $event)"
    >
        <template #description>
            <slot v-if="hasSlotContent($slots.default)" />
            <template v-else>{{ description }}</template>
        </template>

        <template #actions>
            <SButton class="w-full" @click="confirm">{{ confirmText }}</SButton>
            <SButton class="w-full" variant="secondary" @click="$emit('update:open', false)">{{ cancelText }}</SButton>
        </template>
    </SModalCard>
</template>
