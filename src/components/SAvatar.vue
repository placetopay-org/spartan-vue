<template>
  <img
    class="h-8 w-8 rounded-full"
    :src="src"
  />
</template>

<script>

export default {
  props:{
    name: {
      type: String,
      required: false,
      default: 'John Doe',
    }
  },
  computed: {
    src () {
      return `https://ui-avatars.com/api/?name=${this.name}`
    }
  }
}
</script>

<style scoped>

</style>
