<script setup lang="ts">
import { FilterSearchIcon } from '@placetopay/iconsax-vue/bold'
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')
usePreview({
    component: 'SInput',
    imports: {
        'FilterSearchIcon': '@placetopay/iconsax-vue/bold',
    },
    staticAttrs: {
        ':left-icon': 'FilterSearchIcon',
        'placeholder': 'Search...',
    },
})
</script>

<template>
    <SInput v-model="value" :left-icon="FilterSearchIcon" placeholder="Search..." />
</template>
