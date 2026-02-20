<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SPaginator' })

const page = ref(1)
</script>

<template>
    <SPaginator
        v-model:page="page"
        :size="10"
        :total="100"
        @change="(e) => console.log('Change:', e)"
    />
</template>
