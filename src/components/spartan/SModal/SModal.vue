<script setup lang="ts">
import type { TModalProps } from './types';
import { twMerge } from 'tailwind-merge';
import { computed, watchEffect } from 'vue';
import { TranStyle } from '@/constants';
import { usePassthrough } from '@/helpers';

defineOptions({ inheritAttrs: false });
const emit = defineEmits(['close']);

const { pt, extractor } = usePassthrough();

const [containerClass, containerProps] = extractor(pt.value.container);

const props = withDefaults(defineProps<TModalProps>(), {
    open: false,
    responsive: true,
});

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
    props.responsive
        ? 'bottom-4 px-4 w-full sm:w-auto sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto'
        : 'top-1/2 -translate-y-1/2',
);
</script>

<template>
    <Teleport to="body">
        <Transition v-bind="TranStyle.fade">
            <div v-if="open" class="fixed inset-0 z-40">
                <div class="absolute inset-0 z-40 bg-black/30" aria-hidden="true" />
            </div>
        </Transition>

        <Transition v-bind="TranStyle.vertical">
            <div v-if="open" class="fixed inset-0 z-40" @click="!preventClose && $emit('close')">
                <div
                    data-s-container
                    v-bind="containerProps"
                    :class="twMerge('absolute left-1/2 z-40 -translate-x-1/2', containerStyles, containerClass)"
                    @click.stop
                >
                    <slot />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
