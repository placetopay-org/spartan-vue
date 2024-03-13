<script setup lang="ts">
import { hasSlotContent } from '@/helpers';
import { SPlacetopayLogo } from '../SPlacetopayLogo';
import { createContext } from './api';
import { twMerge } from 'tailwind-merge';
import type { TSidebarProps, TSidebarEmits } from './types';

const emit = defineEmits<TSidebarEmits>();

const props = withDefaults(defineProps<TSidebarProps>(), {
    placetopayHeader: false,
});

createContext(props, emit);
</script>

<template>
    <aside :class="twMerge('flex h-full w-72 flex-col gap-y-6 overflow-y-auto bg-white p-4', props.class)">
        <header v-if="placetopayHeader || hasSlotContent($slots.header)">
            <SPlacetopayLogo v-if="placetopayHeader" :height="32" />
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

