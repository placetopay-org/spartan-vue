<script setup lang="ts">
import { translator, usePassthrough } from '@/helpers';
import type { TMultiSelectorProps, TMultiSelectorEmits, TOption } from './types';
import { type TPopoverProps, SBadge } from '@spartan';
import { computed, nextTick, useTemplateRef } from 'vue';
import isEqual from 'lodash.isequal';
import some from 'lodash.some';
import {
    SelectorLayout,
    SelectorButton,
    SelectorOptions,
    SelectorInputSearch,
    SelectorBadgeList,
    SelectorHandler,
} from '@internal';

const emit = defineEmits<TMultiSelectorEmits>();
const {
    modelValue,
    optionLabel,
    search,
    options,
    clearable,
    count = 3,
    rounded = 'both',
} = defineProps<TMultiSelectorProps & TPopoverProps>();
const { pt, extractor } = usePassthrough();

const { t } = translator('selector');

const ptOptions = extractor(pt.value.options);

const $selectorLayout = useTemplateRef<any>('$selectorLayout');
const $selectorButton = useTemplateRef<any>('$selectorButton');
const $selectorInputSearch = useTemplateRef<any>('$selectorInputSearch');

const $popover = computed(() => $selectorLayout.value?.$popover);
const $options = computed(() => $selectorLayout.value?.$options);
const $button = computed(() => $selectorButton.value?.$button);
const $input = computed(() => $selectorInputSearch.value?.$input);

const buttonWidth = computed(() => {
    return $button.value?.clientWidth || 320;
});

const optionsWidth = computed(() => {
    return $options.value?.clientWidth || 320;
});

const countNumber = computed(() => (count ? (modelValue || []).length - count : 0));
const showClearButton = computed(() => Boolean(clearable && modelValue && modelValue.length));

const isSelected = (option: any) => Boolean(modelValue && some(modelValue, option));

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
    if (search && $popover.value?.isOpen) $input.value?.focus();
    else $options.value?.focus();

    const current = modelValue || [];
    if (some(current, option)) {
        emit(
            'update:modelValue',
            current.filter((item) => !isEqual(item, option)),
        );
    } else emit('update:modelValue', [...current, option]);
};

const add = () => {
    $input.value?.focus();
    const value = $input.value?.value.trim();
    if (!value) return;

    const option = { [optionLabel]: value };
    emit('add', option);
    selectOption(option);
    refreshInput();
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
    <SelectorLayout ref="$selectorLayout" :width="buttonWidth" :pt-options @close="refreshInput">
        <template #button>
            <SelectorButton
                ref="$selectorButton"
                :class="$props.class"
                :disabled="disabled"
                :rounded="rounded"
                :error="error"
                :loading="loading"
                :show-clear-button="showClearButton"
                @click="toggleOptions"
                @clear="clear"
            >
                <template v-if="modelValue && modelValue.length">
                    <template v-if="compact">
                        {{ modelValue.length }} {{ modelValue.length === 1 ? t('selection') : t('selections') }}
                    </template>
                    <template v-else>
                        <div ref="$badgesContainer" class="flex gap-1 overflow-auto">
                            <SBadge
                                v-for="(option, index) in modelValue.slice(0, count || modelValue.length)"
                                :key="option[optionValue] || option.value || index"
                                size="sm"
                                class="self-center whitespace-nowrap"
                                pill
                                :removable="removable && 'stopPropagation'"
                                @removed="selectOption(option)"
                            >
                                {{ option?.[optionLabel] }}
                            </SBadge>
                        </div>
                        <SBadge v-if="countNumber > 0" size="sm" class="self-center" pill> +{{ countNumber }} </SBadge>
                    </template>
                </template>
                <span v-else-if="placeholder" class="text-nowrap text-gray-400">{{ placeholder }}</span>
            </SelectorButton>
        </template>

        <template #dropdownHeader>
            <SelectorBadgeList
                v-if="badgeList"
                :width="optionsWidth"
                :options="modelValue"
                :option-label="optionLabel"
                @removed="(option) => selectOption(option)"
            />

            <SelectorInputSearch
                v-if="search"
                ref="$selectorInputSearch"
                @query="(query) => $emit('query', query)"
                @enter="add"
            />
        </template>

        <template #dropdown>
            <SelectorOptions
                :options="options"
                :option-label="optionLabel"
                :option-group-label="optionGroupLabel"
                :option-group-items="optionGroupItems"
                :is-selected="isSelected"
                @select="(item: any) => selectOption(item)"
            >
                <template #option="{ option }">
                    <slot name="option" :option="option" />
                </template>
            </SelectorOptions>
        </template>

        <template #dropdownFooter>
            <SelectorHandler v-if="search && handler" @add="add" />
        </template>
    </SelectorLayout>
</template>

<style scoped>
/* width */
::-webkit-scrollbar {
    height: 0px;
}
</style>
