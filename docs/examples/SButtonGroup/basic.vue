<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SButtonGroup' })
</script>

<template>
    <SButtonGroup>
        <SButtonGroupItem :first="true">Years</SButtonGroupItem>
        <SButtonGroupItem :active="true">Months</SButtonGroupItem>
        <SButtonGroupItem :last="true">Days</SButtonGroupItem>
    </SButtonGroup>
</template>
