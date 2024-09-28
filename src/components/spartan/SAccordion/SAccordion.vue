<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { TAccordionProps } from './types';

const { appear = true } = defineProps<TAccordionProps>();
</script>

<template>
    <Transition :appear="appear" :name="`${vertical ? 'vertical' : 'horizontal'}-accordion`">
        <div
            v-show="open"
            :class="
                twMerge(vertical ? 'max-h-screen overflow-y-hidden' : 'max-w-screen overflow-x-hidden', $props.class)
            "
        >
            <slot />
        </div>
    </Transition>
</template>

<style scoped>
.max-w-screen {
    max-width: 100vw;
}

.horizontal-accordion-enter-active {
    transition: max-width 0.4s cubic-bezier(0.87, 0, 0.13, 1);
}

.horizontal-accordion-leave-active {
    transition: max-width 0.4s cubic-bezier(0, 1.04, 0.17, 0.99);
}

.horizontal-accordion-enter-from,
.horizontal-accordion-leave-to {
    max-width: 0;
}

.vertical-accordion-enter-active {
    transition: max-height 0.4s cubic-bezier(0.87, 0, 0.13, 1);
}

.vertical-accordion-leave-active {
    transition: max-height 0.4s cubic-bezier(0, 1.04, 0.17, 0.99);
}

.vertical-accordion-enter-from,
.vertical-accordion-leave-to {
    max-height: 0;
}
</style>
