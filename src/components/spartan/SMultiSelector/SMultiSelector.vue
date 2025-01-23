<script setup lang="ts">
import { hasSlotContent, usePassthrough } from '@/helpers';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { inputContainerStyles, inputStyles, buttonStyles, optionStyles } from './styles';
import type { TMultiSelectorProps, TMultiSelectorEmits, TOption } from './types';
import { SPopover, type TPopoverProps } from '../SPopover';
import { computed, nextTick, ref } from 'vue';
import isEqual from 'lodash.isequal';
import { translator } from '@/helpers';
import { Loader, InputContainer } from '@internal';

const emit = defineEmits<TMultiSelectorEmits>();
const { rounded = 'both', modelValue, optionLabel, search, count } = defineProps<TMultiSelectorProps & TPopoverProps>();
const { pt, extractor } = usePassthrough();

const { t } = translator('selector');

const [optionsClass, optionsProps] = extractor(pt.value.options);

const $popover = ref<InstanceType<typeof SPopover> | null>(null);
const $button = ref<HTMLButtonElement | null>(null);
const $input = ref<HTMLInputElement | null>(null);

const countNumber = computed(() => count ? (modelValue || []).length - count : 0);

const selectOption = (option: TOption) => {
    const current = modelValue || [];
    if (current.includes(option)) emit('update:modelValue', current.filter((item) => !isEqual(item, option)));
    else emit('update:modelValue', [...current, option]);
    //  emit('update:modelValue', [...(modelValue || []), option]);
    //  popover.value?.close();
}

const focusout = () => $popover.value?.focusout();

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

const refreshInput = () => {
    // if (search && modelValue) {
    //     inputElement.value!.value = modelValue[optionLabel];
    //     emit('query', modelValue[optionLabel]);
    // }
};

const removeOption = (option: TOption) => {
    emit('update:modelValue', modelValue!.filter((item) => !isEqual(item, option)));
};
</script>

<template>
    <SPopover :offset="2" ref="$popover" :static="static" :responsive="responsive" :prevent-focus="search" @close="refreshInput">
        <!-- <template #reference="{ toggle, open, close }">
            <InputContainer>
                <input v-if="search" ref="$input" :class="twMerge(inputStyles({ rounded }))" @focusin="open" @focusout="focusout()" @input="(e: any) => $emit('query', e.target.value)" />
                <button ref="$button" v-else class="flex items-center gap-2 px-3 py-1.5" @click="toggle">
                    <template v-if="modelValue && modelValue.length">
                        <div v-for="option in modelValue.slice(0, count || modelValue.length)" class="flex h-fit gap-1 self-center rounded-lg bg-gray-200 pl-2 pr-1.5 text-sm text-gray-900">
                            {{ option?.[optionLabel] }}
                            <button @click.stop="removeOption(option)" class="bg-gray-400 rounded-full relative h-3 w-3 flex items-center justify-center self-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" class="h-3 w-3">
                                    <path
                                        d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div v-if="countNumber > 0" class="flex h-fit gap-1 self-center rounded-lg bg-gray-200 pl-2 pr-1.5 text-sm text-gray-900">
                            +{{ countNumber }}
                        </div>
                    </template>
                    <span v-else-if="placeholder" class="text-nowrap text-gray-400">{{ placeholder }}</span>
                    <ChevronDownIcon class="shrink-0 -mr-1 ml-auto h-5 w-5 text-gray-400" />
                </button>
            </InputContainer>
        </template> -->

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

        <div class="rounded-md overflow-hidden border border-gray-950/5 bg-white shadow-lg">
            <div
                data-s-options
                v-bind="optionsProps"
                :class="twMerge('py-1 shadow-lg max-h-80 overflow-auto', optionsClass)"
                :style="{ minWidth: `${(search ? $input : $button)?.clientWidth}px` }"
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
                                v-if="modelValue && modelValue.includes(item)"
                                class="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-spartan-primary-500"
                            />
                        </button>
                    </template>
                </template>
            </div>
        </div>
    </SPopover>
</template>
