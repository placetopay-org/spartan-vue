<template>
  <span :class="classes">
    <slot />
  </span>
</template>

<script>
const colorOptions = {
  gray: "bg-gray-100 text-gray-800",
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  yellow: "bg-yellow-100 text-yellow-800",
};

const sizeOptions = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3 py-0.5 text-sm",
  lg: "px-3 py-1.5 text-sm",
};

export default {
  props: {
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
        "inline-flex items-center px-2.5 py-0.5 rounded-full font-medium",
        colorOptions[this.color],
        sizeOptions[this.size],
      ];
    },
  },
};
</script>
