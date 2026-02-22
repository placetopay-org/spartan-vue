<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(1)

usePreview({ component: 'SInputIncrement' })
</script>

<template>
    <SInputIncrement v-model="value" :min="1" :max="10" />
</template>
