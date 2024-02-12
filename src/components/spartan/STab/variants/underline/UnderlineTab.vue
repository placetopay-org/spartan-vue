<script setup lang="ts">
defineProps<{ full?: boolean }>();
</script>

<template>
    <nav class="border-b border-gray-200" aria-label="Tabs">
        <ul :class="['-mb-px flex', { 'space-x-8': !full }]">
            <slot />
        </ul>
    </nav>
</template>
