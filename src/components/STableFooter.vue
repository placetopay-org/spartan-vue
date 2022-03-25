<template>
  <tfoot class="border border-gray-200 border-solid w-full">
  <div>
    <p class="py-4 px-6 text-sm font-normal text-gray-900 float-left" v-text="info"></p>
    <slot/>
  </div>
  </tfoot>
</template>

<script>
export default {
  props: {
    info: {
      type: String,
    },
  },
};
</script>