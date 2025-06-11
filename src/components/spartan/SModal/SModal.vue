<script setup lang="ts">
import type { TModalProps } from './types';
import { twMerge } from 'tailwind-merge';
import { computed, watchEffect } from 'vue';
import { TranStyle } from '@/constants';
import { usePassthrough } from '@/helpers';

defineOptions({ inheritAttrs: false });
const emit = defineEmits(['close', 'update:open']);

const { pt, extractor } = usePassthrough();

const [containerClass, containerProps] = extractor(pt.value.container);

const props = defineProps<TModalProps>();

const responsive = computed(() => props.responsive !== false);

watchEffect(() => {
    if (props.open) {
        document.documentElement.style.overflow = 'hidden';
    } else {
        setTimeout(() => {
            document.documentElement.style.overflow = '';
        }, 150);
    }
});

const containerStyles = computed(() =>
    responsive.value
        ? 'bottom-4 px-4 w-full sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto'
        : 'top-1/2 -translate-y-1/2',
);

const closeModal = () => {
    if (props.preventClose) return;
    emit('close'); // TODO: remove this
    emit('update:open', false);
};
</script>

<template>
    <Teleport to="body">
        <Transition v-bind="TranStyle.fade">
            <div v-if="open" class="fixed inset-0 z-40">
                <div class="absolute inset-0 z-40 bg-black/30" aria-hidden="true" />
            </div>
        </Transition>

        <Transition v-bind="TranStyle.vertical">
            <div v-if="open" class="fixed inset-0 z-40" @click="closeModal">
                <div
                    data-s-container
                    v-bind="containerProps"
                    :class="twMerge('absolute flex justify-center z-40 w-full', containerStyles, containerClass)"
                    @click.stop
                >
                    <slot />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
