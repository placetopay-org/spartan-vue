<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const tags = ref(['Vue', 'React'])

const { controls } = usePreview({
    props: {
        disabled: { type: 'boolean', default: true, label: 'disabled' },
    },
})
</script>

<template>
    <SInputTag v-model="tags" :disabled="controls.disabled" placeholder="Add a tag..." />
</template>
