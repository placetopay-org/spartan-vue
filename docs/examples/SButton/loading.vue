<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ props: {} })
</script>

<template>
    <SButton loading variant="primary">
        Loading...
    </SButton>
</template>
