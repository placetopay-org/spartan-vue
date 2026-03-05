<script setup lang="ts">
import { CommandSquareIcon } from '@placetopay/iconsax-vue/bold';
import { usePreview } from '~/composables/usePreview';

usePreview({
    component: 'SButton',
    imports: {
        CommandSquareIcon: '@placetopay/iconsax-vue/bold',
    },
    staticAttrs: {
        ':left-icon': 'CommandSquareIcon',
        ':right-icon': 'CommandSquareIcon',
    },
});
</script>

<template>
    <SButton :left-icon="CommandSquareIcon" :right-icon="CommandSquareIcon">Both icons</SButton>
</template>
