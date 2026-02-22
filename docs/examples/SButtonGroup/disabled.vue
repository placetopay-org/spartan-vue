<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SButtonGroup' })
</script>

<template>
    <SButtonGroup>
        <SButtonGroupItem :first="true">Option A</SButtonGroupItem>
        <SButtonGroupItem :disabled="true">Option B</SButtonGroupItem>
        <SButtonGroupItem :last="true">Option C</SButtonGroupItem>
    </SButtonGroup>
</template>
