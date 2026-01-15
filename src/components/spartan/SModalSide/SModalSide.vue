<script setup lang="ts">
import { TransitionChild, DialogPanel } from '@headlessui/vue';
import { ModalBackdropWrapper } from '@internal';
import type { TModalSideProps, TModalSideEmits } from './types';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });
defineEmits<TModalSideEmits>();

const props = withDefaults(defineProps<Partial<TModalSideProps>>(), {
    backdropClass: '',
    open: false,
    side: 'left',
    breakpoint: undefined,
});

const transitionEnterFrom = computed(() => (props.side === 'left' ? '-translate-x-full' : 'translate-x-full'));

const transitionLeaveTo = computed(() => (props.side === 'left' ? '-translate-x-full' : 'translate-x-full'));

const flexJustify = computed(() => (props.side === 'left' ? 'justify-start' : 'justify-end'));

const closeButtonPosition = computed(() => (props.side === 'left' ? 'right-4' : 'left-4'));
</script>

<template>
    <ModalBackdropWrapper
        :breakpoint="breakpoint"
        :show="open"
        :class="$props.class"
        :backdrop-class="twMerge('bg-gray-900/80', backdropClass)"
        @close="$emit('backdropClick')"
    >
        <div class="fixed inset-0 w-screen overflow-y-auto">
            <button :class="['absolute top-4', closeButtonPosition]" aria-label="Close modal" @click="$emit('close')">
                <XMarkIcon class="h-7 w-7 text-white" />
            </button>
            <div :class="['flex h-full', flexJustify]">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    :enter-from="transitionEnterFrom"
                    enter-to="translate-x-0"
                    leave="duration-200 ease-in"
                    leave-from="translate-x-0"
                    :leave-to="transitionLeaveTo"
                >
                    <DialogPanel class="flex h-full">
                        <slot />
                    </DialogPanel>
                </TransitionChild>
            </div>
        </div>
    </ModalBackdropWrapper>
</template>
