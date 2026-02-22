<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    props: {
        disabled: { type: 'boolean', default: true, label: 'disabled' },
    },
})
</script>

<template>
    <SSelect v-model="value" :disabled="controls.disabled" placeholder="Select an option">
        <option value="vue">Vue</option>
        <option value="react">React</option>
        <option value="angular">Angular</option>
    </SSelect>
</template>
