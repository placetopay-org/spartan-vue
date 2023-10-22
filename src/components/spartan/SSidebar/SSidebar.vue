<script setup lang="ts">
import { hasSlotContent } from '@/helpers';
import { SPlacetopayLogo } from '../SPlacetopayLogo';
import { createContext } from './api';
import type { TSidebarProps, TSidebarEmits } from './types';
import { twMerge } from 'tailwind-merge';

const emit = defineEmits<TSidebarEmits>();

const props = withDefaults(defineProps<TSidebarProps>(), {
    placetopayHeader: false,
});

createContext(props, emit);
</script>

<template>
    <aside :class="twMerge('flex h-full w-fit flex-col gap-y-5 bg-white px-6', props.class)">
        <header v-if="placetopayHeader || hasSlotContent($slots.header)">
            <SPlacetopayLogo v-if="placetopayHeader" class="mt-8" />
            <slot v-else name="header" />
        </header>

        <nav v-if="hasSlotContent($slots.default)">
            <ul class="space-y-1">
                <slot />
            </ul>
        </nav>

        <footer v-if="hasSlotContent($slots.footer)"><slot name="footer" /></footer>
    </aside>
</template>
