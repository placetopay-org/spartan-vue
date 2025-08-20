<script lang="ts">
/**
 * A versatile alert component for displaying important messages with multiple styles and appearances.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SAlert Github}.
 * @see {@link https://develop--646e732a14dfaa707ad59b33.chromatic.com/?path=/docs/display-alert--docs Storybook}.
 */
export default {
    name: 'SAlert',
};
</script>

<script setup lang="ts">
import { twMerge as tm } from 'tailwind-merge';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { hasSlotContent } from '@/helpers';
import type { TAlertProps } from './types';
import { alertStyles } from './styles';

// Emits
defineEmits<{ (e: 'close'): void }>();

// Props and Defaults
const props = withDefaults(defineProps<TAlertProps>(), {
    color: 'neutral',
    variant: 'solid',
    closeable: false,
});
</script>

<template>
    <div role="alert" :class="tm(alertStyles({ color: props.color, variant: props.variant }), $props.class)">
        <!-- Icon -->
        <component :is="icon" v-if="icon" class="h-5 w-5" />

        <!-- Content -->
        <div class="min-w-0 flex-1">
            <!-- Title -->
            <h3 v-if="title" class="text-sm font-medium">
                {{ title }}
            </h3>

            <!-- Description -->
            <div
                v-if="description || hasSlotContent($slots.default)"
                class="text-sm opacity-90"
                :class="{ 'mt-1': title }"
            >
                <p v-if="description">
                    {{ description }}
                </p>
                <slot v-else />
            </div>
        </div>

        <!-- Close button -->
        <button v-if="closeable" type="button" @click="$emit('close')">
            <span class="sr-only">Close</span>
            <component :is="closeIcon || XMarkIcon" class="size-5" aria-hidden="true" />
        </button>
    </div>
</template>
