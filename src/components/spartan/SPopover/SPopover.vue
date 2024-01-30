<script setup lang="ts">
import { useFloating, autoUpdate, flip, offset as setOffset } from '@floating-ui/vue';
import { ref, computed, nextTick, watch } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { popoverContainerStyles, popoverFloatingStyles } from './styles';
import type { TPopoverProps } from './types';
import { twMerge } from 'tailwind-merge';

const emit = defineEmits(['close']);

const props = withDefaults(defineProps<TPopoverProps>(), {
    static: false,
    offset: 0,
    placement: 'bottom-start',
    preventClose: false,
    responsive: true,
});

const isOpen = ref(false);
const styles = ref();
const isLargeScreen = useMediaQuery('(min-width: 768px)');
const reference = ref<HTMLElement | null>(null);
const floating = ref<HTMLElement | null>(null);

const middleware = computed(() => {
    const group = [];
    !props.static && group.push(flip());
    props.offset && group.push(setOffset(props.offset));

    return group;
});

const { floatingStyles } = useFloating(reference, floating, {
    transform: false,
    placement: computed(() => props.placement),
    middleware: middleware,
    whileElementsMounted: autoUpdate,
});

const focus = () => {
    floating.value?.focus();
};

const open = () => {
    isOpen.value = true;
    nextTick(() => {
        focus();
    });
};

const close = () => (isOpen.value = false);

const toggle = () => {
    if (isOpen.value) close();
    else open();
};

const focusout = () => {
    requestAnimationFrame(() => {
        if (document.activeElement === floating.value) return;
        if (reference.value?.contains(document.activeElement)) return;
        if (floating.value?.contains(document.activeElement)) return;

        if (!props.preventClose) close();
        emit('close');
    });
};

if (props.responsive) {
    watch(isLargeScreen, (isLargeScreen) => {
        if (isLargeScreen) {
            styles.value = floatingStyles.value;
        } else {
            styles.value = {
                left: '0',
                right: '0',
                top: '0',
            };
        }
    });
} else {
    styles.value = floatingStyles.value;
}

const handlers = {
    isOpen,
    open,
    close,
    toggle,
    focus,
};

defineExpose(handlers);
</script>

<template>
    <div>
        <div ref="reference" tabindex="-1">
            <slot name="reference" v-bind="handlers" />
        </div>
        <Transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="!isLargeScreen && isOpen && responsive"
                :class="twMerge('fixed inset-0 bg-black/30', '')"
                aria-hidden="true"
            />
        </Transition>
        <div :class="popoverContainerStyles({ responsive })">
            <Transition
                enter-active-class="transition duration-200 ease-out"
                leave-active-class="transition duration-150 ease-in"
                enter-from-class="-translate-y-2 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="-translate-y-2 opacity-0"
            >
                <div v-if="isOpen" :class="popoverFloatingStyles({ responsive })" ref="floating" :style="styles" tabindex="-1" @focusout="focusout">
                    <slot v-bind="handlers" />
                </div>
            </Transition>
        </div>
    </div>
</template>
