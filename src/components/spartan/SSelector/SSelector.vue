<script setup lang="ts">
import { hasSlotContent, usePassthrough } from '@/helpers';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { inputContainerStyles, inputStyles, buttonStyles, optionStyles } from './styles';
import type { TSelectorProps, TSelectorEmits, TOption } from './types';
import { SPopover, type TPopoverProps } from '../SPopover';
import { ref } from 'vue';
import isEqual from 'lodash.isequal';
import { translator } from '@/helpers';
import { Loader } from '@internal';

const emit = defineEmits<TSelectorEmits>();
const { rounded = 'both', modelValue, optionLabel, search } = defineProps<TSelectorProps & TPopoverProps>();
const { pt, extractor } = usePassthrough();

const { t } = translator('selector');

const [optionsClass, optionsProps] = extractor(pt.value.options);

const popover = ref<InstanceType<typeof SPopover> | null>(null);
const button = ref<HTMLButtonElement | null>(null);

const inputElement = ref<HTMLInputElement | null>(null);

const selectOption = (option: TOption) => {
     emit('update:modelValue', option);
     popover.value?.close();
}

const focusout = () => popover.value?.focusout();

const refreshInput = () => {
    if (search && modelValue) {
        inputElement.value!.value = modelValue[optionLabel];
        emit('query', modelValue[optionLabel]);
    }
};
</script>

<template>
    <SPopover :offset="2" ref="popover" :static="static" :responsive="responsive" :prevent-focus="search" @close="refreshInput">
        <template #reference="{ toggle, open, close }">
            <div v-if="search" :class="twMerge(inputContainerStyles({ disabled, error, rounded }))">
                <input ref="inputElement" :class="twMerge(inputStyles({ rounded }))" @focusin="open" @focusout="focusout()" @input="(e: any) => $emit('query', e.target.value)" />
            </div>
            <button
                v-else
                :disabled="disabled"
                ref="button"
                @click="toggle"
                :class="twMerge(buttonStyles({ disabled, error, rounded }), $props.class)"
            >
                <span v-if="modelValue" class="text-nowrap">{{ modelValue?.[optionLabel] }}</span>
                <span v-else-if="placeholder" class="text-nowrap text-gray-400">{{ placeholder }}</span>
                <ChevronDownIcon class="shrink-0 -mr-1 ml-auto h-5 w-5 text-gray-400" />
            </button>
        </template>

        <div class="rounded-md overflow-hidden border border-gray-950/5 bg-white shadow-lg">
            <div
                data-s-options
                v-bind="optionsProps"
                :class="twMerge('py-1 shadow-lg max-h-80 overflow-auto', optionsClass)"
                :style="{ minWidth: `${button?.clientWidth}px` }"
            >
                <template v-if="loading">
                    <p class="relative flex py-2 px-3 gap-2 uppercase text-gray-400 text-xs font-medium">
                        <Loader class="h-4 w-4" />
                        <span>{{ t('loading') }}</span>
                    </p>
                </template>
                <template v-else-if="!options.length">
                    <span class="relative flex py-2 px-3 uppercase text-gray-400 text-xs font-medium">{{ t('noResults') }}</span>
                </template>
                <template v-else>
                    <template v-for="option in options">
                        <span v-if="optionGroupLabel && option[optionGroupLabel]" class="py-2 pl-3 uppercase text-gray-400 text-xs font-medium">{{ option[optionGroupLabel] }}</span>
    
                        <button v-for="item in optionGroupItems ? option[optionGroupItems] : [option]" @click="selectOption(item)" :disabled="item.disabled" :class="twMerge(optionStyles({ selected: isEqual(item, modelValue), disabled: item.disabled }))">
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
