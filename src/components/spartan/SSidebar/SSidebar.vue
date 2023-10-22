<script setup lang="ts">
import { SPlacetopayLogo } from '../SPlacetopayLogo';
import { createContext } from './api';
import type { TSidebarProps } from './types';

withDefaults(defineProps<Partial<TSidebarProps>>(), {
    placetopayHeader: false,
});

createContext();
</script>

<template>
    <aside class="flex w-fit flex-col gap-y-5 bg-white px-6">
        <header>
            <SPlacetopayLogo v-if="placetopayHeader" class="mt-8" />
            <slot v-else name="header" />
        </header>

        <nav>
            <ul class="space-y-1">
                <slot />
            </ul>
        </nav>

        <footer><slot name="footer" /></footer>
    </aside>
</template>
