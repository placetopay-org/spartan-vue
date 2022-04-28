<template>
  <component
    :is="as"
    type="button"
    :class="classes"
    :disabled="disabled"
    class="inline-flex items-center justify-center space-x-2 border border-transparent text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2"
  >
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
    type: {
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "base",
    }
  },
  data() {
    return {
      colorClass: {
        primary: "text-white bg-gray-900 hover:bg-gray-800 focus:ring-gray-800",
        danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
        default:
          "text-gray-900 bg-gray-200 hover:bg-gray-300 focus:ring-gray-800",
        white:
          "border-gray-300 text-gray-900 bg-white hover:bg-gray-100 focus:ring-gray-800",
      },
      style: {
        default: [
         'px-6 py-3',
          this.flatLeft ? "rounded-l-none" : "rounded-l-xl",
          this.flatRight ? "rounded-r-none" : "rounded-r-xl",
        ],
        circle: "rounded-full",
      },
      sizes: {
        xs: "p-1",
        sm: "p-1.5",
        base: "p-2",
        l: "p-2.5",
        xl: "p-3",
      }
    };
  },
  computed: {
    classes() {
      return [
        this.colorClass[this.color],
        this.style[this.type],
        this.disabled ? "opacity-60" : "",
        this.type === 'circle' ? this.sizes[this.size] :"",
      ];
    },
  },
};
</script>
