<template>
  <component :is="as" type="button" :class="classes" :disabled="disabled">
    <component :is="leftIcon || icon" class="h-5 w-5" aria-hidden="true" />
    <span class="empty:hidden"><slot /></span>
    <component :is="rightIcon" class="h-5 w-5" aria-hidden="true" />
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
    disabled: {
      type: Boolean,
      default: false,
    },
    flatLeft: {
      type: Boolean,
      default: false,
    },
    flatRight: {
      type: Boolean,
      default: false,
    },
    roundedFull: {
      type: Boolean,
      default: false,
    },
    leftIcon: {
      type: [Object, String, Function],
      default: undefined,
    },
    rightIcon: {
      type: [Object, String, Function],
      default: undefined,
    },
    icon: {
      type: [Object, String, Function],
      default: undefined,
    },
  },
  data() {
    return {
      colorClass: {
        primary:
          "text-white border-transparent bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 focus:border-primary-300",
        danger:
          "text-white border-transparent bg-red-600 hover:bg-red-700 focus:ring-red-300 focus:border-red-300",
        default:
          "text-gray-900 border-transparent bg-gray-200 hover:bg-gray-300 focus:ring-primary-300 focus:border-primary-300",
        white:
          "border-gray-300 text-gray-900 bg-white hover:bg-gray-100 focus:ring-primary-300 focus:border-primary-300",
      },
    };
  },
  computed: {
    classes() {
      return [
        this.colorClass[this.color],
        this.disabled ? "opacity-50" : "",
        this.flatLeft ? "rounded-l-none" : "",
        this.flatRight ? "rounded-r-none" : "",
        this.roundedFull
          ? "rounded-full px-2.5 py-2.5"
          : "rounded-xl py-2.5 px-6",
        "inline-flex items-center justify-center space-x-2 border text-sm font-medium shadow-sm transition focus:outline-none focus:ring",
      ];
    },
  },
};
</script>
