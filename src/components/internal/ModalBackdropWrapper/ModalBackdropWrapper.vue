<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog } from '@headlessui/vue';
import { twMerge } from 'tailwind-merge';
import { ref } from 'vue';

defineEmits(['close']);

const props = defineProps<{
    show: boolean;
    backdropClass?: string;
    breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
}>();

const mediaShow = ref(true);

if (props.breakpoint) {
    const widths = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
    };

    const minWidth = typeof props.breakpoint === 'number' ? props.breakpoint : widths[props.breakpoint];
    const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);
    mediaQuery.addEventListener('change', (e) => (mediaShow.value = !e.matches));
}
</script>

<template>
    <TransitionRoot v-if="mediaShow" appear :show="show">
        <Dialog as="div" :class="twMerge('relative z-50')" @close="$emit('close')">
            <!-- Backdrop -->
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div :class="twMerge('fixed inset-0 bg-black/30', backdropClass)" aria-hidden="true" />
            </TransitionChild>
            <slot />
        </Dialog>
    </TransitionRoot>
</template>
