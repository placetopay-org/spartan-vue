<script setup lang="ts">
import { computed } from 'vue';
import type { ComponentSizes } from '../constants/common';

const props = withDefaults(defineProps<{
  name: string;
  size: ComponentSizes;
}>(), {
  size: 'sm',
});

const src = computed<string>(() => `https://ui-avatars.com/api/?name=${props.name}`);

const sizeClass = computed<string>(() => {
  return {
    xs: 'h-4 w-4',
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20',
    '2xl': 'h-24 w-24',
    '3xl': 'h-32 w-32',
  }[props.size];
});
</script>

<template>
  <img class="rounded-full" :src="src" :class="sizeClass" />
</template>
