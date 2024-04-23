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
    'w-5 h-5 text-gray-900 group-active:text-primary-600',
    props.active && 'text-primary-600',
]);
</script>

<template>
    <button
        :disabled="disabled"
        type="button"
        :class="
            twMerge([
                SCN.focusRingPrimary,
                'group relative inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:z-20 focus:outline-primary-300 active:bg-primary-50 active:text-primary-600',
                active ? 'z-10 bg-primary-50 text-primary-600 outline-primary-300' : 'bg-white hover:bg-gray-50',
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
                :class="[iconClass, $slots.default?.()[0].children ? (endIcon ? '-mr-0.5' : '-ml-0.5') : '']"
            />
            <slot />
        </template>
    </button>
</template>
