<script setup lang="ts">
import { computed } from "vue";
import { SCard } from "./sCards";
import { SquaresPlusIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  icon?: Object | string | Function;
}>();

const iconToUse = computed(() => props.icon || SquaresPlusIcon);
</script>

<template>
  <SCard>
    <div class="text-center">
      <div
        :class="[
          'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600',
        ]"
      >
        <component :is="iconToUse" class="w-6 h-6" aria-hidden="true" />
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
