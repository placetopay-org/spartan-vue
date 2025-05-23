<script setup lang="ts">
import type { Component } from 'vue';

defineOptions({
    inheritAttrs: false,
});

defineProps<{
    as?: string | boolean | null | Component | Object;
}>();
</script>

<template>
    <component :is="as" v-if="as" v-bind="$attrs">
        <slot />
    </component>

    <slot v-else v-bind="$attrs" />
</template>
