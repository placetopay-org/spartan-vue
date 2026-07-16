<script lang="ts">
/**
 * A custom dropdown selector with search, clear, and grouped options support.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SSelector Github}.
 * @see {@link https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=13097-22397 Figma}.
 */
export default {
    name: 'SSelector',
};
</script>

<script setup lang="ts">
import { usePassthrough, isEqual } from '@/helpers';
import type { TSelectorProps, TSelectorEmits, TSelectorSlots, TOption } from './types';
import { type TPopoverProps } from '@spartan';
import { computed, useTemplateRef, ref, watch } from 'vue';
import { SelectorLayout, SelectorButton, SelectorOptions, SelectorInputSearch } from '@internal';

const emit = defineEmits<TSelectorEmits>();
defineSlots<TSelectorSlots>();
const {
    rounded = 'both',
    optionLabel = 'label',
    optionValue,
    optionGroupItems,
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
    computedOptions.value = [...options];
};

const flatOptions = computed<TOption[]>(() => {
    if (!optionGroupItems) return options;
    return options.flatMap((option) => {
        if (typeof option === 'object' && Array.isArray(option[optionGroupItems])) {
            return option[optionGroupItems] as TOption[];
        }
        return [option];
    });
});

const resolvedSelectedOption = computed<TOption | undefined>(() => {
    if (modelValue === undefined || modelValue === null) return undefined;
    if (typeof modelValue === 'object') return modelValue;

    return flatOptions.value.find((option) => {
        if (typeof option === 'object') {
            return optionValue ? isEqual(option[optionValue], modelValue) : false;
        }
        return option === modelValue;
    });
});

const label = computed(() => {
    const option = resolvedSelectedOption.value;
    if (option === undefined) return undefined;
    if (typeof option !== 'object') return option;
    return option[optionLabel];
});

const computedOptions = ref([...options]);

const updateQuery = (query: string) => {
    emit('query', query);

    if (search && search !== 'manual') {
        const getOptionLabel = (option: TOption) => {
            if (typeof option === 'object') return option[optionLabel];
            return option;
        };

        computedOptions.value = [...options].filter((option) => getOptionLabel(option).toLowerCase().includes(query));
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
                <slot name="trigger" :option="resolvedSelectedOption" :placeholder="placeholder">
                    <span v-if="label" class="text-nowrap">{{ label }}</span>
                    <span v-else-if="placeholder" class="text-nowrap text-gray-400">{{ placeholder }}</span>
                </slot>
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
