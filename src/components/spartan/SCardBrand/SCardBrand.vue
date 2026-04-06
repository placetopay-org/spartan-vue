<script lang="ts">
/**
 * A component that renders payment brand logos (Visa, Mastercard, PSE, etc.) as SVG icons.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SCardBrand Github}.
 * @see {@link https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4713-17011 Figma}.
 */
export default {
    name: 'SCardBrand',
};
</script>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import * as assets from './assets';
import type { TCardBrandProps } from './types';

defineProps<TCardBrandProps>();
</script>

<template>
    <component :is="assets[name]" :class="twMerge($props.class)" :height="size" :width="size" role="img" />
</template>
