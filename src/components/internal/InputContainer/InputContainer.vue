<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { containerStyles } from './styles';
import type { TRounded } from '@/constants';

const { rounded = 'both', class: propClass = '' } = defineProps<{
    button?: boolean;
    class?: string;
    disabled?: boolean;
    error?: boolean;
    rounded?: TRounded;
}>();
</script>

<template>
    <div :class="twMerge(containerStyles({ disabled, error, rounded }), propClass)">
        <slot />
    </div>
</template>
