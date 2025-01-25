<script setup lang="ts">
import type { TPopoverProps } from '@spartan';
import type { TSelectorLayoutProps } from './types';
import { SPopover } from '@spartan';
import { twMerge } from 'tailwind-merge';
import { buttonStyles, optionStyles } from './styles';
import { translator, usePassthrough, hasSlotContent } from '@/helpers';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import { inputStyle } from '@/constants';
import isEqual from 'lodash.isequal';

const { rounded = 'both', modelValue } = defineProps<TSelectorLayoutProps & TPopoverProps>();

const { pt, extractor } = usePassthrough();

const [optionsClass, optionsProps] = extractor(pt.value.options);

const $popover = ref<InstanceType<typeof SPopover> | null>(null);
const $button = ref<HTMLButtonElement | null>(null);
const $input = ref<HTMLInputElement | null>(null);

const { t } = translator('selector');

const isSelected = (option: any) => {
    if (Array.isArray(modelValue)) return modelValue.includes(option);
    else return isEqual(option, modelValue);
};

const selectOption = (option: any) => {
    console.log('selectOption');
};

const toggleOptions = () => {
    console.log('toggleOptions');
};

const refreshInput = () => {
    console.log('refreshInput');
};
</script>

<template>
    <SPopover :offset="2" ref="$popover" :static="static" :responsive="responsive" @close="refreshInput">
        <template #reference>
            <button
                :disabled="disabled"
                ref="$button"
                @click="toggleOptions"
                :class="twMerge(buttonStyles({ disabled, error, rounded }), 'flex items-center', $props.class)"
            >
                <slot name="button" />
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
                        :class="
                            twMerge(
                                `${inputStyle.root} ${inputStyle.text} ${inputStyle.placeholder} w-full border-none p-0 outline-none focus:ring-0`,
                            )
                        "
                        @input="(e: any) => $emit('query', e.target.value)"
                    />
                </div>
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
                            @click="selectOption(item)"
                            :disabled="item.disabled"
                            :class="
                                twMerge(optionStyles({ selected: isEqual(item, modelValue), disabled: item.disabled }))
                            "
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
            </div>
        </div>
    </SPopover>
</template>

<style scoped>
/* width */
::-webkit-scrollbar {
    height: 0px;
}
</style>
