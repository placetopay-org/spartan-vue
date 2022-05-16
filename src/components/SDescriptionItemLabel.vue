<template>
  <component :is="as" class="text-sm font-medium text-gray-500">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      default: "dt",
    },
  },
};
</script>
