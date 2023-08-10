<script setup lang="ts">
import { MenuItem } from '@headlessui/vue';
import type { FunctionalComponent } from 'vue';
withDefaults(
  defineProps<
    Partial<{
      icon: FunctionalComponent;
      static: boolean;
    }>
  >(),
  {
    icon: undefined,
    static: false,
  }
);
</script>

<template>
  <MenuItem v-slot="{ active }" :disabled="static">
    <button
      type="button"
      v-bind="$attrs"
      :class="[active && 'bg-gray-50', static && 'cursor-default select-text']"
      class="group flex w-full items-center px-3 py-3 gap-3 text-sm text-gray-700"
    >
      <component :is="icon" class="h-5 w-5 text-gray-400" aria-hidden="true" />
      <div class="flex flex-col items-start">
        <span class="text-gray-800 text-sm font-medium"><slot /></span>
        <span class="text-gray-400 text-xs font-normal"><slot name="description"/></span>
      </div>
    </button>
  </MenuItem>
</template>
