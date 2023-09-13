<script setup lang="ts">
import { useFloating, autoUpdate, flip, offset as setOffset, type Placement } from '@floating-ui/vue';
import { ref, computed, nextTick } from 'vue';

const emit = defineEmits(['close']);

const props = withDefaults(
    defineProps<{
        static?: boolean;
        offset?: number;
        placement?: Placement;
        preventClose?: boolean;
    }>(),
    {
        static: false,
        offset: 0,
        placement: 'bottom-start',
        preventClose: false,
    },
);

const isOpen = ref(false);
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
        <div class="absolute z-40">
            <Transition
                enter-active-class="transition duration-200 ease-out"
                leave-active-class="transition duration-150 ease-in"
                enter-from-class="-translate-y-2 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="-translate-y-2 opacity-0"
            >
                <div v-if="isOpen" ref="floating" :style="floatingStyles" tabindex="-1" @focusout="focusout">
                    <slot v-bind="handlers" />
                </div>
            </Transition>
        </div>
    </div>
</template>
