<script setup lang="ts">
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';
import placetopayLogo from '/src/assets/placetopay_logo.svg';
import placetopayLogoDark from '/src/assets/placetopay_logo_dark.svg';
import placetopayLogoBw from '/src/assets/placetopay_logo_bw.svg';
import type { TPlacetopayLogoProps } from './types';

const props = withDefaults(defineProps<Partial<TPlacetopayLogoProps>>(), {
    width: undefined,
    height: undefined,
    size: 'md',
    mode: 'base',
    class: '',
});

const asset = computed(() => {
    const assets = {
        base: placetopayLogo,
        dark: placetopayLogoDark,
        blackAndWhite: placetopayLogoBw,
    };
    return assets[props.mode];
});

const sizeStyle = computed(() => {
    if (props.size === 'md') return 'h-8 w-auto';
    return '';
});
</script>

<template>
    <img :width="width" :height="height" :class="twMerge(sizeStyle, props.class)" :src="asset" alt="Placetopay logo" />
</template>
