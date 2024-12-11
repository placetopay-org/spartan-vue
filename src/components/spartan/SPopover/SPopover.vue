<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { ref, computed, nextTick, watch, h, Teleport } from 'vue';
import { useFloating, autoUpdate, flip, offset as setOffset, arrow as setArrow } from '@floating-ui/vue';
import { useMediaQuery } from '@vueuse/core';
import { arrowStyles, popoverContainerStyles, popoverFloatingStyles } from './styles';
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
const arrowRef = ref<HTMLElement | null>(null);

const middleware = computed(() => {
    const group = [];
    !props.static && group.push(flip());
    group.push(setOffset(props.offset));
    group.push(setOffset(props.offset || 0 + (props.arrow ? Math.sqrt(288) / 2 : 0)));
    props.arrow && group.push(setArrow({ element: arrowRef, padding: 16 }));

    return group;
});

const { floatingStyles, middlewareData } = useFloating(reference, floating, {
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
        // prevent jumping
        setTimeout(() => {
            focus();
        }, 0);
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

const arrowPosition = computed(() => {
    const side = props.placement.split('-')[0];

    const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
    }[side as 'top' | 'right' | 'bottom' | 'left'];

    const style = {
        transform: 'rotate(45deg)',
        left: middlewareData.value.arrow?.x != null ? `${middlewareData.value.arrow.x}px` : '',
        top: middlewareData.value.arrow?.y != null ? `${middlewareData.value.arrow.y}px` : '',
        right: '',
        bottom: '',
    };

    if (arrowRef.value) {
        Object.assign(style, {
            [staticSide]: '-4px',
        });
    }

    return style;
});
</script>

<template>
    <div :class="$props.class" ref="reference" tabindex="-1">
        <slot name="reference" v-bind="handlers" />
    </div>

    <Teleport to="body">
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
                    v-if="isOpen || useShow"
                    v-show="isOpen"
                    :class="popoverFloatingStyles({ responsive })"
                    ref="floating"
                    class="focus-visible:outline-none z-40"
                    :style="styles"
                    tabindex="-1"
                    @focus="focusFirstChild"
                    @focusout="focusout"
                >
                    <slot v-bind="handlers" />
                    <div
                        v-if="arrow"
                        ref="arrowRef"
                        :class="arrowStyles({ color: arrow })"
                        :style="arrowPosition"
                    />
                </div>
            </Transition>
        </div>
    </Teleport>
</template>
