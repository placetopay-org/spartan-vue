<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(null)

const { controls } = usePreview({
    props: {
        minorUnitMode: { type: 'boolean', default: true, label: 'minorUnitMode' },
    },
})
</script>

<template>
    <SInputAmount v-model="value" currency="USD" :symbol="true" :minor-unit-mode="controls.minorUnitMode" placeholder="0.00" />
</template>
