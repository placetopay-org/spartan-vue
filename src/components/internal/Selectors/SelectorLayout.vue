<script setup lang="ts">
import type { TPopoverProps } from '@spartan';
import type { TSelectorLayoutProps } from './types';
import { SPopover } from '@spartan';
import { twMerge } from 'tailwind-merge';
import { buttonStyles, optionStyles } from './styles';
import { translator, usePassthrough, hasSlotContent } from '@/helpers';
import { CheckIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { ref, useTemplateRef } from 'vue';
import { inputStyle } from '@/constants';
import isEqual from 'lodash.isequal';

const { PtOptions } = defineProps<TSelectorLayoutProps & TPopoverProps>();

const [optionsClass, optionsProps] = PtOptions;

const { pt, extractor } = usePassthrough();

const $popover = useTemplateRef('$popover');
const $input = ref<HTMLInputElement | null>(null);

const { t } = translator('selector');

const isSelected = (option: any) => {
    // if (Array.isArray(modelValue)) return modelValue.includes(option);
    // else return isEqual(option, modelValue);
};

const selectOption = (option: any) => {
    console.log('selectOption');
};

const toggleOptions = () => {
    console.log('toggleOptions');
};

defineExpose({
    $popover,
});
</script>

<template>
    <SPopover :offset="2" ref="$popover" :static="static" :responsive="responsive" @close="$emit('close')">
        <template #reference>
            <slot name="button" />
        </template>

        <div class="overflow-hidden rounded-md border border-gray-950/5 bg-white shadow-lg">
            <div
                data-s-options
                v-bind="optionsProps"
                :class="twMerge('max-h-80 overflow-auto', optionsClass)"
                :style="{ minWidth: `${String(optionsWidth)}px` }"
            >
                <slot name="dropdown" />
            </div>
        </div>
    </SPopover>
</template>

<!-- <style scoped>
/* width */
::-webkit-scrollbar {
    height: 0px;
}
</style> -->
