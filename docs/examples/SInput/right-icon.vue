<script setup lang="ts">
import { CloseCircleIcon } from '@placetopay/iconsax-vue/bold'
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')
usePreview({ component: 'SInput' })
</script>

<template>
    <SInput v-model="value" :right-icon="CloseCircleIcon" placeholder="Clearable" />
</template>
