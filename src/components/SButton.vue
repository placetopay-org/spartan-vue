<template>
  <component :is="as" type="button" :class="classes" :disabled="disabled">
    <component
      :is="leftIcon || icon"
      :class="['h-5 w-5', hasDefaultSlot ? '-ml-1 mr-2' : '']"
      aria-hidden="true"
    />
    <span v-if="hasDefaultSlot"><slot /></span>
    <component :is="rightIcon" class="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
  </component>
</template>

<script>
import { hasSlotContent } from "../utils/hasSlotContent";

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
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      colorClass: {
        primary:
          "text-white border-transparent bg-primary-600 hover:bg-primary-700 focus:ring-primary-100 focus:border-primary-300",
        danger:
          "text-white border-transparent bg-red-600 hover:bg-red-700 focus:ring-red-100",
        default:
          "text-gray-900 border-transparent bg-gray-200 hover:bg-gray-300 focus:ring-primary-100 focus:border-primary-300",
        white:
          "border-gray-300 text-gray-900 bg-white hover:bg-gray-100 focus:ring-primary-100 focus:border-primary-300",
        transparent: "border-none shadow-none text-gray-800 bg-transparent hover:text-gray-900 focus:ring-0 focus:border-none focus:outline-none",
      },
    };
  },
  computed: {
    hasDefaultSlot() {
      return hasSlotContent(this.$slots.default);
    },
    classes() {
      return [
        this.isLoading ? 'is-loading' : "",
        this.colorClass[this.color],
        this.disabled ? "opacity-50" : "",
        this.flatLeft ? "rounded-l-none" : "",
        this.flatRight ? "rounded-r-none" : "",
        this.roundedFull
          ? "rounded-full px-2.5 py-2.5"
          : "rounded-lg py-2.5 px-6",
        "inline-flex items-center justify-center border text-sm font-medium shadow-sm transition focus:outline-none focus:ring",
      ];
    },
  },
};
</script>

<style>
.is-loading {
  color: transparent !important;
  pointer-events: none;
  position: relative;
}

.is-loading::after {
  animation: spinAround 500ms infinite linear;
  border: 2px solid #dbdbdb;
  border-radius: 290486px;
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
  display: block;
  height: 1em;
  width: 1em;
  position: absolute;
  left: calc(50% - (1em / 2));
  top: calc(50% - (1em / 2));
}

@keyframes spinAround {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
</style>
