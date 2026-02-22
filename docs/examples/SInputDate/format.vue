<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(null)

const { controls } = usePreview({
    props: {
        modelType: { type: 'select', options: ['dd-MM-yyyy', 'yyyy-MM-dd', 'MM/dd/yyyy'], default: 'dd-MM-yyyy', label: 'modelType' },
    },
})
</script>

<template>
    <SInputDate v-model="value" :model-type="controls.modelType" placeholder="Select a date" />
</template>
