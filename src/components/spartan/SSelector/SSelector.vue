<script setup lang="ts">
import { hasSlotContent, usePassthrough } from '@/helpers';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { buttonStyles, optionStyles } from './styles';
import type { TSelectorProps, TSelectorEmits, TOption } from './types';
import { SPopover, type TPopoverProps } from '../SPopover';
import { ref } from 'vue';
import isEqual from 'lodash.isequal';

const emit = defineEmits<TSelectorEmits>();
defineProps<TSelectorProps & TPopoverProps>();
const { pt, extractor } = usePassthrough();

const [optionsClass, optionsProps] = extractor(pt.value.options);

const popover = ref<InstanceType<typeof SPopover> | null>(null);
const button = ref<HTMLButtonElement | null>(null);

const selectOption = (option: TOption) => {
     console.log('select', option);
     emit('update:modelValue', option);
     popover.value?.close();
}
</script>

<template>
    <SPopover :offset="2" ref="popover" :static="static" :responsive="responsive">
        <template #reference="{ toggle }">
            <button
                :disabled="disabled"
                ref="button"
                @click="toggle"
                :class="twMerge(buttonStyles({ disabled }), $props.class)"
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
            </div>
        </div>
    </SPopover>
</template>
