<script setup lang="ts">
import type { TLabelProps } from './types';

const props = defineProps<TLabelProps>();
</script>

<template>
    <label :for="props.for" :class="['mb-1 block text-sm font-medium text-gray-700', srOnly && 'sr-only']">
        <slot />
    </label>
</template>
