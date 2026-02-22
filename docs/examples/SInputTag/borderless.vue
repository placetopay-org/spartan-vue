<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const tags = ref(['Vue'])

const { controls } = usePreview({
    props: {
        borderless: { type: 'boolean', default: true, label: 'borderless' },
    },
})
</script>

<template>
    <SInputTag v-model="tags" :borderless="controls.borderless" placeholder="Add a tag..." />
</template>
