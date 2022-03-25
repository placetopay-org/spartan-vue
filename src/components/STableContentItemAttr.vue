<template>
  <td :key="key" class="px-4 py-3.5 text-base text-gray-500">
    <slot/>
  </td>
</template>

<script>
export default {
  props: {
    key: {
      type: String,
    },
  },
};
</script>