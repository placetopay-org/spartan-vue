<script setup lang="ts">
import { hasSlotContent, type TRounded } from '@/helpers';
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions } from '@headlessui/vue';
import { computed } from 'vue';
import { SLabel } from '@spartan';
import { useSComboboxContext } from './api';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

defineProps<{
    disabled?: boolean;
    modelValue?: any;
    errorClass?: boolean;
    label?: string;
    roundedClass?: TRounded;
}>();

const { currentSelection, updateCurrentSelection } = useSComboboxContext('ComboboxBase');

const model = computed({
    get() {
        return currentSelection;
    },
    set(newValue) {
        updateCurrentSelection(newValue);
    },
});

console.log('comboboxbase', currentSelection);
</script>

<template>
    <Listbox v-model="model" :class="[disabled && 'pointer-events-none opacity-50']">
        <div class="relative">
            <ListboxLabel v-if="label">
                <SLabel>{{ label }}</SLabel>
            </ListboxLabel>

            <ListboxButton
                :class="[
                    'relative w-full cursor-pointer border bg-white py-2 pl-3 pr-8 text-left focus:outline-none',
                    errorClass,
                    roundedClass,
                ]"
            >
                <span v-if="hasSlotContent($slots.button)" class="block truncate">
                    <slot name="button" />
                </span>
                <span v-else> &nbsp;</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <ListboxOptions
                    class="absolute mt-1 max-h-60 min-w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                    <slot />
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>
