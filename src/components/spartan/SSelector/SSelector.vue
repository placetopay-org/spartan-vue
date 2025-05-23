<script setup lang="ts">
import { usePassthrough } from '@/helpers';
import type { TSelectorProps, TSelectorEmits, TOption } from './types';
import { type TPopoverProps } from '@spartan';
import { computed, useTemplateRef, ref, watch } from 'vue';
import isEqual from 'lodash.isequal';
import { SelectorLayout, SelectorButton, SelectorOptions, SelectorInputSearch } from '@internal';

const emit = defineEmits<TSelectorEmits>();
const {
    rounded = 'both',
    optionLabel = 'label',
    optionValue,
    modelValue,
    search,
    clearable,
    options,
} = defineProps<TSelectorProps & TPopoverProps>();
const { pt, extractor } = usePassthrough();

const ptOptions = extractor(pt.value.options);

const $selectorLayout = useTemplateRef<typeof SelectorLayout>('selectorLayout');
const $selectorButton = useTemplateRef<typeof SelectorButton>('selectorButton');
const $selectorInputSearch = useTemplateRef<typeof SelectorInputSearch>('selectorInputSearch');

const $popover = computed(() => $selectorLayout.value?.$popover);
const $button = computed(() => $selectorButton.value?.$button);
const $input = computed(() => $selectorInputSearch.value?.$input);

const optionsWidth = computed(() => {
    return $button.value?.clientWidth || 20;
});

const showClearButton = computed(() => Boolean(clearable && modelValue));

const isSelected = (option: TOption) => {
    if (!modelValue) return false;

    if (typeof option === 'object') {
        return optionValue ? isEqual(option[optionValue], modelValue) : isEqual(option, modelValue);
    }

    return option === modelValue;
};

const toggleOptions = () => {
    $popover.value?.toggle();
    if (search && $popover.value?.isOpen) $input.value?.focus();
};

const selectOption = (option: TOption) => {
    emit('update:modelValue', option);
    resetOptions();
    $popover.value?.close();
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

const resetOptions = () => {
    computedOptions.value = structuredClone(options);
};

const label = computed(() => {
    if (typeof modelValue === 'string') return modelValue;
    return modelValue?.[optionLabel];
});

const computedOptions = ref(structuredClone(options));

const updateQuery = (query: string) => {
    emit('query', query);

    if (search && search !== 'manual') {
        const getOptionLabel = (option: TOption) => {
            if (typeof option === 'object') return option[optionLabel];
            return option;
        };

        computedOptions.value = structuredClone(options).filter((option) =>
            getOptionLabel(option).toLowerCase().includes(query),
        );
    }
};

watch(
    () => options,
    () => {
        resetOptions();
    },
);
</script>

<template>
    <SelectorLayout ref="selectorLayout" :width="optionsWidth" :pt-options @close="refreshInput">
        <template #button>
            <SelectorButton
                ref="selectorButton"
                :class="$props.class"
                :disabled="disabled"
                :rounded="rounded"
                :error="error"
                :loading="loading"
                :show-clear-button="showClearButton"
                @click="toggleOptions"
                @clear="clear"
            >
                <span v-if="modelValue" class="text-nowrap">{{ label }}</span>
                <span v-else-if="placeholder" class="text-nowrap text-gray-400">{{ placeholder }}</span>
            </SelectorButton>
        </template>

        <template #dropdownHeader>
            <SelectorInputSearch v-if="search" ref="selectorInputSearch" @query="updateQuery" />
        </template>

        <template #dropdown>
            <SelectorOptions
                :options="computedOptions"
                :option-value
                :option-label
                :option-group-label
                :option-group-items
                :is-selected
                @select="(item: any) => selectOption(item)"
            >
                <template #option="{ option }">
                    <slot name="option" :option="option" />
                </template>
            </SelectorOptions>
        </template>
    </SelectorLayout>
</template>
