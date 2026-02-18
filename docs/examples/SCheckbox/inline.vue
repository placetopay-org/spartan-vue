<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const checked = ref(false)

const { controls } = usePreview({
    props: {
        inline: { type: 'boolean', default: true, label: 'inline' },
    },
})
</script>

<template>
    <SCheckbox v-model="checked" :inline="controls.inline">
        <template #default>Remember me</template>
        <template #description>Save my login details for next time.</template>
    </SCheckbox>
</template>
