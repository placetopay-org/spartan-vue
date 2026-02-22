<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const tags = ref(['Vue', 'React'])

const { controls } = usePreview({
    mode: 'playground',
    component: 'SInputTag',
    props: {
        placeholder: { type: 'text', default: 'Add a tag...', label: 'placeholder' },
        rounded: { type: 'select', options: ['both', 'left', 'right', 'none', 'full'], default: 'both', label: 'rounded' },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        error: { type: 'boolean', default: false, label: 'error' },
        borderless: { type: 'boolean', default: false, label: 'borderless' },
    },
})
</script>

<template>
    <SInputTag
        v-model="tags"
        :placeholder="controls.placeholder"
        :rounded="controls.rounded"
        :disabled="controls.disabled"
        :error="controls.error"
        :borderless="controls.borderless"
    />
</template>
