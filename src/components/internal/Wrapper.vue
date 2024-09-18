<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
})

defineProps<{
    as?: string | boolean | null;
}>();
</script>

<template>
    <component v-if="as" :is="as" v-bind="$attrs">
        <slot />
    </component>

    <slot v-else v-bind="$attrs" />
</template>
