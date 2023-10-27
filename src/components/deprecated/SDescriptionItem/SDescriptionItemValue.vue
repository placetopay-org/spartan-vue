<script setup lang="ts">
withDefaults(
    defineProps<{
        as: string;
    }>(),
    {
        as: 'dd',
    },
);
</script>

<template>
    <component :is="as" class="text-sm text-gray-900">
        <slot />
    </component>
</template>
