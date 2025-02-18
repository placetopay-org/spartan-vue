<script setup lang="ts">
import type { Component } from 'vue';

defineOptions({
    inheritAttrs: false,
})

defineProps<{
    as?: string | boolean | null | Component;
}>();
</script>

<template>
    <component v-if="as" :is="as" v-bind="$attrs">
        <slot />
    </component>

    <slot v-else v-bind="$attrs" />
</template>
