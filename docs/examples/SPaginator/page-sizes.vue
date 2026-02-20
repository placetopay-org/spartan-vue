<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SPaginator' })

const page = ref(1)
const size = ref(10)
</script>

<template>
    <SPaginator
        v-model:page="page"
        v-model:size="size"
        :total="200"
        :page-sizes="[5, 10, 25, 50]"
        @change="(e) => console.log('Change:', e)"
    />
</template>
