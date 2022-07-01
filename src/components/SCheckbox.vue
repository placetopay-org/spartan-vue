<template>
  <div class="relative flex items-start">
    <div class="flex h-5 items-center">
      <input
        :id="id"
        :name="name"
        type="checkbox"
        :class="inputCLasses"
        :checked="modelValue"
        @input="$emit('update:modelValue', $event.target.checked)"
      />
    </div>
    <div class="ml-3 text-sm">
      <label :for="id" :class="labelClasses">
        <slot />
      </label>
      <p :class="descriptionClasses">
        <slot name="description" />
      </p>
    </div>
  </div>
</template>

<script>
const colorOptions = {
  primary: {
    label: "text-gray-900",
    description: "text-gray-500",
    input: "focus:ring-primary-100 focus:border-primary-300 text-primary-600",
  },
  red: {
    label: "text-red-600",
    description: "text-red-500",
    input: "focus:ring-red-100 focus:border-red-300 text-red-600",
  },
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
      default: "primary",
    },
  },
  computed: {
    inputCLasses() {
      return [
        colorOptions[this.color].input,
        "h-4 w-4 rounded border-gray-300 focus:ring focus:ring-offset-0",
      ];
    },
    labelClasses() {
      return [colorOptions[this.color].label, "font-medium"];
    },
    descriptionClasses() {
      return [
        colorOptions[this.color].description,
        this.inlineDescription ? "inline" : "",
      ];
    },
  },
};
</script>
