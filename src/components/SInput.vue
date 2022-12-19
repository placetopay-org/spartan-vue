<template>
  <div>
    <label v-if="label" :for="id" class="mb-1 block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="flex rounded-lg shadow-sm">
      <slot name="left"></slot>
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
          $slots.right ? 'rounded-r-0 -mr-px' : 'rounded-r-lg',
          $slots.left ? 'rounded-l-0 -ml-px' : 'rounded-l-lg',
          invalid
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-100'
            : '',
          disabled ? 'opacity-50' : '',
          'block w-full border-gray-300 text-base text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-300 focus:ring focus:ring-primary-100',
        ]"
        :rows="rows"
        autocomplete="off"
      />
      <slot name="right"></slot>
    </div>
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
  invalid: {
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
