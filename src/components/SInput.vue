<template>
  <label :for="id" class="mb-1 block text-sm font-medium text-gray-700">
    {{ label }}
  </label>
  <component
    :is="as"
    :type="type"
    :name="name"
    :id="id"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="[
      disabled ? 'opacity-50' : '',
      'block w-full rounded-xl border-gray-300 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-gray-800 focus:ring-1 focus:ring-gray-800',
    ]"
    :rows="rows"
    autocomplete="off"
  />
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
  as: {
    type: String,
    required: false,
    default: "input",
  },
  modelValue: String,
});
</script>
