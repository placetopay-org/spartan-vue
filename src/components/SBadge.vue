<template>
  <span :class="[colorClass, 'inline-flex items-center justify-center']">
    <slot/>
  </span>
</template>

<script>

export default {
  props: {
    size: {
      type: String,
      default: "sm",
    },
    color: {
      type: String,
      default: "gray",
    },
  },
  data() {
    return {
      style: {
        sm: 'px-2.5 py-0.5 rounded-full text-xs font-medium bg-' + this.color + '-100 text-' + this.color + '-800 ',
        md: 'px-3 py-0.5 rounded-xl text-sm font-medium bg-' + this.color + '-100 text-' + this.color + '-800 ',
        lg: 'px-2.5 py-2 w-9 rounded-xl text-sm font-semibold bg-' + this.color + '-200 text-' + this.color + '-500 ',
      },
    };
  },
  computed: {
    colorClass() {
      return this.style[this.size]
    }
  }
}
</script>