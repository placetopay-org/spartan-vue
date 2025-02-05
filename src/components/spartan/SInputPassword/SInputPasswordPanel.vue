<script setup lang="ts">
import type { TState } from './types';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { translator } from '@/helpers';
import { twMerge } from 'tailwind-merge';

defineProps<{ class?: string; state: TState }>();

const { t } = translator('inputPasswordPanel');
</script>

<template>
    <div :class="twMerge('space-y-2', $props.class)">
        <div v-for="(value, key) of state" class="flex items-center gap-2">
            <CheckCircleIcon :class="value?.isValid ? 'text-emerald-400' : 'text-gray-300'" class="h-6 w-6" />
            <span class="text-sm text-gray-600">{{ t(key, {value: value?.value}) }}</span>
        </div>
    </div>
</template>
