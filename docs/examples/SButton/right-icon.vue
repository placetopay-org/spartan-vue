<script setup lang="ts">
import { CommandSquareIcon } from '@placetopay/iconsax-vue/bold';
import { usePreview } from '~/composables/usePreview';

usePreview({
    component: 'SButton',
    imports: {
        CommandSquareIcon: '@placetopay/iconsax-vue/bold',
    },
    staticAttrs: {
        ':right-icon': 'CommandSquareIcon',
    },
});
</script>

<template>
    <SButton :right-icon="CommandSquareIcon">Right icon</SButton>
</template>
