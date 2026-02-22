<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

usePreview({ component: 'SSelect' })
</script>

<template>
    <SSelect v-model="value" placeholder="Choose a framework">
        <option value="vue">Vue</option>
        <option value="react">React</option>
        <option value="angular">Angular</option>
    </SSelect>
</template>
