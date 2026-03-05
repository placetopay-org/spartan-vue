<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { optionStyles } from '../styles';
import { hasSlotContent, translator } from '@/helpers';

type TOption = Record<string, any> | string;

defineEmits<{
    (e: 'select', option: TOption): void;
}>();

const {
    optionLabel = 'label',
    options,
    optionValue,
} = defineProps<{
    options: TOption[];
    optionLabel?: string;
    optionValue?: string;
    optionGroupLabel?: string;
    optionGroupItems?: string;
    isSelected: (option: TOption) => boolean;
}>();

const getOptionLabel = (option: TOption) => {
    if (typeof option === 'object') return option[optionLabel];
    return option;
};

const getOptionValue = (option: TOption) => {
    return typeof option === 'object' && optionValue ? option[optionValue] : option;
};

const { t } = translator('selector');
</script>

<template>
    <template v-if="!options.length">
        <span class="relative flex px-3 pt-2 pb-6 text-sm text-gray-400 dark:text-gray-500">{{ t('noResults') }}</span>
    </template>
    <template v-else>
        <template v-for="(option, index) in options" :key="index">
            <span
                v-if="typeof option === 'object' && optionGroupLabel && option[optionGroupLabel]"
                class="py-2 pl-3 text-xs font-medium text-gray-400 uppercase"
            >
                {{ option[optionGroupLabel] }}
            </span>

            <button
                v-for="(item, itemIndex) in typeof option === 'object' && optionGroupItems
                    ? option[optionGroupItems]
                    : [option]"
                :key="getOptionValue(item) || itemIndex"
                :disabled="item.disabled"
                :class="twMerge(optionStyles({ selected: isSelected(item), disabled: item.disabled }))"
                @click="$emit('select', getOptionValue(item))"
            >
                <slot v-if="hasSlotContent($slots.option)" name="option" :option="item" />
                <span v-else>{{ getOptionLabel(item) }}</span>

                <CheckIcon v-if="isSelected(item)" class="text-spartan-primary-500 ml-auto h-5 w-5 shrink-0" />
            </button>
        </template>
    </template>
</template>
