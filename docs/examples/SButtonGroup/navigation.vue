<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SButtonGroup' })
</script>

<template>
    <SButtonGroup>
        <SButtonGroupItem :prev="true" :first="true" />
        <SButtonGroupItem :active="true">Page 1</SButtonGroupItem>
        <SButtonGroupItem>Page 2</SButtonGroupItem>
        <SButtonGroupItem>Page 3</SButtonGroupItem>
        <SButtonGroupItem :next="true" :last="true" />
    </SButtonGroup>
</template>
