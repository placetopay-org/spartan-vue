<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref('Vue')

usePreview({ component: 'SCombobox' })
</script>

<template>
    <SCombobox
        v-model="selected"
        :display-button-text="(v) => String(v)"
    >
        <SComboboxOptionGroup label="Frontend">
            <SComboboxOption value="Vue">Vue</SComboboxOption>
            <SComboboxOption value="React">React</SComboboxOption>
            <SComboboxOption value="Angular">Angular</SComboboxOption>
        </SComboboxOptionGroup>
        <SComboboxOptionGroup label="Backend">
            <SComboboxOption value="Laravel">Laravel</SComboboxOption>
            <SComboboxOption value="Django">Django</SComboboxOption>
            <SComboboxOption value="Express">Express</SComboboxOption>
        </SComboboxOptionGroup>
    </SCombobox>
</template>
