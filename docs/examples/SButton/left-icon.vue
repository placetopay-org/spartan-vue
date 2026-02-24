<script setup lang="ts">
import { CommandSquareIcon } from '@placetopay/iconsax-vue/bold'
import { usePreview } from '~/composables/usePreview'

usePreview({
    component: 'SButton',
    imports: {
        'CommandSquareIcon': '@placetopay/iconsax-vue/bold',
    },
    staticAttrs: {
        ':left-icon': 'CommandSquareIcon',
    },
})
</script>

<template>
    <SButton :left-icon="CommandSquareIcon">Left icon</SButton>
</template>
