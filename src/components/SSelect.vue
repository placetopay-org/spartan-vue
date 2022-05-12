<template>
  <label :for="id" class="mb-1 block text-sm font-medium text-gray-700">
    {{ label }}
  </label>
  <select
    :name="name"
    :id="id"
    :disabled="disabled"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    :class="[
      'block w-full rounded-xl border border-gray-300 px-3 pb-2 pt-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-gray-800 focus:ring-1 focus:ring-gray-800',
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
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: undefined,
  },
  type: {
    type: String,
    required: false,
    default: "text",
  },
  name: {
    type: String,
    required: false,
    default: undefined,
  },
  id: {
    type: String,
    required: false,
    default: undefined,
  },
  placeholder: {
    type: String,
    required: false,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  rows: {
    type: Number,
    required: false,
    default: undefined,
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
  options: {
    type: Array,
    required: false,
    default: () => [],
  },
});
</script>
