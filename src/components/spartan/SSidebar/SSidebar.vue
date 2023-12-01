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
    <aside :class="twMerge('flex h-full w-72 flex-col gap-y-5 overflow-y-auto bg-white px-4', props.class)">
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

<style scoped>
/* width */
::-webkit-scrollbar {
    width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 16px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
    border-radius: 0px;
}
</style>
