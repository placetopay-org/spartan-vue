<script setup lang="ts">
import { TransitionChild, DialogPanel } from '@headlessui/vue';
import { ModalBackdropWrapper } from '@internal';
import type { TModalLeftProps } from './types';
import { XMarkIcon } from '@heroicons/vue/20/solid';

defineOptions({ inheritAttrs: false });
defineEmits(['close', 'backdropClick']);

withDefaults(defineProps<Partial<TModalLeftProps>>(), {
    open: false,
});
</script>

<template>
    <ModalBackdropWrapper :show="open" backdrop-class="bg-gray-900/80" @close="$emit('backdropClick')">
        <div class="fixed inset-0 w-screen overflow-y-auto">
            <button class="absolute right-4 top-4" @click="$emit('close')">
                <XMarkIcon class="h-7 w-7 text-white" />
            </button>
            <div class="flex h-full">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="-translate-x-full"
                    enter-to="translate-x-0"
                    leave="duration-200 ease-in"
                    leave-from="translate-x-0"
                    leave-to="-translate-x-full"
                >
                    <DialogPanel class="flex h-full">
                        <slot />
                    </DialogPanel>
                </TransitionChild>
            </div>
        </div>
    </ModalBackdropWrapper>
</template>
