<script setup lang="ts">
import type { TPopoverProps } from '@spartan';
import type { TSelectorLayoutProps } from './types';
import { SPopover } from '@spartan';
import { twMerge } from 'tailwind-merge';
import { useTemplateRef } from 'vue';

defineEmits<{
    (e: 'close'): void;
}>();

const { ptOptions } = defineProps<TSelectorLayoutProps & TPopoverProps>();

const [optionsClass, optionsProps] = ptOptions;

const $popover = useTemplateRef('popover');
const $options = useTemplateRef('options');

defineExpose({
    $popover,
    $options,
});
</script>

<template>
    <SPopover ref="popover" :offset="2" :static="static" :responsive="responsive" @close="$emit('close')">
        <template #reference>
            <slot name="button" />
        </template>

        <div class="overflow-hidden rounded-md border border-gray-950/5 bg-white shadow-lg">
            <div
                ref="options"
                tabindex="-1"
                data-s-options
                v-bind="optionsProps"
                :class="twMerge('relative max-h-80 overflow-auto', optionsClass)"
                :style="{ minWidth: `${String(width)}px` }"
            >
                <div class="sticky top-0 z-10 bg-white">
                    <slot name="dropdownHeader" />
                </div>
                <slot name="dropdown" />
                <div class="sticky bottom-0 z-10 bg-white">
                    <slot name="dropdownFooter" />
                </div>
            </div>
        </div>
    </SPopover>
</template>
