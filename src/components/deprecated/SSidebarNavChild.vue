<template>
  <DisclosureButton
    :class="[
      active
        ? 'bg-primary-50 text-primary-600'
        : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600',
      'group flex w-full items-center rounded-md py-2 pr-1 pl-[42px] text-sm font-medium focus:outline-none focus:ring focus:ring-primary-100',
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
