<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref('')

const { controls } = usePreview({
    props: {
        error: { type: 'boolean', default: true, label: 'error' },
    },
})
</script>

<template>
    <SCombobox
        v-model="selected"
        :display-button-text="(v) => String(v || 'Select...')"
        :error="controls.error"
    >
        <SComboboxOption value="Vue">Vue</SComboboxOption>
        <SComboboxOption value="React">React</SComboboxOption>
        <SComboboxOption value="Angular">Angular</SComboboxOption>
    </SCombobox>
</template>
