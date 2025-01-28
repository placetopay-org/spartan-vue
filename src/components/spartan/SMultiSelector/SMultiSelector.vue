<script setup lang="ts">
import { translator, usePassthrough } from '@/helpers';
import type { TMultiSelectorProps, TMultiSelectorEmits, TOption } from './types';
import { type TPopoverProps, SBadge } from '@spartan';
import { computed, nextTick, useTemplateRef } from 'vue';
import isEqual from 'lodash.isequal';
import { SelectorLayout, SelectorButton, SelectorOptions, SelectorInputSearch } from '@internal';

const emit = defineEmits<TMultiSelectorEmits>();
const { modelValue, optionLabel, search, clearable, count = 3, rounded = 'both' } = defineProps<TMultiSelectorProps & TPopoverProps>();
const { pt, extractor } = usePassthrough();

const { t } = translator('selector');

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

const countNumber = computed(() => count ? (modelValue || []).length - count : 0);
const showClearButton = computed(() => Boolean(clearable && modelValue));

const isSelected = (option: any) => Boolean(modelValue && modelValue.includes(option));

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
    const current = modelValue || [];
    if (current.includes(option)) emit('update:modelValue', current.filter((item) => !isEqual(item, option)));
    else emit('update:modelValue', [...current, option]);
    
    // delay closing after selection
    setTimeout(() => {
        $popover.value?.close();
    }, 0);
}

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
    <SelectorLayout ref="$selectorLayout" :optionsWidth="optionsWidth" :PtOptions="PtOptions" @close="refreshInput">
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
                <template v-if="modelValue && modelValue.length">
                    <template v-if="compact">
                        {{ modelValue.length }} {{ modelValue.length === 1 ? t('selection') : t('selections') }} {{  }}
                    </template>
                    <template v-else>
                        <div ref="$badgesContainer" class="flex gap-1 overflow-auto">
                            <SBadge v-for="option in modelValue.slice(0, count || modelValue.length)" size="sm" class="self-center whitespace-nowrap" pill :removable="removable" @removed="selectOption(option)">
                                {{ option?.[optionLabel] }}
                            </SBadge>
                        </div>
                        <SBadge v-if="countNumber > 0" size="sm" class="self-center" pill>
                            +{{ countNumber }}
                        </SBadge>
                    </template>
                </template>
                <span v-else-if="placeholder" class="text-nowrap text-gray-400">{{ placeholder }}</span>
            </SelectorButton>
        </template>

        <template #dropdown>
            <SelectorInputSearch v-if="search" ref="$selectorInputSearch" @query="query => $emit('query', query)" />

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
