<script lang="ts">
/**
 * A base modal overlay that renders content centered on screen with backdrop and close-on-click behavior.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SModal Github}.
 */
export default {
    name: 'SModal',
};
</script>

<script setup lang="ts">
import type { TModalProps } from './types';
import { twMerge } from 'tailwind-merge';
import { computed, watchEffect } from 'vue';
import { TranStyle } from '@/constants';
import { usePassthrough } from '@/helpers';

defineOptions({ inheritAttrs: false });
const emit = defineEmits(['update:open']);

const { pt, extractor } = usePassthrough();

const [containerClass, containerProps] = extractor(pt.value.container);

// Reactive destructure so the boolean default is declared where Vue honors it.
// `props.responsive !== false` could never see the documented default: an absent
// boolean prop is cast to `false`, not `undefined`, so every SModal without an
// explicit `responsive` rendered the centered (non-responsive) layout.
const { open, responsive = true, preventClose } = defineProps<TModalProps>();

watchEffect(() => {
    if (open) {
        document.documentElement.style.overflow = 'hidden';
    } else {
        setTimeout(() => {
            document.documentElement.style.overflow = '';
        }, 150);
    }
});

const containerStyles = computed(() =>
    responsive ? 'bottom-4 px-4 w-full sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto' : 'top-1/2 -translate-y-1/2',
);

const closeModal = () => {
    if (preventClose) return;
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
                    :class="twMerge('absolute z-40 flex w-full justify-center', containerStyles, containerClass)"
                    @click.stop
                >
                    <slot />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
