<script setup lang="ts">
import { computed } from 'vue';

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const props = defineProps<{
  label?: string,
  name?: string,
  id?: string,
  placeholder?: string,
  disabled?: boolean,
  modelValue: string | number,
  options: Array<{label: string, value: string | number}>,
}>();

const model = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
})
</script>

<template>
  <div>
    <label v-if="label && id" :for="id" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <select
      v-model="model"
      :name="name"
      :id="id"
      :disabled="disabled"
      class="block w-full px-3 pt-2 pb-2 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm focus:z-10 focus:border-primary-300 focus:ring focus:ring-primary-100"
    >
      <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
