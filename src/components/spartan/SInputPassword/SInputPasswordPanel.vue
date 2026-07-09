<script setup lang="ts">
import type { TState } from './types';
import { SAccordion } from '@spartan';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { translator } from '@/helpers';
import { twMerge } from 'tailwind-merge';
import { panelIconStyles } from './styles';

const { open = true, class: propClass = '' } = defineProps<{ class?: string; state: TState; open?: boolean }>();

const { t } = translator('inputPasswordPanel');
</script>

<template>
    <SAccordion :open="open" vertical>
        <div :class="twMerge('space-y-2', propClass)">
            <div v-for="(value, key) of state" :key="key" class="flex items-center gap-2">
                <CheckCircleIcon :class="panelIconStyles({ valid: value?.isValid })" />
                <span class="text-sm text-gray-600 dark:text-gray-400">{{
                    t(key, { value: String(value?.value) })
                }}</span>
            </div>
        </div>
    </SAccordion>
</template>
