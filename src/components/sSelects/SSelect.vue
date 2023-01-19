<script setup lang="ts">
defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

defineProps<{
  label?: string,
  name?: string,
  id?: string,
  placeholder?: string,
  disabled?: boolean,
  rows?: number,
  modelValue: string | number,
  options: Array<{label: string, value: string | number}>,
}>();
</script>

<template>
  <div>
    <label :for="id" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <select
      :name="name"
      :id="id"
      :disabled="disabled"
      v-model="modelValue"
      :class="[
        'block w-full rounded-lg border border-gray-300 px-3 pb-2 pt-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-300',
      ]"
    >
      <option
        :value="option.value"
        :selected="modelValue === option.value"
        v-for="option in options"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
