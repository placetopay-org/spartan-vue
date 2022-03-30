<template>
  <td
    :class="[
      primary ? 'font-medium text-gray-900' : 'text-gray-500',
      'p-3.5 text-base first:pl-5',
    ]"
  >
    <slot />
  </td>
</template>

<script>
export default {
  props: {
    primary: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>
