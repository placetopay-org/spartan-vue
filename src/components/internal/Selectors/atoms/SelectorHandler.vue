<script setup lang="ts">
import { SBadge } from '@spartan';
import { twMerge } from 'tailwind-merge';
import { translator } from '@/helpers';
import type { TClassProp } from '@/constants';
import { AddIcon } from '@placetopay/iconsax-vue/linear';

defineEmits<{
    (e: 'add'): void;
}>();

defineProps<{ class?: TClassProp }>();

const { t } = translator('selector');
</script>

<template>
    <div :class="twMerge('overflow-auto border-t border-gray-300 p-2.5 dark:border-white/10', $props.class)">
        <button @click="$emit('add')">
            <SBadge as="button" pt:content="flex gap-1 items-center" pill>
                <AddIcon class="h-4 w-4 text-gray-400" />
                <span>{{ t('add') }}</span>
            </SBadge>
        </button>
    </div>
</template>
