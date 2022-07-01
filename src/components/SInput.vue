<template>
  <div>
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
        'block w-full rounded-lg border-gray-300 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-300',
      ]"
      :rows="rows"
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
