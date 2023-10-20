<script setup lang="ts">
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';
import type { TPlacetopayLogoProps } from './types';

const props = withDefaults(defineProps<Partial<TPlacetopayLogoProps>>(), {
    width: undefined,
    height: undefined,
    size: 'md',
    mode: 'base',
    class: '',
});

const asset = computed(() => {
    const urls = {
        base: 'placetopay_logo.svg',
        dark: 'placetopay_logo_dark.svg',
        blackAndWhite: 'placetopay_logo_bw.svg',
    };
    return `/src/assets/${urls[props.mode]}`;
});

const sizeStyle = computed(() => {
    if (props.size === 'md') return 'h-8 w-auto';
    return '';
});
</script>

<template>
    <img :width="width" :height="height" :class="twMerge(sizeStyle, props.class)" :src="asset" alt="Placetopay logo" />
</template>
