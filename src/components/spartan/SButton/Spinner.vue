<script setup lang="ts">
import type { TButtonProps } from './types';

type TVariant = NonNullable<TButtonProps['variant']>;

const solidColors: Record<TVariant, { track: string; indicator: string }> = {
    primary: { track: 'rgba(255, 255, 255, 0.3)', indicator: '#ffffff' },
    secondary: { track: 'var(--color-gray-300)', indicator: 'var(--color-gray-700)' },
    danger: { track: 'var(--color-red-300)', indicator: '#ffffff' },
};

const altColors: Record<TVariant, { track: string; indicator: string }> = {
    primary: { track: 'var(--color-spartan-primary-200)', indicator: 'var(--color-spartan-primary-600)' },
    secondary: { track: 'var(--color-gray-300)', indicator: 'var(--color-gray-700)' },
    danger: { track: 'var(--color-red-300)', indicator: 'var(--color-red-500)' },
};

const { variant, outline, link } = defineProps<{
    variant: TVariant;
    outline?: boolean;
    link?: boolean;
}>();

const { track, indicator } = (outline || link) ? altColors[variant] : solidColors[variant];
</script>

<template>
    <div class="absolute inset-0 z-10 flex items-center justify-center cursor-wait">
        <svg class="animate-spin h-[1em] w-[1em]" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" :stroke="track" stroke-width="3" />
            <path d="M22 12a10 10 0 0 0-10-10" :stroke="indicator" stroke-width="3" stroke-linecap="round" />
        </svg>
    </div>
</template>
