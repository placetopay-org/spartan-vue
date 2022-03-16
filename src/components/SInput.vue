<template>
  <div
    class="relative border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm focus-within:ring-1 focus-within:ring-gray-800 focus-within:border-gray-800"
  >
    <label
      :for="id"
      class="absolute -top-2 left-3 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-500"
    >
      {{ label }}
    </label>
    <input
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0"
      autocomplete="off"
    />
  </div>
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
  modelValue: String,
});
</script>
