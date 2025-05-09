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
        <span class="relative flex px-3 py-2 text-xs font-medium text-gray-400">{{ t('noResults') }}</span>
    </template>
    <template v-else>
        <template v-for="(option, index) in options" :key="index">
            <span
                v-if="typeof option === 'object' && optionGroupLabel && option[optionGroupLabel]"
                class="py-2 pl-3 text-xs font-medium uppercase text-gray-400"
            >
                {{ option[optionGroupLabel] }}
            </span>

            <button
                v-for="item in typeof option === 'object' && optionGroupItems ? option[optionGroupItems] : [option]"
                @click="$emit('select', getOptionValue(item))"
                :disabled="item.disabled"
                :class="twMerge(optionStyles({ selected: isSelected(item), disabled: item.disabled }))"
            >
                <slot name="option" :option="item" v-if="hasSlotContent($slots.option)" />
                <span v-else>{{ getOptionLabel(item) }}</span>

                <CheckIcon
                    v-if="isSelected(item)"
                    class="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-spartan-primary-500"
                />
            </button>
        </template>
    </template>
</template>
