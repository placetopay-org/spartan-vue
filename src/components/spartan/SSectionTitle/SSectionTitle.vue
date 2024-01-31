<script setup lang="ts">
import type { TSectionTitleProps } from './types';

withDefaults(defineProps<TSectionTitleProps>(), {
    as: 'h3',
});
</script>

<template>
    <component :is="as" class="text-lg font-semibold text-gray-900">
        <slot />
    </component>
</template>
