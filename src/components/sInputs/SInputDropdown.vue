<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/vue";
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import SInput from "./SInput.vue";

const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<{
  type?: string;
  rows: Array<{label: string, value: string | number}>;
  modelValue: {value: string | number, option: {label: string, value: string | number}} | null;
}>(), {
  type: "text",
});

const inputValue = ref<string|number>(props.modelValue?.value ?? '');
const optionSelected = ref<{label: string; value: string | number}>(props.rows[0]);

const inputProps = computed(() => {
  const { modelValue, rows, ...rest } = props;
  return rest;
});

watchEffect(() => {
  emit("update:modelValue", {value: inputValue, option: optionSelected});
});
</script>

<template>
  <SInput v-model="inputValue" v-bind="inputProps" class="relative">
    <template #right>
      <Listbox v-model="optionSelected">
        <div class="relative inset-y-0">
          <ListboxButton class="h-full flex items-center justify-center gap-1 border border-gray-300 px-2 rounded-r-lg max-w-[104px]">
            <span class="block truncate">{{ optionSelected.label }}</span>
            <ChevronDownIcon class="w-5 h-5 text-gray-800" />
          </ListboxButton>

          <ListboxOptions
            class="absolute z-10 mt-1 overflow-auto text-base bg-white rounded-md sha dow-lg max-h-60 min-w-max ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="option in rows"
              :key="`input-option-${option.label.replace(' ', '-')}`"
              :value="option"
              :disabled="option.value === optionSelected.value"
              class="p-3 text-sm font-medium text-gray-900 cursor-pointer hover:bg-primary-500 hover:text-white"
            >
              {{option.label}}
            </ListboxOption>
          </ListboxOptions>
        </div>
      </Listbox>
    </template>
  </SInput>
</template>
