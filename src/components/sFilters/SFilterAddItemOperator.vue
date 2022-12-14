<script setup>
import { computed } from 'vue';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
})

const options = [
    {label: 'Igual a', value: 'eq'},
    {label: 'No es igual a', value: 'notEq'},
    {label: 'Contiene', value: 'contain'},
    {label: 'No contiene', value: 'notContain'},
    {label: 'Comienza con', value: 'startWith'},
    {label: 'Termina con', value: 'endWith'},
];

const operator = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});
const optionSelected = computed(() => options.find(option => option.value === props.modelValue) ?? options[0]);
</script>

<template>
    <Listbox v-model="operator">
        <div class="relative mt-1">
            <ListboxButton class="flex justify-center items-center gap-1 py-1 px-2 bg-gray-100 rounded-md">
                <span class="block truncate">{{ optionSelected.label }}</span>
                <ChevronDownIcon class="w-5 h-5 text-gray-800" />
            </ListboxButton>

            <ListboxOptions
                class="absolute mt-1 max-h-60 min-w-max overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
                <ListboxOption
                    v-for="option in options"
                    :key="`operator-option-${option.label.replace(' ', '-')}`"
                    :value="option.value"
                    :disabled="option.value === modelValue"
                    class="p-3 cursor-pointer text-sm font-medium text-gray-900 hover:bg-primary-500 hover:text-white"
                >
                    {{option.label}}
                </ListboxOption>
            </ListboxOptions>
        </div>
    </Listbox>
</template>