<script setup lang="ts">
import { createSComboboxContext } from './api';
import { hasSlotContent, roundedClass } from '@/helpers';
import { Combobox, ComboboxButton, ComboboxOptions, ComboboxInput } from '@headlessui/vue';
import { computed, ref } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import type { TComboboxProps, TComboboxSearchProps } from './types';
import SComboboxOption from './SComboboxOption.vue';

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<Partial<TComboboxProps | TComboboxSearchProps>>(), {
    disabled: false,
    error: false,
    searchBy: undefined,
    options: undefined,
    modelValue: undefined,
    rounded: 'both',
    displayButtonText: undefined,
    displayOptionText: undefined,
});

const state = createSComboboxContext({
    props: computed(() => props),
    currentSelection: props.modelValue,
    updateCurrentSelection(newValue) {
        state.currentSelection = newValue;
        emit('update:modelValue', newValue);
    },
});

const model = computed({
    get() {
        return props.modelValue ?? state.currentSelection;
    },
    set(newValue) {
        state.updateCurrentSelection(newValue);
    },
});

const errorClass = computed(() => {
    return props.error ? 'border-red-300 text-red-900 focus:s-ring-error' : 'border-gray-300 focus:s-ring';
});

const query = ref('');
const filteredOptions = computed(() =>
    query.value === ''
        ? props.options
        : props.options?.filter((option) =>
              props.searchBy!(option)
                  .toLowerCase()
                  .replace(/\s+/g, '')
                  .includes(query.value.toLowerCase().replace(/\s+/g, '')),
          ),
);

const onlyButtonClass = computed(() => [
    'relative w-full cursor-pointer border border-gray-300 bg-white py-2 pl-3 pr-8 text-left focus:outline-none',
    errorClass.value,
    roundedClass[props.rounded],
]);
</script>

<template>
    <div>
        <Combobox v-model="model" :class="[disabled && 'pointer-events-none opacity-50']">
            <div :class="['relative', roundedClass[props.rounded], searchBy ? 'w-full border border-gray-300' : '']">
                <ComboboxInput
                    v-if="searchBy"
                    :display-value="displayButtonText"
                    :class="[
                        'w-full border-none py-2 pl-3 pr-8 text-sm leading-5 text-gray-900 focus:ring-0',
                        roundedClass[props.rounded],
                    ]"
                    @change="query = $event.target.value"
                />
                <ComboboxButton :class="searchBy ? 'absolute inset-y-0 right-0 w-8' : onlyButtonClass">
                    <template v-if="!searchBy">
                        <span v-if="hasSlotContent($slots.button)" class="block truncate">
                            <slot name="button" />
                        </span>
                        <span v-else>
                            {{ (displayButtonText && displayButtonText(state.currentSelection)) || '&nbsp;' }}
                        </span>
                    </template>
                    <span :class="['pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2']">
                        <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </ComboboxButton>

                <transition
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <ComboboxOptions
                        class="absolute mt-1 max-h-60 min-w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                        <template v-if="hasSlotContent($slots.default)">
                            <slot />
                        </template>
                        <SComboboxOption v-for="option in filteredOptions" v-else :key="option.id" :value="option">
                            {{ displayOptionText!(option) }}
                        </SComboboxOption>
                    </ComboboxOptions>
                </transition>
            </div>
        </Combobox>
    </div>
</template>
