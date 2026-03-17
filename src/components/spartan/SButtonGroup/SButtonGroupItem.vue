<script setup lang="ts">
import { SCN } from '@/constants';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';
import type { TButtonGroupItemProps } from './types';

const props = withDefaults(defineProps<Partial<TButtonGroupItemProps>>(), {
    active: false,
    disabled: false,
    endIcon: false,
    first: false,
    icon: undefined,
    last: false,
    next: false,
    prev: false,
});

const iconClass = computed(() => [
    'w-5 h-5 text-gray-900 dark:text-gray-100 group-active:text-spartan-primary-600',
    props.active && 'text-spartan-primary-600 dark:text-spartan-primary-400',
]);
</script>

<template>
    <component
        :is="as || 'button'"
        :disabled="as ? undefined : disabled"
        :type="as ? undefined : 'button'"
        :class="
            twMerge([
                SCN.focusRingPrimary,
                'group active:bg-spartan-primary-50 dark:active:bg-spartan-primary-600/10 active:text-spartan-primary-600 relative inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 focus:z-20',
                active
                    ? 'bg-spartan-primary-50 dark:bg-spartan-primary-600/10 text-spartan-primary-600 dark:text-spartan-primary-400 outline-spartan-primary-300 dark:outline-spartan-primary-400/25 z-10'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700',
                endIcon && 'flex-row-reverse',
                disabled && 'pointer-events-none opacity-50',
                first && 'rounded-l-md',
                last && 'rounded-r-md',
                props.class,
            ])
        "
    >
        <template v-if="next || prev">
            <span class="sr-only">{{ next ? 'Next' : 'Prev' }}</span>
            <component
                :is="next ? ChevronRightIcon : ChevronLeftIcon"
                :class="[iconClass, 'duration-75 group-active:scale-125']"
            />
        </template>

        <template v-else>
            <component
                :is="icon"
                v-if="icon"
                :class="[iconClass, $slots.default?.()?.[0]?.children ? (endIcon ? '-mr-0.5' : '-ml-0.5') : '']"
            />
            <slot />
        </template>
    </component>
</template>
