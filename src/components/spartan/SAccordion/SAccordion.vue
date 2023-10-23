<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

const props = defineProps<{
    class?: string;
    open: boolean;
    vertical?: boolean;
}>();
</script>

<template>
    <Transition appear :name="`${vertical ? 'vertical' : 'horizontal'}-accordion`">
        <div v-show="open" :class="twMerge('overflow-hidden', vertical ? 'h-full' : 'w-full', props.class)">
            <slot />
        </div>
    </Transition>
</template>

<style scoped>
.horizontal-accordion-enter-active,
.horizontal-accordion-leave-active {
    transition: width 0.4s cubic-bezier(0.87, 0, 0.13, 1);
}

.horizontal-accordion-enter-from,
.horizontal-accordion-leave-to {
    width: 0;
}

.vertical-accordion-enter-active,
.vertical-accordion-leave-active {
    transition: height 0.4s cubic-bezier(0.87, 0, 0.13, 1);
}

.vertical-accordion-enter-from,
.vertical-accordion-leave-to {
    height: 0;
}
</style>
