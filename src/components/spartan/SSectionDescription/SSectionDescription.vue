<script setup lang="ts">
import type { TSectionDescriptionProps } from './types';

withDefaults(defineProps<TSectionDescriptionProps>(), {
    as: 'p',
});
</script>

<template>
    <component :is="as" class="text-base font-normal text-gray-500">
        <slot />
    </component>
</template>
