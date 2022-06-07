<template>
  <div class="relative flex items-start">
    <div class="flex h-5 items-center">
      <input
        :id="id"
        :name="name"
        type="checkbox"
        class="focus:ring-primary-300 focus:border-primary-300 text-primary-600 h-4 w-4 rounded border-gray-300 focus:ring focus:ring-offset-0"
        :checked="modelValue"
        @input="$emit('update:modelValue', $event.target.checked)"
      />
    </div>
    <div class="ml-3 text-sm">
      <label :for="id" class="font-medium text-gray-900">
        <slot />
      </label>
      <p :class="['text-gray-500', inlineDescription ? 'inline' : '']">
        <slot name="description" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: false,
      default: undefined,
    },
    inlineDescription: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: false,
      default: undefined,
    },
    modelValue: {
      default: false,
    },
  },
};
</script>
