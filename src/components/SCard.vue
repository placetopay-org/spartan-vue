<template>
  <div class="overflow-hidden rounded-xl bg-white shadow">
    <div class="p-6">
      <div v-if="hasHeaderSlot" class="flex flex-start gap-6 border-b border-gray-300 pb-4">
        <slot name="header" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import { hasSlotContent } from "../utils/hasSlotContent";
export default {
  name: 'SCard',
  computed: {
    hasHeaderSlot() {
      return hasSlotContent(this.$slots.header);
    },
  }
};
</script>
