<template>
  <tfoot class="flex flex-row py-4 items-center px-6 justify-between border border-gray-200 border-solid">
    <div class="float-left">
      <p class="text-sm font-normal text-gray-900 " v-text="info"></p>
    </div>
    <slot/>
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