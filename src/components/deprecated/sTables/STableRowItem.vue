<template>
  <td
    :class="[
      primary ? 'font-medium text-gray-900' : 'text-gray-500',
      'p-3.5 text-sm first:pl-5',
    ]"
    :colspan="colspan"
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
    colspan: {
      type: Number,
      required: false,
    }
  },
};
</script>
