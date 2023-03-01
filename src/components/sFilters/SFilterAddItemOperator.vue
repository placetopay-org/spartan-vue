<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { InputTranslations } from './SFilterSelectorConstant';

const emit = defineEmits(['update:modelValue', 'changed']);
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
        required: true,
        validator(value) {
            return value.every(option => option.value && option.label);
        },
    },
})

const optionSelected = computed(() => props.options.find(option => option.value === props.modelValue) ?? props.options[0]);

const operator = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value);
        emit('changed');
    },
});
</script>

<template>
    <Listbox v-model="operator">
        <div class="relative mt-1">
            <ListboxButton class="flex items-center justify-center gap-1 px-2 py-1 bg-gray-100 rounded-md max-w-[104px]">
                <span class="block truncate">{{ optionSelected.label }}</span>
                <ChevronDownIcon class="w-5 h-5 text-gray-800" />
            </ListboxButton>

            <ListboxOptions
                class="absolute z-10 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 min-w-max ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
                <ListboxOption
                    v-for="option in options"
                    :key="`operator-option-${option.label.replace(' ', '-')}`"
                    :value="option.value"
                    :disabled="option.value === modelValue"
                    class="p-3 text-sm font-medium text-gray-900 cursor-pointer hover:bg-primary-500 hover:text-white"
                >
                    {{option.label}}
                </ListboxOption>
            </ListboxOptions>
        </div>
    </Listbox>
</template>