<script setup lang="ts">
import type { TTooltipProps } from './types';
import { SPopover } from '../SPopover';
import { tooltipStyles } from './styles';
import { computed, ref } from 'vue';

const { placement = 'bottom', arrow = true, color = 'auto', manual } = defineProps<TTooltipProps>();

const popoverArrow = computed(() => (arrow ? color : undefined));

const popover = ref<InstanceType<typeof SPopover>>();

const isOpen = computed(() => popover.value?.isOpen);

const open = () => {
    popover.value?.open();
};

const close = () => {
    popover.value?.close();
};

const toggle = () => {
    popover.value?.toggle();
};

const focus = () => {
    popover.value?.focus();
};

const handlers = {
    isOpen,
    open,
    close,
    toggle,
    focus,
};

const openCallback = () => {
    if (manual) return;
    open();
};

const closeCallback = () => {
    if (manual) return;
    close();
};

defineExpose(handlers);
</script>

<template>
    <SPopover ref="popover" :static="static" :responsive="false" :placement="placement" :arrow="popoverArrow" :offset="offset">
        <template #reference=>
            <div @mouseenter="openCallback" @mouseleave="closeCallback">
                <slot />
            </div>
        </template>

        <div role="tooltip" :class="tooltipStyles({ color })">
            {{ title }}
        </div>
    </SPopover>
</template>
