<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const colorOptions = {
  gray: "bg-gray-100 text-gray-800",
  primary: "bg-primary-100 text-primary-800",
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  yellow: "bg-yellow-100 text-yellow-800",
  blue: "bg-blue-100 text-blue-800",
  white: "bg-white text-gray-900",
  transparent: "bg-transparent text-gray-400",
};

const sizeOptions = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3 py-0.5 text-sm",
  lg: "px-3 py-1.5 text-sm",
};

const props = withDefaults(defineProps<{
  as?: string | object;
  size?: keyof typeof sizeOptions;
  color?: keyof typeof colorOptions;
}>(), {
  as: 'span',
  size: 'md',
  color: 'gray',
});

const classes = computed(() => [
  "inline-flex items-center rounded-full font-medium",
  colorOptions[props.color],
  sizeOptions[props.size],
]);
</script>
