<script setup lang="ts">
withDefaults(
    defineProps<{
        as: string;
    }>(),
    {
        as: 'dt',
    },
);
</script>

<template>
    <component :is="as" class="text-sm font-medium text-gray-500">
        <slot />
    </component>
</template>
