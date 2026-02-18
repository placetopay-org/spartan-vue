<script setup lang="ts">
import { LockIcon } from '@placetopay/iconsax-vue/bold'
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')
usePreview({
    component: 'SInput',
    imports: {
        'LockIcon': '@placetopay/iconsax-vue/bold',
    },
    staticAttrs: {
        ':left-icon': 'LockIcon',
        'prefix': '$',
        'placeholder': 'Enter amount',
    },
})
</script>

<template>
    <SInput v-model="value" :left-icon="LockIcon" prefix="$" placeholder="Enter amount" />
</template>
