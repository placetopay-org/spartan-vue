<script setup lang="ts">
import { computed } from 'vue';
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/outline';
import { CheckIcon } from '@heroicons/vue/solid';

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();
const props = defineProps<{
  label?: string;
  name?: string;
  id?: string;
  placeholder?: string,
  disabled?: boolean,
  modelValue: string | number;
  options: Array<{ label: string; options: Array<{ label: string; value: string; }> }>
}>();

const packOptions = computed(() =>
    props.options.reduce<Record<string | number, {label: string; value: string;}>>((acc, { options }) => {
        options.forEach((option) => (acc[option.value] = option));
        return acc;
    }, {})
);

const model = computed({
    get: () => packOptions.value[props.modelValue],
    set: (value) => {
        emits('update:modelValue', value.value);
    },
});
</script>

<template>
    <Listbox as="div" v-slot="{ open }" v-model="model" :disabled="disabled">
        <ListboxLabel v-if="label && id" :for="id" class="block text-sm font-medium text-gray-700">
            {{ label }}
        </ListboxLabel>

        <div class="relative mt-1">
            <ListboxButton
                class="flex items-center justify-between w-full px-3 pt-2 pb-2 text-base text-left text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm cursor-auto focus:z-10 focus:border-primary-300 focus:ring focus:ring-primary-100 disabled:opacity-70"
            >
                <span :class="['flex items-center truncate', model ? 'uppercase' : '']">{{ model ? model.value : placeholder }}</span>

                <span class="flex items-center pointer-events-none">
                    <ChevronDownIcon
                        class="w-4 h-4 text-gray-500"
                        :aria-hidden="open ? 'true' : 'false'"
                    />
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
                    class="absolute w-full mt-1 overflow-auto text-base bg-white rounded-lg shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                    <li v-for="group in options" :key="group.label">
                        <div v-if="group.label" class="px-4 py-1 bg-gray-100">
                            <span class="font-semibold text-gray-700">{{ group.label }}</span>
                        </div>

                        <ul>
                            <ListboxOption
                                as="template"
                                v-for="option in group.options"
                                :key="option.value"
                                :value="option"
                                v-slot="{ active, selected }"
                            >
                                <li :class="[active ? 'bg-gray-200 bg-opacity-20' : 'text-gray-900', 'relative cursor-default select-none py-2 px-4']">
                                    <div class="flex items-center gap-1">
                                        <span class="font-semibold uppercase">{{ option.value }}:</span>
                                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ option.label }}</span>
                                    </div>

                                    
                                    <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600">
                                        <CheckIcon class="w-5 h-5" aria-hidden="true" />
                                    </span>
                                </li>
                            </ListboxOption>
                        </ul>
                    </li>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>
