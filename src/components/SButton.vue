<template>
  <component
    :is="as"
    type="button"
    :class="styles"
    class="
      items-center
      px-6
      py-3
      border border-transparent
      text-base
      font-semibold
      rounded-xl
      shadow-sm
      focus:outline-none
      focus:ring-2 focus:ring-offset-2
      transition
    "
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    color: {
      default: "default",
      type: String,
    },
    as: {
      default: "button",
    },
  },
  data() {
    return {
      colorClass: {
        primary: "text-white bg-gray-900 hover:bg-gray-800 focus:ring-gray-800",
        danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
        default:
          "text-gray-900 bg-gray-200 hover:bg-gray-300 focus:ring-gray-800",
        white:
          "border-gray-300 text-gray-900 bg-white hover:bg-gray-300 focus:ring-gray-800",
      },
    };
  },
  computed: {
    styles() {
      return this.colorClass[this.color];
    },
  },
};
</script>
