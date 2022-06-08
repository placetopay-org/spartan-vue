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
