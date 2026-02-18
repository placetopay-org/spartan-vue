<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(null)

const { controls } = usePreview({
    props: {
        symbol: { type: 'boolean', default: true, label: 'symbol' },
    },
})
</script>

<template>
    <SInputAmount v-model="value" currency="USD" :symbol="controls.symbol" placeholder="0.00" />
</template>
