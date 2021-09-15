<template>
  <button
    type="button"
    :class="styles"
    class="items-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition"
  >
    <slot/>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    default: 'primary',
    type: String,
  },
})

const styles = computed(() => {
  return props.color === 'primary'
    ? 'text-white bg-gray-900 hover:bg-gray-800'
    : 'text-gray-800 bg-gray-200 hover:bg-gray-300'
})
</script>
