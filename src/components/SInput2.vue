<template>
  <div class="flex">
    <slot name="left"></slot>
    <label :for="id" class="sr-only">
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
      :class="[
        $slots.right ? 'rounded-r-0' : 'rounded-r-xl',
        $slots.left ? 'rounded-l-0' : 'rounded-l-xl',
        'block w-full border border-gray-300 px-3 py-2.5 text-base text-gray-900 placeholder-gray-500 focus-within:z-10 focus:border-gray-800 focus:ring-gray-800',
      ]"
    />

    <slot name="right"></slot>
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
