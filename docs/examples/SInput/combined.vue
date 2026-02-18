<script setup lang="ts">
import { LockIcon } from '@placetopay/iconsax-vue/bold'
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')
usePreview({ component: 'SInput' })
</script>

<template>
    <SInput v-model="value" :left-icon="LockIcon" prefix="$" placeholder="Enter amount" />
</template>
