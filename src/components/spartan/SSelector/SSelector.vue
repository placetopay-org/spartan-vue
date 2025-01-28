<script setup lang="ts">
import { usePassthrough } from '@/helpers';
import type { TSelectorProps, TSelectorEmits, TOption } from './types';
import { type TPopoverProps } from '@spartan';
import { computed, nextTick, useTemplateRef } from 'vue';
import isEqual from 'lodash.isequal';
import { SelectorLayout, SelectorButton, SelectorOptions, SelectorInputSearch } from '@internal';

const emit = defineEmits<TSelectorEmits>();
const { rounded = 'both', modelValue, optionLabel, search, clearable } = defineProps<TSelectorProps & TPopoverProps>();
const { pt, extractor } = usePassthrough();

const PtOptions = extractor(pt.value.options);

const $selectorLayout = useTemplateRef('$selectorLayout');
const $selectorButton = useTemplateRef('$selectorButton');
const $selectorInputSearch = useTemplateRef('$selectorInputSearch');

const $popover = computed(() => $selectorLayout.value?.$popover);
const $button = computed(() => $selectorButton.value?.$button);
const $input = computed(() => $selectorInputSearch.value?.$input);

const optionsWidth = computed<any>(() => {
    return $button.value?.clientWidth || 20;
});

const showClearButton = computed(() => Boolean(clearable && modelValue));

const isSelected = (option: any) => isEqual(option, modelValue);

const toggleOptions = () => {
    $popover.value?.toggle();
    if (search && $popover.value?.isOpen) {
        nextTick(() => {
            // prevent jumping
            setTimeout(() => {
                $input.value?.focus();
            }, 0);
        });
    }
};

const selectOption = (option: TOption) => {
    emit('update:modelValue', option);
    // delay closing after selection
    setTimeout(() => {
        $popover.value?.close();
    }, 0);
};
const clear = () => {
    emit('update:modelValue');
    $input.value?.focus();
};

const refreshInput = () => {
    if (search) {
        $input.value!.value = '';
        emit('query', '');
    }
};
</script>

<template>
    <SelectorLayout ref="$selectorLayout" :width="optionsWidth" :PtOptions="PtOptions" @close="refreshInput">
        <template #button>
            <SelectorButton
                ref="$selectorButton"
                :class="$props.class"
                :disabled="disabled"
                :rounded="rounded"
                :error="error"
                :loading="loading"
                :showClearButton="showClearButton"
                @click="toggleOptions"
                @clear="clear"
            >
                <span v-if="modelValue" class="text-nowrap">{{ modelValue?.[optionLabel] }}</span>
                <span v-else-if="placeholder" class="text-nowrap text-gray-400">{{ placeholder }}</span>
            </SelectorButton>
        </template>

        <template #dropdownHeader>
            <SelectorInputSearch v-if="search" ref="$selectorInputSearch" @query="query => $emit('query', query)" />
        </template>

        <template #dropdown>
            <SelectorOptions
                :options="options"
                :optionLabel="optionLabel"
                :optionGroupLabel="optionGroupLabel"
                :optionGroupItems="optionGroupItems"
                :isSelected="isSelected"
                @select="(item: any) => selectOption(item)"
            >
                <template #option="{ option }">
                    <slot name="option" :option="option" />
                </template>
            </SelectorOptions>
        </template>
    </SelectorLayout>
</template>