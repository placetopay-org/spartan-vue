<script setup lang="ts">
defineProps<{
  id?: string;
  srOnly?: boolean;
}>();
</script>

<template>
  <label :for="id" :class="['block text-sm font-medium text-gray-700 mb-1', srOnly && 'sr-only']">
    <slot />
  </label>
</template>
