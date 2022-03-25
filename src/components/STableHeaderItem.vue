<template>
  <th :key="key" scope="col" class="px-4 py-3.5 text-left text-base font-semibold text-gray-900">
    <slot/>
  </th>
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