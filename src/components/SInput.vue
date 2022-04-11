<template>
  <div
    class="rounded-xl border border-gray-300 px-3 py-2 shadow focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900"
  >
    <label :for="id" class="block text-xs font-semibold text-gray-900">
      {{ label }}
    </label>
    <component
      :is="component"
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[component === 'textarea' ? 'h-24 resize-none' : '' ,'block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-500 focus:ring-0']"
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
  component: {
    type: String,
    required: false,
    default: 'input',
  },
  modelValue: String,
});
</script>
