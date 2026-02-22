<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const tags = ref(['Vue'])

const { controls } = usePreview({
    props: {
        error: { type: 'boolean', default: true, label: 'error' },
    },
})
</script>

<template>
    <SInputTag v-model="tags" :error="controls.error" placeholder="Add a tag..." />
</template>
