<template>
  <div class="flex flex-col justify-between items-start my-2 ">
    <a
        :href="href"
        class="flex font-medium font-semibold items-center text-gray-900 text-2xl gap-x-4"
    >
      <ArrowLeftIcon
          v-if="hasIcon"
          class="h-6 w-6 text-gray-500"
          aria-hidden="true"
      />
      <slot></slot>
    </a>
  </div>
</template>

<script>
import { ArrowLeftIcon } from "@heroicons/vue/solid";

export default {
  components: {
    ArrowLeftIcon,
  },
  props: {
    href: {
      type: String,
      required: false,
      default: "#",
    },
    hasIcon: {
      type: Boolean,
      default: true,
    },
  },
};
</script>