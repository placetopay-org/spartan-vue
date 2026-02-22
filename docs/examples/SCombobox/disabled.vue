<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref('Vue')

const { controls } = usePreview({
    props: {
        disabled: { type: 'boolean', default: true, label: 'disabled' },
    },
})
</script>

<template>
    <SCombobox
        v-model="selected"
        :display-button-text="(v) => String(v)"
        :disabled="controls.disabled"
    >
        <SComboboxOption value="Vue">Vue</SComboboxOption>
        <SComboboxOption value="React">React</SComboboxOption>
        <SComboboxOption value="Angular">Angular</SComboboxOption>
    </SCombobox>
</template>
