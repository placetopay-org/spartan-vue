<template>
  <button
    type="button"
    :class="styles"
    class="items-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      default: 'default',
      type: String,
    },
  },
  data() {
    return {
      colorClass: {
        'primary': 'text-white bg-gray-900 hover:bg-gray-800 focus:ring-gray-800',
        'danger': 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
        'default': 'text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-gray-800 ',
      }
    }
  },
  computed: {
    styles() {
      return this.colorClass[this.color]
    }
  }
}



</script>
