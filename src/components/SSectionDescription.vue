<template>
  <component :is="as" class="text-base font-normal text-gray-500">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      default: "p",
    },
  },
};
</script>
