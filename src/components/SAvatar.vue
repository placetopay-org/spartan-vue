<template>
  <img class="rounded-full" :src="src" :class="sizeClass" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'sm',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(value),
    },
  },
  computed: {
    src() {
      return `https://ui-avatars.com/api/?name=${this.name}`;
    },
    sizeClass() {
      return {
        xs: 'h-4 w-4',
        sm: 'h-8 w-8',
        md: 'h-12 w-12',
        lg: 'h-16 w-16',
        xl: 'h-20 w-20',
        '2xl': 'h-24 w-24',
        '3xl': 'h-32 w-32',
      }[this.size];
    }
  },
};
</script>

<style scoped></style>
