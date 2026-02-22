<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const page = ref(1)

const { controls } = usePreview({
    props: {
        hideNumbers: { type: 'boolean', default: true, label: 'hideNumbers' },
    },
})
</script>

<template>
    <SPaginator
        v-model:page="page"
        :size="10"
        :total="100"
        :hide-numbers="controls.hideNumbers"
    />
</template>
