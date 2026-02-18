<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref('')

const { controls } = usePreview({
    props: {
        inline: { type: 'boolean', default: true, label: 'inline' },
    },
})
</script>

<template>
    <SRadio v-model="selected" value="inline-option" name="inline-example" :inline="controls.inline">
        <template #default>Inline radio</template>
        <template #description>The label appears inline with the description.</template>
    </SRadio>
</template>
