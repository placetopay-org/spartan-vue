<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(false)

const { controls } = usePreview({
    props: {
        preventClose: { type: 'boolean', default: true, label: 'preventClose' },
    },
})
</script>

<template>
    <SButton @click="open = true">Open Confirm</SButton>

    <SModalConfirm
        v-model:open="open"
        title="Important Action"
        description="Clicking the backdrop will not close this modal. Use the buttons below."
        icon="danger"
        :prevent-close="controls.preventClose"
        @confirm="open = false"
    />
</template>
