<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import * as assets from './assets';
import type { TMethodIconProps } from './types';

defineProps<TMethodIconProps>();
</script>

<template>
    <div>
        <img :src="assets[name]" :class="twMerge($props.class)" :height="size" :width="size" />
    </div>
</template>
