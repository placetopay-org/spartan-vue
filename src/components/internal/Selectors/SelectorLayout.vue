<script setup lang="ts">
import type { TPopoverProps } from '@spartan';
import type { TSelectorLayoutProps } from './types';
import { SPopover } from '@spartan';
import { twMerge } from 'tailwind-merge';
import { useTemplateRef } from 'vue';

const { PtOptions } = defineProps<TSelectorLayoutProps & TPopoverProps>();

const [optionsClass, optionsProps] = PtOptions;

const $popover = useTemplateRef('$popover');
const $options = useTemplateRef('$options');

defineExpose({
    $popover,
    $options,
});
</script>

<template>
    <SPopover :offset="2" ref="$popover" :static="static" :responsive="responsive" @close="$emit('close')">
        <template #reference>
            <slot name="button" />
        </template>

        <div class="overflow-hidden rounded-md border border-gray-950/5 bg-white shadow-lg">
            <div
                ref="$options"
                tabindex="-1"
                data-s-options
                v-bind="optionsProps"
                :class="twMerge('max-h-80 overflow-auto', optionsClass)"
                :style="{ minWidth: `${String(width)}px` }"
            >
                <slot name="dropdown" />
            </div>
        </div>
    </SPopover>
</template>
