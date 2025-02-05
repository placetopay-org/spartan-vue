<script setup lang="ts">
import type { TState } from './types';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { translator } from '@/helpers';

defineProps<{ state: TState }>();

const { t } = translator('inputPasswordPanel');
</script>

<template>
    <div>
        <div v-for="(value, key) of state" class="flex items-center gap-2">
            <CheckCircleIcon :class="value?.isValid ? 'text-green-400' : 'text-gray-300'" class="h-6 w-6" />
            <span class="text-sm text-gray-600">{{ t(key, {value: value?.value}) }}</span>
        </div>
    </div>
</template>
