<script setup lang="ts">
import { hasSlotContent, usePassthrough } from '@/helpers';
import { CheckIcon, ChevronDownIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { inputStyles, buttonStyles, optionStyles } from './styles';
import type { TSelectorProps, TSelectorEmits, TOption } from './types';
import { SPopover, type TPopoverProps } from '../SPopover';
import { ref, computed, nextTick } from 'vue';
import isEqual from 'lodash.isequal';
import { translator } from '@/helpers';
import { Loader } from '@internal';

const emit = defineEmits<TSelectorEmits>();
const { rounded = 'both', modelValue, optionLabel, search, clearable } = defineProps<TSelectorProps & TPopoverProps>();
const { pt, extractor } = usePassthrough();

const { t } = translator('selector');

const [optionsClass, optionsProps] = extractor(pt.value.options);

const popover = ref<InstanceType<typeof SPopover> | null>(null);
const $button = ref<HTMLButtonElement | null>(null);
const $input = ref<HTMLInputElement | null>(null);

const showClearButton = computed(() => clearable && modelValue);

const actionAndClose = (action: () => void) => {
    action();
    popover.value?.close();
};

const toggleOptions = () => {
    popover.value?.toggle();
    if (search && popover.value?.isOpen) {
        nextTick(() => {
            // prevent jumping
            setTimeout(() => {
                $input.value?.focus();
            }, 0);
        });
    }
};

const selectOption = (option: TOption) => actionAndClose(() => emit('update:modelValue', option));
const clear = () => {
    emit('update:modelValue');
    $input.value?.focus();
};

const refreshInput = () => {
    if (search && modelValue) {
        $input.value!.value = modelValue[optionLabel];
        emit('query', '');
    }
};
</script>

<template>
    <SPopover :offset="2" ref="popover" :static="static" :responsive="responsive" @close="refreshInput">
        <template #reference>
            <button
                :disabled="disabled"
                ref="$button"
                @click="toggleOptions"
                :class="twMerge(buttonStyles({ disabled, error, rounded }), $props.class)"
            >
                <span v-if="modelValue" class="text-nowrap">{{ modelValue?.[optionLabel] }}</span>
                <span v-else-if="placeholder" class="text-nowrap text-gray-400">{{ placeholder }}</span>

                <div class="-mr-1 ml-auto flex gap-1 text-gray-400">
                    <button @click.stop="clear" v-if="showClearButton" class="group">
                        <XMarkIcon class="h-5 w-5 shrink-0 group-hover:text-gray-600" />
                    </button>
                    <ChevronDownIcon class="h-5 w-5 shrink-0" />
                </div>
            </button>
        </template>

        <div class="overflow-hidden rounded-md border border-gray-950/5 bg-white shadow-lg">
            <div
                data-s-options
                v-bind="optionsProps"
                :class="twMerge('max-h-80 overflow-auto', optionsClass)"
                :style="{ minWidth: `${$button?.clientWidth}px` }"
            >
                <div v-if="search" class="flex items-center gap-2.5 border-b border-gray-950/5 px-3 py-1.5">
                    <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
                    <input
                        ref="$input"
                        :class="twMerge(inputStyles({ rounded }))"
                        @input="(e: any) => $emit('query', e.target.value)"
                    />
                </div>
                <template v-if="loading">
                    <p class="relative flex gap-2 px-3 py-2 text-xs font-medium text-gray-400">
                        <Loader class="h-4 w-4" />
                        <span>{{ t('loading') }}</span>
                    </p>
                </template>
                <template v-else-if="!options.length">
                    <span class="relative flex px-3 py-2 text-xs font-medium text-gray-400">{{
                        t('noResults')
                    }}</span>
                </template>
                <template v-else>
                    <template v-for="option in options">
                        <span
                            v-if="optionGroupLabel && option[optionGroupLabel]"
                            class="py-2 pl-3 text-xs font-medium uppercase text-gray-400"
                            >{{ option[optionGroupLabel] }}</span
                        >

                        <button
                            v-for="item in optionGroupItems ? option[optionGroupItems] : [option]"
                            @click="selectOption(item)"
                            :disabled="item.disabled"
                            :class="
                                twMerge(optionStyles({ selected: isEqual(item, modelValue), disabled: item.disabled }))
                            "
                        >
                            <slot name="option" :option="item" v-if="hasSlotContent($slots.option)" />
                            <span v-else>{{ item[optionLabel] }}</span>

                            <CheckIcon
                                v-if="isEqual(item, modelValue)"
                                class="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-spartan-primary-500"
                            />
                        </button>
                    </template>
                </template>
            </div>
        </div>
    </SPopover>
</template>
