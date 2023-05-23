<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>

<script>
const colorOptions = {
  gray: "bg-gray-100 text-gray-800",
  orange: "bg-primary-100 text-primary-800",
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  yellow: "bg-yellow-100 text-yellow-800",
  blue: "bg-blue-100 text-blue-800",
  white: "bg-white text-gray-900",
  transparent: "bg-transparent text-gray-400",
};

const sizeOptions = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3 py-0.5 text-sm",
  lg: "px-3 py-1.5 text-sm",
};

export default {
  props: {
    as: {
      type: [Object, String],
      default: 'span'
    },
    size: {
      type: String,
      default: "sm",
    },
    color: {
      type: String,
      default: "gray",
    },
  },
  computed: {
    classes() {
      return [
        "inline-flex items-center rounded-full font-medium",
        colorOptions[this.color],
        sizeOptions[this.size],
      ];
    },
  },
};
</script>
