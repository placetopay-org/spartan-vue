<script setup lang="ts">
import { TransitionChild, DialogPanel } from '@headlessui/vue';
import { ModalBackdropWrapper } from '@internal';
import type { TModalProps } from './types';
import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });
defineEmits(['close']);

const props = withDefaults(defineProps<Partial<TModalProps>>(), {
    open: false,
    responsive: true,
});

const finalPosition = computed(() => {
    let positionStyle = 'items-center';

    if (props.position === 'top') positionStyle = 'items-start';
    if (props.position === 'nearTop') positionStyle = 'items-start mt-20';
    if (props.position === 'bottom') positionStyle = 'items-end';

    // included in the tailwind safelist
    if (props.responsive) return `items-end sm:${positionStyle}`;

    return positionStyle;
});
</script>

<template>
    <ModalBackdropWrapper :show="open" @close="$emit('close')">
        <div class="fixed inset-0 w-screen overflow-y-auto">
            <div
                :class="
                    twMerge(
                        'flex min-h-full justify-center p-4',
                        responsive && 'items-end sm:items-center',
                        finalPosition,
                    )
                "
            >
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0 scale-50"
                    enter-to="opacity-100 scale-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-50"
                >
                    <DialogPanel class="flex w-full justify-center sm:max-w-max">
                        <slot />
                    </DialogPanel>
                </TransitionChild>
            </div>
        </div>
    </ModalBackdropWrapper>
</template>
