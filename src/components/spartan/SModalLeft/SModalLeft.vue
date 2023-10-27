<script setup lang="ts">
import { TransitionChild, DialogPanel } from '@headlessui/vue';
import { ModalBackdropWrapper } from '@internal';
import type { TModalLeftProps } from './types';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';

defineOptions({ inheritAttrs: false });
defineEmits(['close', 'backdropClick']);

withDefaults(defineProps<Partial<TModalLeftProps>>(), {
    backdropClass: '',
    open: false,
    breakpoint: 'lg'
});
</script>

<template>
    <ModalBackdropWrapper
        :breakpoint="breakpoint"
        :show="open"
        :backdrop-class="twMerge('bg-gray-900/80', backdropClass)"
        @close="$emit('backdropClick')"
    >
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
