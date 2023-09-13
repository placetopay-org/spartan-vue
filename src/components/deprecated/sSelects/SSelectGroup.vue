<script setup lang="ts">
import { computed } from 'vue';
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { CheckIcon } from '@heroicons/vue/24/solid';

const emits = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
}>();
const props = defineProps<{
    label?: string;
    id?: string;
    placeholder?: string;
    disabled?: boolean;
    modelValue: string | number;
    options: Array<{
        label: string;
        options: Array<{ label: string; value: string }>;
    }>;
}>();

const packOptions = computed(() =>
    props.options.reduce<Record<string | number, { label: string; value: string }>>((acc, { options }) => {
        options.forEach((option) => (acc[option.value] = option));
        return acc;
    }, {}),
);

const model = computed({
    get: () => packOptions.value[props.modelValue],
    set: (value) => {
        emits('update:modelValue', value.value);
    },
});
</script>

<template>
    <Listbox v-slot="{ open }" v-model="model" as="div" :disabled="disabled" class="relative">
        <ListboxLabel v-if="label && id" :for="id" class="block text-sm font-medium text-gray-700">
            {{ label }}
        </ListboxLabel>

        <ListboxButton
            class="flex w-full cursor-auto items-center justify-between rounded-lg border border-gray-300 px-3 pb-2 pt-2 text-left text-base text-gray-900 placeholder-gray-500 shadow-sm focus:z-10 focus:border-primary-300 focus:ring focus:ring-primary-100 disabled:opacity-70"
            :class="[label && id ? 'mt-1' : '']"
        >
            <span :class="['flex items-center truncate', model ? 'uppercase' : '']">{{
                model ? model.value : placeholder
            }}</span>

            <span class="pointer-events-none flex items-center">
                <ChevronDownIcon class="h-4 w-4 text-gray-500" :aria-hidden="open ? 'true' : 'false'" />
            </span>
        </ListboxButton>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <ListboxOptions
                class="min-w-56 min-h-56 absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
                <li v-for="group in options" :key="group.label">
                    <div v-if="group.label" class="bg-gray-100 px-4 py-1">
                        <span class="font-semibold text-gray-700">{{ group.label }}</span>
                    </div>

                    <ul>
                        <ListboxOption
                            v-for="option in group.options"
                            :key="option.value"
                            v-slot="{ active, selected }"
                            as="template"
                            :value="option"
                        >
                            <li
                                :class="[
                                    active ? 'bg-gray-200 bg-opacity-20' : 'text-gray-900',
                                    'relative cursor-default select-none px-4 py-2',
                                ]"
                            >
                                <div class="flex items-center gap-1">
                                    <span class="font-semibold uppercase">{{ option.value }}:</span>
                                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                        option.label
                                    }}</span>
                                </div>

                                <span
                                    v-if="selected"
                                    class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600"
                                >
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ul>
                </li>
            </ListboxOptions>
        </transition>
    </Listbox>
</template>
