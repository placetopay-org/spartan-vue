<template>
  <SCard>
    <div class="text-center">
      <div
        :class="[
          'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-gray-800',
        ]"
      >
        <component :is="iconToUse" class="h-6 w-6" aria-hidden="true" />
      </div>

      <h3 class="mt-4 text-lg font-semibold text-gray-900">
        <slot name="title" />
      </h3>

      <p class="mt-2 text-base text-gray-500">
        <slot name="description" />
      </p>

      <div class="mt-6 empty:hidden">
        <slot name="actions" />
      </div>
    </div>
  </SCard>
</template>

<script>
import { SCard } from "./../index";

import { ViewGridAddIcon } from "@heroicons/vue/outline";

export default {
  components: {
    SCard,
    ViewGridAddIcon,
  },
  props: {
    icon: {
      type: [Object, String, Function],
      default: undefined,
    },
  },
  computed: {
    iconToUse() {
      return this.icon || ViewGridAddIcon;
    },
  },
};
</script>
