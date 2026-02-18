<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref('')

const { controls } = usePreview({
    props: {
        reverse: { type: 'boolean', default: true, label: 'reverse' },
    },
})
</script>

<template>
    <SRadio v-model="selected" value="reversed" name="reverse-example" :reverse="controls.reverse">
        <template #default>Reversed radio</template>
        <template #description>The radio appears on the right side.</template>
    </SRadio>
</template>
