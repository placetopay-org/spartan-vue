<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const checked = ref(false)

const { controls } = usePreview({
    props: {
        disabled: { type: 'boolean', default: true, label: 'disabled' },
    },
})
</script>

<template>
    <SCheckbox v-model="checked" :disabled="controls.disabled">Disabled option</SCheckbox>
</template>
