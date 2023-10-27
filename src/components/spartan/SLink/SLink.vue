<script setup lang="ts">
defineProps<{
    href: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
}>();
</script>

<template>
    <a
        :href="href"
        :target="target"
        v-bind="$attrs"
        class="cursor-pointer font-medium hover:text-gray-700 hover:underline"
    >
        <slot />
    </a>
</template>
