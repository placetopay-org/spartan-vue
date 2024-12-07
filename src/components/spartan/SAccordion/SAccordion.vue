<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { TAccordionProps } from './types';
import { accordionStyles } from './styles';
import { usePassthrough } from '@/helpers';

const { open, vertical } = defineProps<TAccordionProps>();

const { pt, extractor } = usePassthrough();

const [bodyClass, bodyProps] = extractor(pt.value.body);
</script>

<template>
    <div :class="twMerge(accordionStyles({ vertical, open: Boolean(open) }), $props.class)">
        <div data-s-body v-bind="bodyProps" :class="twMerge('overflow-hidden', bodyClass)">
            <slot />
        </div>
    </div>
</template>
