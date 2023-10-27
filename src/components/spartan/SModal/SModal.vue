<script setup lang="ts">
import { TransitionChild, DialogPanel } from '@headlessui/vue';
import { ModalBackdropWrapper } from '@internal';
import type { TModalProps } from './types';

defineOptions({ inheritAttrs: false });
defineEmits(['close']);

withDefaults(defineProps<Partial<TModalProps>>(), {
    open: false,
});
</script>

<template>
    <ModalBackdropWrapper :show="open" @close="$emit('close')">
        <div class="fixed inset-0 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 sm:items-center">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0 scale-50"
                    enter-to="opacity-100 scale-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-50"
                >
                    <DialogPanel class="flex w-full justify-center">
                        <slot />
                    </DialogPanel>
                </TransitionChild>
            </div>
        </div>
    </ModalBackdropWrapper>
</template>
