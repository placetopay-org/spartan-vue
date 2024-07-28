<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { ref, computed, nextTick, watch } from 'vue';
import { useFloating, autoUpdate, flip, offset as setOffset } from '@floating-ui/vue';
import { useMediaQuery } from '@vueuse/core';
import { popoverContainerStyles, popoverFloatingStyles } from './styles';
import { TranStyle } from '@/constants';
import type { TPopoverEmits, TPopoverProps } from './types';
import { focusFirstChild } from '@/helpers';

defineOptions({ inheritAttrs: false });

const emit = defineEmits<TPopoverEmits>();

const props = withDefaults(defineProps<TPopoverProps>(), {
    static: false,
    offset: 0,
    placement: 'bottom-start',
    preventClose: false,
    responsive: true,
});

const isOpen = ref(false);
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

const styles = computed(() => {
    if (props.responsive && !isLargeScreen.value) {
        return {
            left: '0',
            right: '0',
            top: '0',
        };
    }
    return floatingStyles.value;
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

const close = () => {
    isOpen.value = false;
    focusFirstChild(reference.value, true);
    (reference.value?.firstElementChild as HTMLElement)?.focus();
    emit('close');
};

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
    });
};

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
    <div :class="$props.class" ref="reference" tabindex="-1">
        <slot name="reference" v-bind="handlers" />
    </div>

    <Transition v-bind="TranStyle.fade">
        <div
            v-if="!isLargeScreen && isOpen && responsive"
            :class="twMerge('fixed inset-0 bg-black/30', '')"
            aria-hidden="true"
        />
    </Transition>

    <div :class="popoverContainerStyles({ responsive })">
        <Transition v-bind="TranStyle.vertical">
            <div
                v-if="isOpen"
                :class="popoverFloatingStyles({ responsive })"
                ref="floating"
                :style="styles"
                tabindex="-1"
                @focus="focusFirstChild"
                @focusout="focusout"
            >
                <slot v-bind="handlers" />
            </div>
        </Transition>
    </div>
</template>
