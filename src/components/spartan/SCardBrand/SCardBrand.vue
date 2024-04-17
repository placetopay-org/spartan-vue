<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import * as assets from './assets';
import type { TCardBrandProps } from './types';

defineProps<TCardBrandProps>();
</script>

<template>
    <component :is="assets[name]" :class="twMerge($props.class)" :height="size" :width="size" role="img" />
</template>
