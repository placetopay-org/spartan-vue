<script setup lang="ts">
import { createContext } from './api';
import { hasSlotContent } from '@/helpers';
import { Combobox, ComboboxButton, ComboboxOptions, ComboboxInput } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { comboboxStyles, comboboxInputStyles, comboboxButtonStyles } from './styles';
import type { TComboboxProps, TComboboxEmits, TOption } from './types';

const emit = defineEmits<TComboboxEmits>();

const props = withDefaults(defineProps<Partial<TComboboxProps>>(), {
    disabled: false,
    error: false,
    search: false,
    modelValue: undefined,
    rounded: 'both',
    displayButtonText: undefined,
});

const store = createContext({ props, emit });
</script>

<template>
    <div>
        <Combobox
            v-slot="{ open }"
            as="div"
            :model-value="store.querySelectionId(modelValue)"
            :class="twMerge(comboboxStyles({ disabled, rounded, error }), props.class)"
            @update:model-value="$emit('update:modelValue', store.options[$event].value)"
        >
            <ComboboxInput
                v-if="search"
                :id="id"
                autocomplete="off"
                :disabled="disabled"
                :display-value="
                    (optionId: unknown) => displayButtonText!(store.options[optionId as TOption['id']]?.value)
                "
                :class="twMerge(comboboxInputStyles({ rounded }))"
                @change="(event) => store.updateQuery(event.target.value)"
            />
            <ComboboxButton
                :id="id"
                :tabindex="search ? -1 : 0"
                :disabled="disabled"
                :class="twMerge(comboboxButtonStyles({ rounded, search: Boolean(search) }))"
            >
                <template v-if="!search">
                    <span v-if="hasSlotContent($slots.button)" class="block truncate text-gray-900">
                        <slot name="button" />
                    </span>
                    <span v-else>
                        {{ (displayButtonText && displayButtonText(store.getSelection()?.value)) || '&nbsp;' }}
                    </span>
                </template>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ComboboxButton>

            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
                @after-leave="store.updateQuery('')"
            >
                <ComboboxOptions
                    v-show="open"
                    static
                    class="absolute z-10 mt-1 max-h-60 min-w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                    <div
                        v-if="store.emptyResults() && store.query !== ''"
                        class="relative cursor-default select-none truncate px-4 py-2 text-gray-700"
                    >
                        Nothing found.
                    </div>
                    <slot />
                </ComboboxOptions>
            </transition>
        </Combobox>
    </div>
</template>
