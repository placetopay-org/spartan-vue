<script setup lang="ts">
withDefaults(
    defineProps<{
        as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    }>(),
    {
        as: 'h3',
    },
);
</script>

<template>
    <component :is="as" class="text-lg font-semibold text-gray-900">
        <slot />
    </component>
</template>
