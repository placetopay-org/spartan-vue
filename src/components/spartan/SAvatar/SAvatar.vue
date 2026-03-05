<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';
import type { TAvatarProps } from './types';

const {
    borderless = false,
    indicator = false,
    indicatorPosition = 'right-top',
    name = '?',
    size = 'md',
    src = '',
} = defineProps<TAvatarProps>();

const sizeClass = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-14 w-14',
    '2xl': 'h-16 w-16',
};

const fontClass = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl font-medium',
    '2xl': 'text-2xl font-medium',
};

const indicatorClass = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-3.5 w-3.5',
    '2xl': 'h-4 w-4',
};

const indicatorPositionClass = {
    'left-top': 'left-0 top-0',
    'left-bottom': 'left-0 bottom-0',
    'right-top': 'right-0 top-0',
    'right-bottom': 'right-0 bottom-0',
};

const initials = computed(() => {
    if (!name) return '?';
    if (name.length < 3) return name.toUpperCase().trim();

    const [first, last] = name.split(/ |-|_|\.|,|;|:|\||\\/g);

    return `${first?.[0] ?? ''}${last ? last[0] : ''}`.toUpperCase();
});

const baseClasses = computed(() =>
    twMerge([
        'rounded-full',
        sizeClass[size],
        !borderless && 'outline outline-1 outline-gray-800/20 dark:outline-white/20 -outline-offset-1',
    ]),
);
</script>

<template>
    <div data-s-avatar class="group relative focus-visible:outline-none">
        <img v-if="src" :class="twMerge(baseClasses, $props.class)" :src :alt="initials" class="object-cover" />
        <div v-else :class="twMerge(baseClasses, $props.class)" class="relative bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <span class="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2" :class="fontClass[size]">
                {{ initials }}
            </span>
        </div>
        <span
            v-if="indicator"
            :class="[indicatorClass[size], indicatorPositionClass[indicatorPosition]]"
            class="absolute block rounded-full bg-spartan-primary-500 ring-2 ring-white dark:ring-gray-800"
        />
    </div>
</template>
