<template>
  <button
    type="button"
    :class="classes"
    class="relative -ml-px inline-flex items-center space-x-2 rounded-r-xl border border-transparent bg-gray-900 px-4 py-3 text-sm font-medium text-white transition focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800"
  >
    <component :is="icon" class="h-5 w-5" aria-hidden="true" />
    <span class="empty:hidden"><slot /></span>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: "primary",
    },
    icon: {
      type: [Object, String, Function],
      default: undefined,
    },
  },
  computed: {
    classes() {
      let options = {
        primary: "text-white bg-gray-900 hover:bg-gray-800",
        white: "border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100",
      };

      return options[this.color];
    },
    hasSlot() {
      return !!this.$slots.default;
    },
  },
};
</script>
