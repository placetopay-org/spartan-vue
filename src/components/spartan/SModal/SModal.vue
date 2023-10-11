<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue';
import type { TModalProps } from './types';

defineEmits(['close']);

withDefaults(defineProps<Partial<TModalProps>>(), {
    open: false,
});
</script>

<template>
    <TransitionRoot
        appear
        :show="open"
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
    >
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
                <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
            </TransitionChild>
            <div class="fixed inset-0 w-screen overflow-y-auto py-10">
                <div class="flex min-h-full items-center justify-center p-4">
                    <TransitionChild
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-50"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-50"
                    >
                        <DialogPanel class="w-full">
                            <slot />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
