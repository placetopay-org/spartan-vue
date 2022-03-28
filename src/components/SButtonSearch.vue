<template>
  <component
      type="button"
      :class="classes"
      class="inline-flex flex-row gap-2 h-11 items-center rounded-r-xl border border-transparent pr-4 pl-3.5 py-2.5 text-base font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
  >
    <component
        :is="icon"
        class="h-4 w-4"
        aria-hidden="true"
    />
    <slot/>
  </component>
</template>

<script>
import {SButton, SInput, SDropdown} from "../index";

export default {
  components: { SButton, SInput, SDropdown},
  props: {
    color: {
      type: String,
      default: "primary",
    },
    icon: {
      type: [Object, String, Function],
      default: undefined,
    },
  },
  data() {
    return {
      colorClass: {
        primary: "text-white bg-gray-900 hover:bg-gray-800",
        white: "border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100",
      },
    };
  },
  computed: {
    classes() {
      return this.colorClass[this.color];
    },
  },
}
</script>