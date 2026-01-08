<script setup lang="ts">
import type { TState } from './types';
import { SAccordion } from '@spartan';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { translator } from '@/helpers';
import { twMerge } from 'tailwind-merge';

const { open = true } = defineProps<{ class?: string; state: TState; open?: boolean }>();

const { t } = translator('inputPasswordPanel');
</script>

<template>
    <SAccordion :open="open" vertical>
        <div :class="twMerge('space-y-2', $props.class)">
            <div v-for="(value, key) of state" :key="key" class="flex items-center gap-2">
                <CheckCircleIcon
                    :class="value?.isValid ? 'text-emerald-400' : 'text-gray-300'"
                    class="h-6 w-6 shrink-0"
                />
                <span class="text-sm text-gray-600">{{ t(key, { value: value?.value }) }}</span>
            </div>
        </div>
    </SAccordion>
</template>
