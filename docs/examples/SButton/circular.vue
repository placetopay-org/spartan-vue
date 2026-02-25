<script setup lang="ts">
import { AddIcon } from '@placetopay/iconsax-vue/bold'
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    component: 'SButton',
    imports: {
        'AddIcon': '@placetopay/iconsax-vue/bold',
    },
    staticAttrs: {
        ':icon': 'AddIcon',
    },
    props: {
        circular: { type: 'boolean', default: true, label: 'circular' },
    },
})
</script>

<template>
    <SButton :circular="controls.circular" :icon="AddIcon" />
</template>
