<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxLabel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { currentSelection, type TOption } from './api';
import { roundedClass, type TRounded } from '@/helpers';
import { computed } from 'vue';
import { HelpAndErrorTexts } from '@internal';
import { SLabel } from '@spartan';

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
    defineProps<
        Partial<{
            disabled: boolean;
            error: boolean;
            errorText: string;
            helpText: string;
            label: string;
            modelValue: TOption;
            placeholder: string;
            rounded: TRounded;
        }>
    >(),
    {
        disabled: false,
        error: false,
        errorText: undefined,
        helpText: undefined,
        label: undefined,
        modelValue: undefined,
        placeholder: undefined,
        rounded: 'both',
    },
);

currentSelection.value = props.modelValue;
const model = computed({
    get() {
        return props.modelValue ?? currentSelection.value;
    },
    set(newValue) {
        currentSelection.value = newValue;
        emit('update:modelValue', newValue);
    },
});

const errorClass = computed(() => {
    return props.error ? 'border-red-300 text-red-900 focus:s-ring-error' : 'border-gray-300 focus:s-ring';
});
</script>

<template>
    <div>
        <Listbox v-model="model" :class="[disabled && 'pointer-events-none opacity-50']">
            <div class="relative">
                <ListboxLabel v-if="label">
                    <SLabel>{{ label }}</SLabel>
                </ListboxLabel>

                <ListboxButton
                    :class="[
                        'relative w-full cursor-pointer border bg-white py-2 pl-3 pr-8 text-left focus:outline-none',
                        errorClass,
                        roundedClass[rounded],
                    ]"
                >
                    <span v-if="model" class="block truncate">{{ model.label }}</span>
                    <span v-else class="block truncate text-gray-500">{{ placeholder || '&nbsp;' }}</span>
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

        <HelpAndErrorTexts :help="helpText" :error="errorText" />
    </div>
</template>
