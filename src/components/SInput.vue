<template>
  <div
    class="border border-gray-300 rounded-xl px-3 py-2 shadow focus-within:ring-1 focus-within:ring-gray-900 focus-within:border-gray-900"
  >
    <label :for="id" class="block text-xs font-semibold text-gray-900">
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
      class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-base"
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
