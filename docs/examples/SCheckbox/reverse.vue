<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const checked = ref(false)

const { controls } = usePreview({
    props: {
        reverse: { type: 'boolean', default: true, label: 'reverse' },
    },
})
</script>

<template>
    <SCheckbox v-model="checked" :reverse="controls.reverse">
        <template #default>Reversed checkbox</template>
        <template #description>The checkbox appears on the right side.</template>
    </SCheckbox>
</template>
