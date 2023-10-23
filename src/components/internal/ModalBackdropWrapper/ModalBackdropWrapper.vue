<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog } from '@headlessui/vue';
import { twMerge } from 'tailwind-merge';

defineEmits(['close']);

defineProps<{
    show: boolean;
    backdropClass?: string;
}>();
</script>

<template>
    <TransitionRoot appear :show="show">
        <Dialog as="div" class="relative z-50" @close="$emit('close')">
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
