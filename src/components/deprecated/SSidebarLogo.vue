<template>
  <div class="flex flex-shrink-0 items-center px-6">
    <img class="h-8 w-auto" :src="src" :alt="alt" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false,
      default: "https://static.placetopay.com/placetopay-logo.svg",
    },
    alt: {
      type: String,
      required: false,
      default: "Placetopay Logo",
    },
  },
};
</script>
