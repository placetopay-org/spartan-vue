<script setup lang="ts">
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { computed, useSlots } from 'vue';
import { buttonGroupItemStyles, buttonGroupItemIconStyles } from './styles';
import type { TButtonGroupItemProps } from './types';

const {
    active = false,
    disabled = false,
    endIcon = false,
    first = false,
    icon = undefined,
    last = false,
    next = false,
    prev = false,
    as,
    class: propClass,
} = defineProps<Partial<TButtonGroupItemProps>>();

const slots = useSlots();

const rootClass = computed(() => twMerge(buttonGroupItemStyles({ active, endIcon, disabled, first, last }), propClass));

const navIconClass = computed(() => [buttonGroupItemIconStyles({ active }), 'duration-75 group-active:scale-125']);

const iconClass = computed(() =>
    buttonGroupItemIconStyles({
        active,
        margin: slots.default?.()?.[0]?.children ? (endIcon ? 'end' : 'start') : 'none',
    }),
);
</script>

<template>
    <component
        :is="as || 'button'"
        :disabled="as ? undefined : disabled"
        :type="as ? undefined : 'button'"
        :class="rootClass"
    >
        <template v-if="next || prev">
            <span class="sr-only">{{ next ? 'Next' : 'Prev' }}</span>
            <component :is="next ? ChevronRightIcon : ChevronLeftIcon" :class="navIconClass" />
        </template>

        <template v-else>
            <component :is="icon" v-if="icon" :class="iconClass" />
            <slot />
        </template>
    </component>
</template>
