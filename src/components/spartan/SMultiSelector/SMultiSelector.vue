<script setup lang="ts">
import { hasSlotContent, usePassthrough } from '@/helpers';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { inputContainerStyles, inputStyles, buttonStyles, optionStyles } from './styles';
import type { TMultiSelectorProps, TMultiSelectorEmits, TOption } from './types';
import { SPopover, type TPopoverProps } from '../SPopover';
import { computed, nextTick, onMounted, onUpdated, ref, watch } from 'vue';
import isEqual from 'lodash.isequal';
import { translator } from '@/helpers';
import { Loader, InputContainer } from '@internal';
import { SBadge } from '../SBadge';

const emit = defineEmits<TMultiSelectorEmits>();
const { rounded = 'both', mode = 'compact', modelValue, optionLabel, search, count = 3 } = defineProps<TMultiSelectorProps & TPopoverProps>();
const { pt, extractor } = usePassthrough();

const { t } = translator('selector');

const [optionsClass, optionsProps] = extractor(pt.value.options);

const $popover = ref<InstanceType<typeof SPopover> | null>(null);
const $button = ref<HTMLButtonElement | null>(null);
const $input = ref<HTMLInputElement | null>(null);
const $badgesContainer = ref<HTMLDivElement | null>(null);

const overflowBadges = ref(false);
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

// watch(() => modelValue, async (curr) => {
//     if (!curr?.length) return;
    
//     await nextTick();
//     overflowBadges.value = $button.value!.clientWidth - $badgesContainer.value!.clientWidth <= 44;

//     console.log(overflowBadges.value);
// }, { immediate: true });
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
            <template v-if="modelValue && modelValue.length">
                <template v-if="compact">
                    {{ modelValue.length  }} {{ t('selections') }}
                </template>
                <template v-else>
                    <div ref="$badgesContainer" class="flex gap-1 overflow-auto">
                        <SBadge v-for="option in modelValue.slice(0, count || modelValue.length)" size="sm" class="self-center whitespace-nowrap" pill>
                            {{ option?.[optionLabel] }}
                        </SBadge>
                    </div>
                    <SBadge v-if="countNumber > 0" size="sm" class="self-center" pill>
                        +{{ countNumber }}
                    </SBadge>
                </template>
            </template>
            <span v-else-if="placeholder" class="text-nowrap text-gray-400">{{ placeholder }}</span>
            <ChevronDownIcon class="shrink-0 -mr-1 ml-auto h-5 w-5 text-gray-400" />
            </button>
        </template>

        <div class="rounded-md overflow-hidden border border-gray-950/5 bg-white shadow-lg">
            <div
                data-s-options
                v-bind="optionsProps"
                :class="twMerge('shadow-lg max-h-80 overflow-auto', optionsClass)"
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

<style scoped>
/* width */
::-webkit-scrollbar {
    height: 0px;
}
</style>