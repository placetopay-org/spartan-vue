<script setup lang="ts">
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';
import type { TPlacetopayLogoProps } from './types';

const props = withDefaults(defineProps<Partial<TPlacetopayLogoProps>>(), {
    width: undefined,
    height: undefined,
    size: 'md',
    localAsset: false,
    class: '',
});

const asset = computed(() => {
    const LOCAL_ASSET = '/src/assets/placetopay_logo.svg';
    const WEB_ASSET = 'https://static.placetopay.com/placetopay-logo.svg';
    return props.localAsset ? LOCAL_ASSET : WEB_ASSET;
});

const sizeStyle = computed(() => {
    if (props.size === 'md') return 'h-8 w-auto';
    return '';
});
</script>

<template>
    <img :width="width" :height="height" :class="twMerge(sizeStyle, props.class)" :src="asset" alt="Placetopay logo" />
</template>
