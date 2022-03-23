<template>
  <DisclosureButton
    :class="[
      active
        ? 'border-gray-900 font-medium text-gray-900'
        : 'font-regular border-gray-500 text-gray-500 hover:border-gray-900 hover:text-gray-900',
      ' group ml-4 flex w-full cursor-pointer items-center border-l py-2 px-2.5 text-sm',
    ]"
  >
    <slot />
  </DisclosureButton>
</template>

<script>
import { DisclosureButton } from "@headlessui/vue";

export default {
  components: { DisclosureButton },
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
};
</script>
