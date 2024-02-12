<script setup lang="ts">
defineProps<{ full?: boolean }>();
</script>

<template>
    <nav aria-label="Tabs">
        <ul :class="['flex space-x-2 rounded-xl border border-gray-300 bg-gray-100 p-2', { 'w-fit': !full }]">
            <slot />
        </ul>
    </nav>
</template>
