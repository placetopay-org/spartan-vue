<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { computed } from 'vue';

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
  <div class="relative">
    <label :for="id" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <Listbox v-model="model" :disabled="disabled">
        <ListboxButton
            v-slot="{ value }"
            type="button"
            class="block w-full px-3 pt-2 pb-2 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-300"
        >
            {{ value }}
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
                class="absolute left-0 z-40 w-full py-1 overflow-auto text-base bg-white rounded-md shadow-lg top-full max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
                <li v-for="groupOption in options" :key="groupOption.label">
                    <div class="pl-4 bg-gray-100">
                        <span class="font-semibold text-gray-700">{{ groupOption.label }}</span>
                    </div>

                    <ListboxOption
                        v-for="option in groupOption.options"
                        v-slot="{ active, selected }"
                        :key="`${option.label}__${option.value}`"
                        :value="option"
                        as="ul"
                    >
                        <li
                            :class="[
                                active ? 'bg-primary bg-opacity-20' : 'text-gray-900',
                                'relative cursor-default select-none py-1 pl-10 pr-4',
                            ]"
                        >
                            <div class="flex gap-2" :class="selected ? 'font-medium' : 'font-normal'">
                                <span class="block truncate">{{ option.label }}</span>
                            </div>
                            <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary"
                            >
                                <CheckIcon class="w-5 h-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </li>
            </ListboxOptions>
        </transition>
    </Listbox>
  </div>
</template>
