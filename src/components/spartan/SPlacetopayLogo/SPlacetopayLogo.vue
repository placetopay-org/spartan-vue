<script setup lang="ts">
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';
import placetopayLogo from './assets/placetopay_logo.svg';
import placetopayLogoDark from './assets/placetopay_logo_dark.svg';
import placetopayLogoBw from './assets/placetopay_logo_bw.svg';
import type { TPlacetopayLogoProps } from './types';

const props = withDefaults(defineProps<Partial<TPlacetopayLogoProps>>(), {
    width: undefined,
    height: undefined,
    mode: 'base',
    class: '',
});

const assets = {
    base: placetopayLogo,
    dark: placetopayLogoDark,
    blackAndWhite: placetopayLogoBw,
};

const computedWidth = computed(() => {
    if (props.width) return props.width;

    if (props.size === 'md') return 202;
    return undefined;
});
</script>

<template>
    <component
        :is="assets[mode]"
        :width="computedWidth"
        :height="props.height"
        :class="twMerge('aspect-[202/45]', props.class)"
    />
</template>
