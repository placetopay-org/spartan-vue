<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref([])
const options = [
    { id: 1, name: 'Wade Cooper', email: 'wade@example.com' },
    { id: 2, name: 'Arlene Mccoy', email: 'arlene@example.com' },
    { id: 3, name: 'Devon Webb', email: 'devon@example.com' },
]

usePreview({ component: 'SMultiSelector' })
</script>

<template>
    <SMultiSelector
        v-model="selected"
        :options="options"
        option-label="name"
        option-value="id"
        placeholder="Select people"
        clearable
        removable
    >
        <template #option="{ option }">
            <div class="flex flex-col">
                <span class="font-medium">{{ option?.name }}</span>
                <span class="text-xs text-gray-500">{{ option?.email }}</span>
            </div>
        </template>
    </SMultiSelector>
</template>
