<script setup lang="ts">
import { Loader } from '@internal';
import { CheckIcon, ChevronDownIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { optionStyles } from '../styles';
import { inputStyle } from '@/constants';
import { hasSlotContent, translator } from '@/helpers';
import isEqual from 'lodash.isequal';

defineEmits<{
    (e: 'select', option: Record<string, any>): void;
}>();

defineProps<{
    options: Record<string, any>[];
    optionLabel: string;
    optionGroupLabel?: string;
    optionGroupItems?: string;
    isSelected: (option: any) => boolean;
}>();

const { t } = translator('selector');
</script>

<template>
    <template v-if="!options.length">
        <span class="relative flex px-3 py-2 text-xs font-medium text-gray-400">{{ t('noResults') }}</span>
    </template>
    <template v-else>
        <template v-for="option in options">
            <span
                v-if="optionGroupLabel && option[optionGroupLabel]"
                class="py-2 pl-3 text-xs font-medium uppercase text-gray-400"
            >
                {{ option[optionGroupLabel] }}
            </span>

            <button
                v-for="item in optionGroupItems ? option[optionGroupItems] : [option]"
                @click="$emit('select', item)"
                :disabled="item.disabled"
                :class="twMerge(optionStyles({ selected: isSelected(item), disabled: item.disabled }))"
            >
                <slot name="option" :option="item" v-if="hasSlotContent($slots.option)" />
                <span v-else>{{ item[optionLabel] }}</span>

                <CheckIcon
                    v-if="isSelected(item)"
                    class="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-spartan-primary-500"
                />
            </button>
        </template>
    </template>
</template>
