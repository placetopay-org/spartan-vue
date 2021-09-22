<template>
  <div class="flex items-center flex-shrink-0 px-4 md:px-5">
    <img class="h-9 w-auto" :src="src" :alt="alt"/>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false,
      default: 'https://static.placetopay.com/placetopay-logo.svg',
    },
    alt: {
      type: String,
      required: false,
      default: 'Placetopay Logo'
    }
  }
}
</script>
