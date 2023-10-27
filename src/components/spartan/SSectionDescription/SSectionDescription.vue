<script setup lang="ts">
withDefaults(
    defineProps<{
        as: string;
    }>(),
    {
        as: 'p',
    },
);
</script>

<template>
    <component :is="as" class="text-base font-normal text-gray-500">
        <slot />
    </component>
</template>
