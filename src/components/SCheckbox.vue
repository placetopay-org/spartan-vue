<template>
  <div class="relative flex items-start">
    <div class="flex h-5 items-center">
      <input
        :id="id"
        :name="name"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-900"
        :checked="modelValue"
        @input="$emit('update:modelValue', $event.target.checked)"
      />
    </div>
    <div class="ml-3 text-sm">
      <label :for="id" :class="['font-medium', labelClass]">
        <slot />
      </label>
      <p :class="[descriptionClass, inlineDescription ? 'inline' : '']">
        <slot name="description" />
      </p>
    </div>
  </div>
</template>

<script>
const labelColor = {
  gray: "text-gray-900",
  red: "text-red-700",
};

const descriptionColor = {
  gray: "text-gray-500",
  red: "text-red-500",
};


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
    color: {
      type: String,
      default: 'gray'
    }
  },
  computed: {
    labelClass() {
      return labelColor[this.color]
    },
    descriptionClass() {
      return descriptionColor[this.color]
    },
  },
};
</script>
